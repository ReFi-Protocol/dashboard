import { PublicKey } from "@solana/web3.js";
import { BN, Program } from "@coral-xyz/anchor";
import { ViridisStaking } from "../types/viridis_staking";

type ClaimArgs = {
  args: {
    stakeIndex: number;
  };
  accounts: {
    signer: PublicKey;
    mint: PublicKey;
  };
  program: Program<ViridisStaking>;
};

export function getClaimIx({ accounts, program, args }: ClaimArgs) {
  return program.methods
    .claim(new BN(args.stakeIndex))
    .accounts(accounts)
    .instruction();
}
