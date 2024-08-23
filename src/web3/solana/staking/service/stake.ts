import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { NFT_APY, SPL_MINT_PK } from "../../const";
import { getConnection } from "../../connection";
import { getProgram } from "..";
import { getStakeInfo, getStakeInfoAddress } from "../util";
import { Wallet } from "../types";
import { getInitializeStakeInfoIx } from "../instruction/initializeStakeInfo";
import { getStakeIx } from "../instruction/stake";
import { getLockNftIx } from "../instruction/lockNft";
import { sendTransaction } from "./sendTransaction";
import { D } from "../../../util/d";

export async function stake(
  walletContext: WalletContextState,
  wallet: Wallet,
  amount: number,
  nftInfo?: {
    lockPeriod: number;
    mint: PublicKey;
  },
) {
  const connection = getConnection();
  const program = getProgram(wallet);
  const stakeInfo = await getStakeInfo(wallet, program);

  const dAmount = D(amount);
  const stakeIndex = stakeInfo?.stakes.length || 0;

  const initializeStakeIx = await getInitializeStakeInfoIx({
    accounts: {
      signer: wallet.publicKey,
      stakeInfo: getStakeInfoAddress(wallet.publicKey, program.programId),
    },
    program,
  });

  const stakeIx = await getStakeIx({
    args: { dAmount },
    accounts: {
      signer: wallet.publicKey,
      mint: SPL_MINT_PK,
    },
    program,
  });

  const instructions: TransactionInstruction[] = stakeInfo
    ? []
    : [initializeStakeIx];

  instructions.push(stakeIx);

  if (nftInfo) {
    instructions.push(
      await getLockNftIx({
        args: { stakeIndex, lockPeriod: nftInfo.lockPeriod },
        accounts: {
          signer: wallet.publicKey,
          mint: nftInfo.mint,
        },
        program,
      }),
    );
  }

  await sendTransaction(
    instructions,
    connection,
    wallet.publicKey,
    walletContext,
  );
}
