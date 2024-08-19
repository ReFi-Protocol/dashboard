import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { NFT_APY, SPL_MINT_PK } from "../../const";
import { getConnection } from "../../connection";
import { getProgram } from "..";
import { getStakeInfo, getStakeInfoAddress } from "../util";
import { Wallet } from "../types";
import { D } from "../../service/d";
import { getInitializeStakeInfoIx } from "../instruction/initializeStakeInfo";
import { getStakeIx } from "../instruction/stake";
import { getLockNftIx } from "../instruction/lockNft";
import { sendTransaction } from "./sendTransaction";
import { getClaimIx } from "../instruction/claim";

export async function claim(
  walletContext: WalletContextState,
  wallet: Wallet,
  stakeIndex: number,
) {
  const connection = getConnection();
  const program = getProgram(wallet);

  const claimIx = await getClaimIx({
    args: { stakeIndex },
    accounts: {
      signer: wallet.publicKey,
      mint: SPL_MINT_PK,
    },
    program,
  });

  await sendTransaction([claimIx], connection, wallet.publicKey, walletContext);
}
