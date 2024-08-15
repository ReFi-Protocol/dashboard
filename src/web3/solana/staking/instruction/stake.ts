import { PublicKey } from "@solana/web3.js";
import { BN, Program } from "@coral-xyz/anchor";
import { ViridisStaking } from "../types/viridis_staking";

type StakeArgs = {
  args: {
    dAmount: number;
  };
  accounts: {
    signer: PublicKey;
    mint: PublicKey;
  };
  program: Program<ViridisStaking>;
};

export function getStakeIx({ accounts, program, args }: StakeArgs) {
  return program.methods
    .stake(new BN(args.dAmount))
    .accounts(accounts)
    .instruction();
}
