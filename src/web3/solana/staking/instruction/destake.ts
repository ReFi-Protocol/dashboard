import { PublicKey } from "@solana/web3.js";
import { BN, Program } from "@coral-xyz/anchor";
import { ViridisStaking } from "../types/viridis_staking";

type DestakeArgs = {
  args: {
    stakeIndex: number;
  };
  accounts: {
    signer: PublicKey;
    mint: PublicKey;
  };
  program: Program<ViridisStaking>;
};

export function getDestakeIx({ accounts, program, args }: DestakeArgs) {
  return program.methods
    .destake(new BN(args.stakeIndex))
    .accounts(accounts)
    .instruction();
}
