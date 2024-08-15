import { Connection, PublicKey } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";

export async function getSplMintDecimals(
  connection: Connection,
  mintAddress: string,
): Promise<number> {
  try {
    const mintInfo = await getMint(connection, new PublicKey(mintAddress));
    return mintInfo.decimals;
  } catch (error) {
    console.error("Error fetching SPL token mint decimals:", error);
    throw error;
  }
}
