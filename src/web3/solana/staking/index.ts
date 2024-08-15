import { AnchorProvider } from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { ViridisStaking } from "./types/viridis_staking";
import { Wallet } from "./types";
import IDL from "./idl/viridis_staking.json";
import { getConnection } from "../connection";

export const getProvider = (wallet: Wallet) => {
  return new AnchorProvider(getConnection(), wallet, {
    preflightCommitment: "confirmed",
  });
};

export const getProgram = (wallet: Wallet) => {
  return new Program<ViridisStaking>(
    IDL as ViridisStaking,
    getProvider(wallet),
  );
};
