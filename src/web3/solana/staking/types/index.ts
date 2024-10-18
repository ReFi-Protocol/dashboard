import { PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import { getMyStakes } from "../service/getMyStakes";
import { getAllStakes } from "../service/getAllStakes";
import { getConfig } from "../util";

export interface Wallet {
  signTransaction<T extends Transaction | VersionedTransaction>(
    tx: T,
  ): Promise<T>;
  signAllTransactions<T extends Transaction | VersionedTransaction>(
    txs: T[],
  ): Promise<T[]>;
  publicKey: PublicKey;
}

export type Stake = Awaited<ReturnType<typeof getMyStakes>>[number];
export type StakeInfoAccount = Awaited<ReturnType<typeof getAllStakes>>[number];
export type ProgramConfig = Awaited<ReturnType<typeof getConfig>>;
