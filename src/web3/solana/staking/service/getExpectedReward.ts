import { Stake } from "../types";
import { calculateClaimableReward } from "../util";

export function getExpectedReward(stakes: Stake[]) {
  return stakes.reduce((acc, curr) => {
    if (!curr.destakeTime) {
      acc += calculateClaimableReward(curr);
    }

    return acc;
  }, 0);
}
