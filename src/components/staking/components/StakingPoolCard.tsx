import { FC, useState } from "react";
import { Button } from "@chakra-ui/react";
import { StakingPoolData } from "../../../types";
import StakingPoolOptionsModal from "./StakingPoolOptionsModal";

export interface StakingPoolCardProps {
  duration: number | null;
  maxStake: string;
  apy: string;
  isSelected: boolean;
  onSelect: () => void;
  selectedPoolIndex: number | null;
  stakingPoolData: StakingPoolData[];
  userHasNfts: boolean;
}

const StakingPoolCard: FC<StakingPoolCardProps> = ({
  duration,
  maxStake,
  apy,
  isSelected,
  onSelect,
  selectedPoolIndex,
  stakingPoolData,
  userHasNfts,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const isDisabled = duration !== null && !userHasNfts;
  const openModal = () => {
    if (!isDisabled) {
      onSelect();
      setModalOpen(true);
    }
  };
  const closeModal = () => setModalOpen(false);
  return (
    <div
      className={`rounded-[20px] p-4 ${
        isSelected
          ? "border-2 border-[#25AC88] bg-[#0A2C1D]"
          : "border-2 border-[#061A11] bg-[#061A11]"
      } ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <h4 className="pb-[6px] text-lg font-semibold text-white">
        {duration ? `${duration} Days Lockup` : "No Lock-in period"}
      </h4>
      <p className="pb-[30px] text-[11px] font-normal text-[#D0D0D0]">
        {maxStake}
      </p>
      <p className="pb-[50px] text-base font-semibold text-[#25AC88]">
        {apy} APY
      </p>
      <Button
        variant="brand"
        onClick={openModal}
        disabled={isDisabled}
        borderRadius={"26px"}
        className="inset-y-0 w-full min-w-fit flex-grow rounded-[26px] bg-[#25AC88] px-6 py-2 text-[14px] font-semibold text-[#000000]"
      >
        Stake Now
      </Button>
      {isDisabled && (
        <p className="pt-2.5 text-[10px] font-normal text-red-400">
          * Requires pCRBN NFT to stake.
        </p>
      )}
      <StakingPoolOptionsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        stakingPoolData={stakingPoolData}
        selectedPoolIndex={selectedPoolIndex}
        onSelectPool={onSelect}
      />
    </div>
  );
};

export default StakingPoolCard;
