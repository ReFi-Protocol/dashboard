import { PublicKey } from "@solana/web3.js";
import { BN, Program } from "@coral-xyz/anchor";
import { ViridisStaking } from "../types/viridis_staking";

type RestakeArgs = {
  args: {
    stakeIndex: number;
  };
  accounts: {
    signer: PublicKey;
    mint: PublicKey;
  };
  program: Program<ViridisStaking>;
};

export function getRestakeIx({ accounts, program, args }: RestakeArgs) {
  return program.methods
    .restake(new BN(args.stakeIndex))
    .accounts(accounts)
    .instruction();
}
