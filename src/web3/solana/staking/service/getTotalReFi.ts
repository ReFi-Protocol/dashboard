import { PublicKey } from "@solana/web3.js";
import { SPL_MINT_PK } from "../../const";
import { getConnection } from "../../connection";

export async function getTotalReFi(address: PublicKey) {
  const connection = getConnection();

  try {
    const tokenAccounts = await connection.getTokenAccountsByOwner(address, {
      mint: SPL_MINT_PK,
    });
    if (tokenAccounts.value.length === 0) {
      return 0;
    }

    const accountInfo = await connection.getAccountInfo(
      tokenAccounts.value[0].pubkey,
    );

    if (!accountInfo) {
      return 0;
    }

    const data = accountInfo.data;
    const amount = data.readBigUInt64LE(64);

    return Number(amount);
  } catch (error) {
    console.error("Error getting token balance:", error);
    return 0;
  }
}
