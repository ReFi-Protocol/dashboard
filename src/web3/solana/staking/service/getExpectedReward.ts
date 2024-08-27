import { addDays, format, fromUnixTime } from "date-fns";
import { Stake } from "../types";
import { calculateClaimableReward, formatReFi } from "../util";
import { stake } from "./stake";

export function getExpectedReward(stakes: Stake[]) {
  return stakes.reduce((acc, curr, index) => {
    if (!curr.destakeTime) {
      const startDate = fromUnixTime(curr.startTime.toNumber());
      const lockEndDate = addDays(startDate, curr.nftLockDays || 0);

      const claimableRewardOnDate = calculateClaimableReward(
        curr,
        curr.nft
          ? Math.max(lockEndDate.valueOf(), new Date().valueOf())
          : undefined,
      );

      acc += claimableRewardOnDate;
    }

    return acc;
  }, 0);
}
