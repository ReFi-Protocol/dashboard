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

interface StakingPoolOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stakingPools = [
  {
    duration: "30 Days",
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "35%",
  },
  {
    duration: "60 Days",
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "65%",
  },
  {
    duration: "90 Days",
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "110%",
  },
  {
    duration: "No lock-in period",
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
      <ModalContent className="w-fit max-w-[700px] justify-center rounded-[40px] border-[1px] border-[#333333] !bg-[#000000] p-5">
        <ModalHeader className="flex w-full justify-between pb-4 text-white">
          <p>Select Staking Option</p>
          <Button
            onClick={onClose}
            className="bg-[ h-[18px] w-[18px]"
            style={{
              width: "18px",
              height: "18px",
              backgroundImage: "url('./icons/close-icon.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Button>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {stakingPools.map((pool, index) => (
              <div
                key={index}
                className="rounded-[10px] bg-[#061A11] px-4 py-7 text-center"
              >
                <p className="pb-2.5 text-base font-semibold text-white">
                  {index !== stakingPools.length - 1
                    ? `${pool.duration} Lockup`
                    : `${pool.duration}`}
                </p>
                <p className="text-base font-semibold text-white">
                  {pool.apy} APY
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
                max={30}
                clampValueOnBlur={false}
                className="mb-4 min-h-11 w-full rounded-[16px] bg-[#061A11] py-3 pl-4 text-white"
              >
                <NumberInputField className="border-none bg-[#061A11] p-0 text-white outline-none focus:border-none focus:outline-none active:border-none active:outline-none" />
                <NumberInputStepper className="!right-6">
                  <NumberIncrementStepper className="bg-transparent border-none focus:outline-none">
                    <img
                      src="./icons/increment-icon.svg"
                      alt="Increment"
                      className="h-2 w-4 text-[#25AC88]"
                    />
                  </NumberIncrementStepper>
                  <NumberDecrementStepper className="bg-transparent border-none focus:outline-none">
                    <img
                      src="./icons/decrement-icon.svg"
                      alt="Decrement"
                      className="h-2 w-4 text-[#25AC88]"
                    />
                  </NumberDecrementStepper>
                </NumberInputStepper>
              </NumberInput>
            </div>

            <Button
              variant="brand"
              className="inset-y-0 h-11 w-fit max-w-20 rounded-[16px] bg-[#25AC88] px-6 py-3 text-base font-semibold text-[#000000]"
            >
              Max
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StakingPoolOptionsModal;
