import { WalletAdapterNetwork } from "@jup-ag/wallet-adapter";
import { z } from "zod";
import { Env } from "../types";

export const SUPPORTED_CLUSTERS = [
  WalletAdapterNetwork.Devnet,
  WalletAdapterNetwork.Mainnet,
] as const;

const envSchema = z.object({
  REACT_APP_WALLETCONNECT_PROJECT_ID: z.string(),
  REACT_APP_EVM_RPC_URL: z.string(),
  REACT_APP_EVM_CHAIN_ID: z.number({ coerce: true }),
  REACT_APP_SOLANA_RPC_URL: z.string(),
  REACT_APP_SOLANA_CLUSTER: z.enum(SUPPORTED_CLUSTERS),
  REACT_APP_SOLANA_CANDY_MACHINE: z.string(),
  REACT_APP_SOLANA_SPL: z.string(),
  REACT_APP_SOLANA_COLLECTION: z.string(),
  REACT_APP_SOLANA_SPL_DECIMALS: z.number({ coerce: true }),
  REACT_APP_ENVIRONMENT: z.nativeEnum(Env),
  REACT_APP_MAX_NFT_AVAILABLE: z.number({ coerce: true }),
});

let env: z.infer<typeof envSchema>;

try {
  env = envSchema.parse(process.env);
} catch (error: any) {
  console.error("Environment variables validation failed:", error.errors);
  throw new Error("Invalid environment variables");
}

export { env };
