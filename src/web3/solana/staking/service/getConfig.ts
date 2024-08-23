import { getProgram } from "..";
import { Wallet } from "../types";
import { getConfig as fetchFonfig } from "../util";

export async function getConfig(wallet: Wallet) {
  const config = await fetchFonfig(getProgram(wallet));
  return config;
}
