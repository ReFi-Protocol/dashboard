import { Stake } from "../types";

export function getLockedReFi(stakes: Stake[]) {
  return stakes.reduce((acc, curr) => {
    if (!curr.destakeTime) {
      acc += curr.amount.toNumber();
    }

    return acc;
  }, 0);
}
