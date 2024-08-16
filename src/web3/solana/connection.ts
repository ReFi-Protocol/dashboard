import { Connection } from "@solana/web3.js";
import { RPC_URL } from "./const";

export const getConnection = () => {
  return new Connection(RPC_URL, {
    commitment: "confirmed",
  });
};
