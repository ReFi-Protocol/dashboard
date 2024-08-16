import { PublicKey } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { ViridisStaking } from "../types/viridis_staking";

type InitializeStakeInfoArgs = {
  accounts: {
    signer: PublicKey;
    stakeInfo: PublicKey;
  };
  program: Program<ViridisStaking>;
};

export function getInitializeStakeInfoIx({
  accounts,
  program,
}: InitializeStakeInfoArgs) {
  return program.methods.initializeStakeInfo().accounts(accounts).instruction();
}
