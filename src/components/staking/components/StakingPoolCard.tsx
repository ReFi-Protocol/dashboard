import { FC, useState } from "react";
import { Button } from "@chakra-ui/react";
import { StakingPoolData } from "../../../types";

export interface StakingPoolCardProps {
  duration: number | null;
  maxStake: string;
  apy: string;
  userHasNfts: boolean;
  onStakeClick: () => void;
}

const StakingPoolCard: FC<StakingPoolCardProps> = ({
  duration,
  maxStake,
  apy,
  userHasNfts,
  onStakeClick,
}) => {
  const isDisabled = duration !== null && !userHasNfts;

  return (
    <div
      className={`
        flex flex-col justify-between rounded-[20px] p-4 
        border-2 border-[#061A11] bg-[#061A11] 
        ${isDisabled ? "cursor-not-allowed opacity-50" : ""}
      `}
    >
      <div className="flex flex-col">
        <h4 className="pb-[6px] text-lg font-semibold text-white">
          {duration ? `${duration} Days Lockup` : "No Lock-in period"}
        </h4>
        <p className="pb-[30px] text-[11px] font-normal text-[#D0D0D0]">
          {maxStake}
        </p>
        <p className="pb-[50px] text-base font-semibold text-[#25AC88]">
          {apy} APY
        </p>
      </div>
      <Button
        variant="brand"
        onClick={onStakeClick}
        disabled={isDisabled}
        borderRadius={"26px"}
        background={"#25AC88"}
        textColor={"#1A1A1A"}
        _hover={{ background: "#ffffff", color: "#25AC88" }}
        _active={{ background: "#ffffff", color: "#25AC88" }}
        className="inset-y-0 w-full min-w-fit rounded-[26px] px-6 py-2 text-[14px] font-semibold text-[#000000]"
      >
        Stake Now
      </Button>
      {isDisabled && (
        <p className="pt-2.5 text-[10px] font-normal text-red-400">
          * Requires pCRBN NFT to stake.
        </p>
      )}
    </div>
  );
};

export default StakingPoolCard;
