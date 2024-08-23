import { Address } from "viem";
import { env } from "../../../env";

export const RPC_URL = env.VITE_EVM_RPC_URL;
export const CHAIN_ID = env.VITE_EVM_CHAIN_ID;

export const REFI_ADDRESS: Address =
  "0xa4bb712b4ea05e74a9590ec550bd922cd857afcb";

export const ERC_REFI_DECIMALS = 18;
