import { FC, useState, useEffect } from "react";
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

interface StakingPoolOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stakingPoolData: StakingPoolData[];
  selectedPoolIndex: number | null;
  onSelectPool: (index: number) => void;
}

const StakingPoolOptionsModal: FC<StakingPoolOptionsModalProps> = ({
  isOpen,
  onClose,
  stakingPoolData,
  selectedPoolIndex,
  onSelectPool,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [refiNfts, setRefiNfts] = useState<PublicKey[]>([]);
  const REFI_BALANCE = 5000;

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

        if (refiNfts.length > 0 && lockPeriod == 0) {
          await stake(walletContext, anchorWallet, amount);
        }
        const nftToLock = refiNfts[0];

        await stake(walletContext, anchorWallet, amount, {
          mint: nftToLock,
          lockPeriod,
        });

        showToast({
          title: "Success",
          description: `You have successfully staked ${amount} $REFI`,
          status: "success",
        });

        onClose();
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

  return (
    <Modal onClose={onClose} size={"sm"} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent className="w-fit min-w-[700px] justify-center !rounded-[15px] border-[1px] border-[#333333] !bg-[#000000] p-5 !drop-shadow-[0_1px_2px_rgba(255,255,255,0.30)]">
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
                      : "border-2 border-[#061A11] bg-[#061A11]"
                  } ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <p className="text-nowrap pb-2.5 text-base font-semibold text-white">
                    {index !== stakingPoolData.length - 1
                      ? `${pool.duration} Days Lockup`
                      : `No Lock-in period`}
                  </p>
                  <p className="text-base font-semibold text-white">
                    {pool.apy} APY
                  </p>
                  <p className="pt-2.5 text-[10px] font-normal text-[#D0D0D0]">
                    1 pCRBN NFT will be automatically locked
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
          <div className="flex items-center  justify-between gap-3 pt-6">
            <div className="flex-grow">
              <label className="pb-2.5 text-[15px] font-normal text-white">
                Amount in $REFI
              </label>
              <NumberInput
                min={0}
                value={amount}
                size="md"
                // max={}
                clampValueOnBlur={false}
                onChange={(valueString) => setAmount(Number(valueString))}
                className="mb-4 min-h-11 w-full !rounded-[16px] bg-[#061A11] !py-3 !pl-4 text-white"
              >
                <NumberInputField className="!focus:ring-0 !active:ring-0 !focus:border-none !focus:outline-none !active:border-none !active:outline-none !max-h-6 !border-none bg-[#061A11] !p-0 text-white !outline-none !ring-0" />
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
              onClick={() => setAmount(REFI_BALANCE)}
              className="inset-y-0 h-11 w-fit max-w-20 rounded-[16px] bg-[#25AC88] !px-6 !py-3.5 text-base font-semibold text-[#000000]"
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
                $REFI Balance: <b>{REFI_BALANCE} $REFI</b>
              </span>
            </div>
            <Button
              variant="brand"
              onClick={() => handleStakeClick()}
              borderRadius={"26px"}
              className="inset-y-0 w-fit rounded-[26px] bg-[#25AC88] !px-32 py-2 text-[14px] font-semibold text-[#000000]"
            >
              Stake Now
            </Button>
            <div className="text-white">
              You are staking {amount} $REFI tokens.
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StakingPoolOptionsModal;
