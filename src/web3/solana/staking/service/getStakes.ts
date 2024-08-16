import { getProgram } from "..";
import { Wallet } from "../types";
import { getStakeInfo } from "../util";

export async function getStakes(wallet: Wallet) {
  const stakeInfo = await getStakeInfo(wallet, getProgram(wallet));
  return stakeInfo?.stakes || [];
}
