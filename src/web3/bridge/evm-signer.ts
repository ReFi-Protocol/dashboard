import {
  Connection,
  SendOptions,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  Chain,
  ChainContext,
  Network,
  SignAndSendSigner,
  UnsignedTransaction,
  Wormhole,
} from "@wormhole-foundation/sdk";
import { Signer } from "./solana-signer";
import { AnchorWallet, Wallet } from "@solana/wallet-adapter-react";
import { sendTransaction } from "@wagmi/core";
import { SignerStuff } from "./type";
import { web3config } from "../evm/config";

export function getSignerStuff<N extends Network, C extends Chain>(
  signer: SignAndSendSigner<N, C>,
  chain: ChainContext<N, C>,
): SignerStuff<N, C> {
  return {
    signer,
    chain,
    address: Wormhole.chainAddress(chain.chain, signer.address()),
  };
}

export function getSolanaSigner(
  wh: Wormhole<"Mainnet">,
  anchorWallet: AnchorWallet,
  wallet: Wallet,
  connection: Connection,
): Promise<SignAndSendSigner<"Mainnet", "Solana">> {
  return Signer.fromProvider(wh, {
    ...anchorWallet,
    signAndSendTransaction: async (
      transaction: Transaction | VersionedTransaction,
      opts?: SendOptions,
    ) => {
      const signature = await wallet.adapter.sendTransaction(
        transaction,
        connection,
        opts,
      );

      return { signature, publicKey: anchorWallet.publicKey };
    },
  });
}

export function getEvmSigner(
  address: string,
): SignAndSendSigner<"Mainnet", "Ethereum"> {
  return {
    chain: () => "Ethereum",
    address: () => address,
    signAndSend: async (txs: UnsignedTransaction[]) => {
      const txids: string[] = [];

      for (const txn of txs) {
        const { description, transaction } = txn;
        console.log(`Signing ${description}`);

        const txid = await sendTransaction(web3config, {
          data: transaction.data,
          to: transaction.to,
        });

        if (!txid)
          throw new Error(
            "Could not determine if transaction was sign and sent",
          );

        txids.push(txid);
      }

      return txids;
    },
  };
}
