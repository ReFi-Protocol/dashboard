import { PublicKey } from "@solana/web3.js";
import { BN, Program } from "@coral-xyz/anchor";
import { ViridisStaking } from "../types/viridis_staking";

type InitializeProgramConfigAgrs = {
  accounts: {
    admin: PublicKey;
  };
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
  };
  program: Program<ViridisStaking>;
};

export function getUpdateConfigIx({
  accounts,
  program,
  args
}: InitializeProgramConfigAgrs) {
  return program.methods
    .updateConfig(args)
    .accounts(accounts)
    .instruction();
}
