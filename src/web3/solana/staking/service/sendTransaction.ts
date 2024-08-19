import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  RpcResponseAndContext,
  SimulatedTransactionResponse,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { checkCustomError } from "./checkError";

export async function sendTransaction(
  instructions: TransactionInstruction[],
  connection: Connection,
  payer: PublicKey,
  wallet: WalletContextState,
) {
  const { blockhash } = await connection.getLatestBlockhash();

  const messageV0 = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  const transactionV0 = new VersionedTransaction(messageV0);

  // Simulate the versioned transaction
  const simulateResult = await connection.simulateTransaction(transactionV0);

  console.log(simulateResult);

  checkCustomError(simulateResult);

  console.log("Simulation Result:", simulateResult);

  const hash = await wallet.sendTransaction(transactionV0, connection);

  console.log(hash);
}
