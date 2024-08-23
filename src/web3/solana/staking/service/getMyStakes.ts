import { getProgram } from "..";
import { Wallet } from "../types";
import { getStakeInfo as getMyStakeInfo } from "../util";

export async function getMyStakes(wallet: Wallet) {
  const stakeInfo = await getMyStakeInfo(wallet, getProgram(wallet));
  return stakeInfo?.stakes || [];
}
