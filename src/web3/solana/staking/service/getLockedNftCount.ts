import { Stake } from "../types";

export function getLockedNftCount(stakes: Stake[]) {
  return stakes.reduce((acc, curr) => {
    if (curr.nftLockTime && !curr.nftUnlockTime) {
      acc += 1;
    }

    return acc;
  }, 0);
}
