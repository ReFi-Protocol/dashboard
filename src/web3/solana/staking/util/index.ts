import { PublicKey } from "@solana/web3.js";
import { ViridisStaking } from "../types/viridis_staking";
import { Program } from "@coral-xyz/anchor";
import { Wallet } from "../types";

export const getStakeInfoAddress = (
  address: PublicKey,
  programId: PublicKey,
) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("stake_info"), address.toBuffer()],
    programId,
  )[0];
};

export async function getStakeInfo(
  wallet: Wallet,
  program: Program<ViridisStaking>,
) {
  const stakeInfoAddress = getStakeInfoAddress(
    wallet.publicKey,
    program.programId,
  );

  try {
    const stakeInfo = await program.account.stakeInfo.fetch(stakeInfoAddress);

    return stakeInfo;
  } catch (e) {
    return undefined;
  }
}
