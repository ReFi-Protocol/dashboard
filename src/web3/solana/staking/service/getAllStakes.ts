import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { ViridisStaking } from "../types/viridis_staking";
import IDL from "../idl/viridis_staking.json";
import { CLUSTER } from "../../const";

export async function getAllStakes() {
  const connection = new Connection(clusterApiUrl(CLUSTER));
  const provider = new AnchorProvider(connection, {} as any, {
    commitment: "confirmed",
  });

  const program = new Program<ViridisStaking>(IDL as ViridisStaking, provider);
  const accounts = await program.account.stakeInfo.all();

  return accounts;
}
