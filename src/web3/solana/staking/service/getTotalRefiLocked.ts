import { Stake, StakeInfoAccount } from "../types";
import { getLockedReFi } from "./getLockedReFi";

export function getTotalRefiLocked(stakeInfoAccs: StakeInfoAccount[]) {
  const stakes: Stake[] = [];

  stakeInfoAccs.forEach((stakeInfo) => {
    stakes.push(...stakeInfo.account.stakes);
  });

  return getLockedReFi(stakes);
}
