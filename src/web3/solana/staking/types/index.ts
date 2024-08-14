import { PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import { getStakes } from "../service/getStakes";

export interface Wallet {
  signTransaction<T extends Transaction | VersionedTransaction>(
    tx: T,
  ): Promise<T>;
  signAllTransactions<T extends Transaction | VersionedTransaction>(
    txs: T[],
  ): Promise<T[]>;
  publicKey: PublicKey;
}

export type Stake = Awaited<ReturnType<typeof getStakes>>[number];
