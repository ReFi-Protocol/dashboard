import { AnchorWallet, Wallet } from "@solana/wallet-adapter-react";

import { TokenTransfer } from "@wormhole-foundation/sdk";
import { getEvmSigner, getSolanaSigner } from "./evm-signer";
import { getBridgeConnection, getWh } from "./config";
import { Operation } from "./types";
import { getConnection } from "../solana/connection";

export async function redeem(
  tx: string,
  anchorWallet: AnchorWallet,
  wallet: Wallet,
  chain: "Ethereum" | "Solana",
  address: string,
  operation: Operation
) {
  const wh = await getWh();
  const xfer = await TokenTransfer.from(wh, {
    chain,
    txid: tx,
  });

  const attestIds = await xfer.fetchAttestation(60 * 60 * 1000);
  console.log("Got attestation: ", attestIds);

  const signer =
    chain === "Ethereum"
      ? await getSolanaSigner(wh, anchorWallet, wallet, getBridgeConnection())
      : getEvmSigner(address);

  const dstTxIds = await xfer.completeTransfer(signer);
  console.log("Completed transfer: ", dstTxIds);
}
