import { FC, useState, useEffect, useMemo } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Button,
} from "@chakra-ui/react";
import { StakingPoolData } from "../../../types";
import { IoClose } from "react-icons/io5";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useCustomToast } from "../../../utils";
import { getReFiNfts } from "../../../web3/solana/service/getReFiNfts";
import { stake } from "../../../web3/solana/staking/service/stake";
import { useUmi } from "../../../web3/solana/hook";
import { getTotalReFi } from "../../../web3/solana/staking/service/getTotalReFi";
import { formatReFi } from "../../../web3/solana/staking/util";
import { GaEvent, registerEvent } from "../../../events";
import { D, d } from "../../../web3/util/d";
import RestakePopupModal from "../../marketplace/components/RestakePopupModal";

interface StakingPoolOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stakingPoolData: StakingPoolData[];
  selectedPoolIndex: number | null;
  onSelectPool: (index: number) => void;
  onNewStake?: () => void;
}

const StakingPoolOptionsModal: FC<StakingPoolOptionsModalProps> = ({
  isOpen,
  onClose,
  stakingPoolData,
  selectedPoolIndex,
  onSelectPool,
}) => {
  const [humanAmount, setHumanAmount] = useState<number>(0);
  const [refiNfts, setRefiNfts] = useState<PublicKey[]>([]);
  const [totalHumanReFi, setTotalHumanReFi] = useState(0);
  const [isRestakeModalOpen, setRestakeModalOpen] = useState(false);

  const anchorWallet = useAnchorWallet();
  const walletContext = useWallet();
  const umi = useUmi(walletContext);
  const showToast = useCustomToast();

  useEffect(() => {
    if (anchorWallet && umi) {
      getReFiNfts(umi, anchorWallet.publicKey).then((nfts) => {
        setRefiNfts(nfts.map((nft) => new PublicKey(nft.publicKey)));
      });
    }
  }, [anchorWallet, umi]);

  const handleStakeClick = async () => {
    if (anchorWallet && umi && selectedPoolIndex !== null) {
      try {
        const lockPeriod = stakingPoolData[selectedPoolIndex]?.duration || 0;
        registerEvent({
          event: GaEvent.STAKE,
          additional_info: `${lockPeriod}`,
        });
        if (lockPeriod) {
          const nft = refiNfts.length ? refiNfts[0] : null;

          if (!nft) {
            throw Error("No NFT to lock");
          }

          await stake(walletContext, anchorWallet, humanAmount, {
            mint: nft,
            lockPeriod,
          });
        } else {
          await stake(walletContext, anchorWallet, humanAmount);
        }

        showToast({
          title: "Success",
          description: `You have successfully staked ${humanAmount} $REFI`,
          status: "success",
        });
        
        // successfully tested that the modal appears correctly 
        // however have not tested whether it appears in the case that a lock period stake is executed 
        // This is due to the fact that I am unable to buy an NFT while testing / on devnet 
        // however this implementation should:
          // cause the page to be scrolled down to my stakes & rewards
          // a popup then appears suggesting that the user should restake for higher rewards
        if (lockPeriod != 0) {
          try {
            setRestakeModalOpen(true);
            onClose();
          } catch (e) {
            console.error(e);
          }
        }

        
        // window.scrollTo({
        //   top: document.documentElement.scrollHeight, // Scroll to the bottom
        //   behavior: 'smooth', // Smooth scrolling
        // });


      } catch (e: any) {
        showToast({
          title: "Error",
          description: e.message,
          status: "error",
        });
        console.error(e);
      }
    }
  };

  const handleCloseRestakeModal = () => {
    setRestakeModalOpen(false); // Close the RestakePopupModal
  };

  useEffect(() => {
    if (anchorWallet) {
      getTotalReFi(anchorWallet.publicKey).then((value) => {
        setTotalHumanReFi(Math.trunc(d(value)))
      });
    } else {
      setTotalHumanReFi(0);
    }
  }, [anchorWallet]);

  return (
    <>
      <Modal onClose={onClose} size={"sm"} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent className="m-auto min-w-fit items-center justify-center !rounded-[40px] !bg-[#061A11] px-7 pb-6 pt-5 !text-white">
          <ModalHeader className="flex w-full justify-between pb-4 text-white">
            <p>Select Staking Option</p>
            <Button onClick={onClose} className="!bg-[#25AC88] !p-0">
              <IoClose className="h-5 w-5" />
            </Button>
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              {stakingPoolData.map((pool, index) => {
                const isDisabled = refiNfts.length === 0 && pool.duration;
                return (
                  <div
                    key={index}
                    onClick={() => !isDisabled && onSelectPool(index)}
                    className={`cursor-pointer rounded-[10px] py-4 text-center ${
                      selectedPoolIndex === index
                        ? "border-2 border-[#25AC88] bg-[#0A2C1D]"
                        : "border-2 border-[#0A2C1D] bg-[#0A2C1D]"
                    } 
                    ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    <p className="text-nowrap pb-2.5 text-base font-semibold text-white">
                      {index !== stakingPoolData.length - 1
                        ? `${pool.duration} Days Lockup`
                        : `No Lock-in period`}
                    </p>
                    <p className="text-base font-semibold text-white">
                      {pool.apy} APY
                    </p>
                    <p className="px-2 pt-2.5 text-[10px] font-normal text-[#D0D0D0]">
                      {index !== stakingPoolData.length - 1
                        ? `Please note 1 NFT will be automatically locked`
                        : `No NFT will be locked`}
                    </p>
                    {isDisabled && (
                      <p className="pt-2.5 text-[10px] font-normal text-red-400">
                        Requires pCRBN NFT to stake.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-center justify-between gap-3 pt-6 md:flex-row">
              <div className="flex-grow">
                <label className="pb-2.5 text-[15px] font-normal text-white">
                  Amount in $REFI
                </label>
                <NumberInput
                  min={0}
                  value={humanAmount}
                  size="md"
                  max={totalHumanReFi}
                  clampValueOnBlur={false}
                  onChange={(valueString) => {
                    let numValue = Number(valueString);
                    numValue = numValue > totalHumanReFi ? totalHumanReFi : numValue;
                    setHumanAmount(numValue);
                  }}
                  className="mb-4 min-h-11 w-full !rounded-[16px] bg-[#0A2C1D] !py-3 !pl-4 text-white"
                >
                  <NumberInputField className="!focus:ring-0 !active:ring-0 !focus:border-none !focus:outline-none !active:border-none !active:outline-none !max-h-6 !border-none bg-[#0A2C1D] !p-0 text-white !outline-none !ring-0" />
                  <NumberInputStepper className="!border-none !pr-5">
                    <NumberIncrementStepper
                      bg="none"
                      border="none"
                      color={"#25AC88"}
                      _active={{ bg: "none" }}
                    />
                    <NumberDecrementStepper
                      bg="none"
                      border="none"
                      color={"#25AC88"}
                      _active={{ bg: "none" }}
                    />
                  </NumberInputStepper>
                </NumberInput>
              </div>
              <Button
                variant="brand"
                rounded={"16px"}
                background={"#25AC88"}
                onClick={() => setHumanAmount(totalHumanReFi)}
                textColor={"#1A1A1A"}
                _hover={{ background: "#ffffff", color: "#25AC88" }}
                _active={{ background: "#ffffff", color: "#25AC88" }}
                className="rounded-[16px]] inset-y-0 h-11 w-fit !px-6 !py-3.5 text-base font-semibold"
              >
                Max
              </Button>
            </div>
            <div className="flex flex-col items-center gap-2.5">
              <div className="flex items-center gap-2 text-white">
                <img
                  src="./images/Refi_logo.png"
                  alt="Refi Protocol Logo"
                  className="h-8 w-8"
                />
                <span className="font-sans text-base font-normal">
                  $REFI Balance: <b>{formatReFi(D(totalHumanReFi))} $REFI</b>
                </span>
              </div>
              <Button
                variant="brand"
                onClick={() => handleStakeClick()}
                background={"#25AC88"}
                textColor={"#1A1A1A"}
                _hover={{ background: "#ffffff", color: "#25AC88" }}
                _active={{ background: "#ffffff", color: "#25AC88" }}
                borderRadius={"26px"}
                className="inset-y-0 w-fit rounded-[26px] !px-32 py-2 text-[14px] font-semibold text-[#000000]"
              >
                Stake Now
              </Button>
              <div className="text-white">
                You are staking {formatReFi(D(humanAmount))} $REFI tokens.
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      
      <RestakePopupModal
        isOpen={isRestakeModalOpen}
        onClose={handleCloseRestakeModal} // Pass the close function
      />

    </>
    
  );
};

export default StakingPoolOptionsModal;
