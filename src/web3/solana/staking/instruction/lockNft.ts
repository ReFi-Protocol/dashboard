import { PublicKey } from "@solana/web3.js";
import { BN, Program } from "@coral-xyz/anchor";
import { ViridisStaking } from "../types/viridis_staking";

type LockNftArgs = {
  args: {
    stakeIndex: number;
    lockPeriod: number;
  };
  accounts: {
    signer: PublicKey;
    mint: PublicKey;
  };
  program: Program<ViridisStaking>;
};

export function getLockNftIx({ accounts, program, args }: LockNftArgs) {
  return program.methods
    .lockNft(new BN(args.stakeIndex), args.lockPeriod)
    .accounts(accounts)
    .instruction();
}
