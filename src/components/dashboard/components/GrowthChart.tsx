import React from "react";
import Card from "../../card";
import LineChart from "../../charts/LineChart";
import { Stake } from "../../../web3/solana/staking/types";
import { createLineChartConfig } from "../../../service";
import { eachDayOfInterval, format, fromUnixTime } from "date-fns";
import { BN } from "@coral-xyz/anchor";
import { calculateClaimableReward } from "../../../web3/solana/staking/util";
import { SPL_DECIMALS } from "../../../web3/solana/const";

type GrowthChartProps = {
  stakes: Stake[];
};

function generateDateArray(
  stakes: { startTime: BN }[],
  onDate: Date = new Date(),
): Date[] {
  const startDate = fromUnixTime(stakes[0].startTime.toNumber());

  return eachDayOfInterval({ start: startDate, end: onDate });
}

export function calculateTotalRewardOnDate(
  stakes: Stake[],
  onDate: number = Date.now(),
): number {
  return stakes.reduce((totalReward, stake) => {
    const stakeReward = calculateClaimableReward(stake, onDate);
    return totalReward + stakeReward;
  }, 0);
}

const GrowthChart: React.FC<GrowthChartProps> = ({ stakes }) => {
  const dateArray = stakes.length ? generateDateArray(stakes) : [new Date()];

  const rewards = dateArray.map((date) => {
    const reward = stakes.length
      ? calculateTotalRewardOnDate(stakes, date.getTime())
      : 0;

    return reward / 10 ** SPL_DECIMALS;
  });

  const { series, options } = createLineChartConfig(
    rewards,
    dateArray.map((date) => format(date, "MMM dd")),
    {
      name: "ReFi",
    },
  );

  return (
    <Card extra="!p-5 text-center">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2.5">
          <h3 className="self-start font-sans text-xl font-bold text-white">
            Growth
          </h3>
          <div className="flex items-center gap-2.5 text-white"></div>
        </div>
      </div>
      <div className="mt-10 flex h-full w-full sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="h-full w-full">
          <LineChart options={options} series={series} />
        </div>
      </div>
    </Card>
  );
};

export default GrowthChart;
