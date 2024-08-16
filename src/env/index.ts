import { WalletAdapterNetwork } from "@jup-ag/wallet-adapter";
import { z } from "zod";

export const SUPPORTED_CLUSTERS = [
  WalletAdapterNetwork.Devnet,
  WalletAdapterNetwork.Mainnet,
] as const;

const envSchema = z.object({
  VITE_WALLETCONNECT_PROJECT_ID: z.string(),
  VITE_EVM_RPC_URL: z.string(),
  VITE_EVM_CHAIN_ID: z.number({ coerce: true }),
  VITE_SOLANA_RPC_URL: z.string(),
  VITE_SOLANA_CLUSTER: z.enum(SUPPORTED_CLUSTERS),
  VITE_SOLANA_CANDY_MACHINE: z.string(),
  VITE_SOLANA_SPL: z.string(),
  VITE_SOLANA_COLLECTION: z.string(),
  VITE_SOLANA_SPL_DECIMALS: z.number({ coerce: true }),
  VITE_ENVIRONMENT: z.string(),
});

let env: z.infer<typeof envSchema>;

try {
  env = envSchema.parse(import.meta.env);
} catch (error: any) {
  console.error("Environment variables validation failed:", error.errors);
  throw new Error("Invalid environment variables");
}

export { env };
