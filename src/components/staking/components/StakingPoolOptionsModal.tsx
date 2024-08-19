import { FC } from "react";
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
import { IoClose } from "react-icons/io5";

interface StakingPoolOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stakingPools = [
  {
    duration: "45 Days",
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "20%",
  },
  {
    duration: "80 Days",
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "50%",
  },
  {
    duration: "90 Days",
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "110%",
  },
  {
    duration: "No Lock-in period",
    maxStake:
      "Stake or de-stake anytime. There is no limit to the $REFI staked.",
    apy: "5.5%",
  },
];

const StakingPoolOptionsModal: FC<StakingPoolOptionsModalProps> = ({
  isOpen,
  onClose,
}) => {
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
            {stakingPools.map((pool, index) => (
              <div
                key={index}
                className="rounded-[10px] bg-[#061A11]  py-4 text-center"
              >
                <p className="text-nowrap pb-2.5 text-base font-semibold text-white">
                  {index !== stakingPools.length - 1
                    ? `${pool.duration} Lockup`
                    : `${pool.duration}`}
                </p>
                <p className="text-base font-semibold text-white">
                  {pool.apy} APY
                </p>
                <p className="pt-2.5 text-[10px] font-normal text-[#D0D0D0]">
                  1 pCRBN NFT will be automatically locked
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center  justify-between gap-3 pt-6">
            <div className="flex-grow">
              <label className="pb-2.5 text-[15px] font-normal text-white">
                Amount in $REFI
              </label>
              <NumberInput
                min={0}
                defaultValue={15}
                size="md"
                max={30}
                clampValueOnBlur={false}
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
                $REFI Balance: <b>0 $REFI</b>
              </span>
            </div>
            <Button
              variant="brand"
              onClick={() => console.log("stake now clicked")}
              borderRadius={"26px"}
              className="inset-y-0 w-fit rounded-[26px] bg-[#25AC88] !px-32 py-2 text-[14px] font-semibold text-[#000000]"
            >
              Stake Now
            </Button>
            <div className="text-white">You are staking 10 $REFI tokens.</div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StakingPoolOptionsModal;
