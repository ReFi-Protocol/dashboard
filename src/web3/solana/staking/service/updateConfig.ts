import { WalletContextState } from "@solana/wallet-adapter-react";
import { getConnection } from "../../connection";
import { getProgram } from "..";
import { Wallet } from "../types";
import { sendTransaction } from "./sendTransaction";
import { getUpdateConfigIx } from "../instruction/updateConfig";
import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";

export async function updateConfig(
  walletContext: WalletContextState,
  wallet: Wallet,
  args: {
    admin: PublicKey | null,
    baseLockDays: number | null,
    maxNftApyDurationDays:  number | null,
    baseApy: number | null,
    maxNftRewardLamports: BN | null,
    nftDaysApy: [
      { days: number, apy: number },
      { days: number, apy: number },
      { days: number, apy: number },
    ] | null,
  }
) {
  const connection = getConnection();
  const program = getProgram(wallet);

  const claimIx = await getUpdateConfigIx({
    args,
    accounts: {
      admin: wallet.publicKey
    },
    program
  });

  await sendTransaction([claimIx], connection, wallet.publicKey, walletContext);
}
