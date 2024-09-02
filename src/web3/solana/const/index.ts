import { PublicKey } from "@solana/web3.js";
import IDL from "../staking/idl/viridis_staking.json";
import { env } from "../../../env";

export const ORIGIN = "";
export const CLUSTER = env.REACT_APP_SOLANA_CLUSTER;
export const RPC_URL = env.REACT_APP_SOLANA_RPC_URL;
export const CANDY_MACHINE_ADDRESS = env.REACT_APP_SOLANA_CANDY_MACHINE;
export const SPL_MINT_ADDRESS = env.REACT_APP_SOLANA_SPL;
export const SPL_DECIMALS = env.REACT_APP_SOLANA_SPL_DECIMALS;
export const COLLECTION_MINT_ADDRESS = env.REACT_APP_SOLANA_COLLECTION;

export const APY_DECIMALS = 2;

export const NFT_APY: Record<30 | 60 | 90, number> = {
  30: 2950,
  60: 5950,
  90: 10450,
};

export const ONE_DAY_SECONDS = 24 * 60 * 60;
export const ONE_YEAR_SECONDS = ONE_DAY_SECONDS * 365;

export const SPL_MINT_PK = new PublicKey(SPL_MINT_ADDRESS);
export const COLLECTION_MINT_PK = new PublicKey(COLLECTION_MINT_ADDRESS);
export const PROGRAM_ID = new PublicKey(IDL.address);
