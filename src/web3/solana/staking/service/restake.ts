import { WalletContextState } from "@solana/wallet-adapter-react";
import { SPL_MINT_PK } from "../../const";
import { getConnection } from "../../connection";
import { getProgram } from "..";
import { Wallet } from "../types";
import { sendTransaction } from "./sendTransaction";
import { getRestakeIx } from "../instruction/restake";

export async function restake(
  walletContext: WalletContextState,
  wallet: Wallet,
  stakeIndex: number,
) {
  const connection = getConnection();
  const program = getProgram(wallet);

  const claimIx = await getRestakeIx({
    args: { stakeIndex },
    accounts: {
      signer: wallet.publicKey,
      mint: SPL_MINT_PK,
    },
    program,
  });

  await sendTransaction([claimIx], connection, wallet.publicKey, walletContext);
}
