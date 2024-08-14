import { PublicKey } from "@solana/web3.js";
import { getConnection } from "../connection";
import { publicKey } from "@metaplex-foundation/umi";

export async function getNftMints(address: PublicKey) {
  const connection = getConnection();

  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    new PublicKey(address),
    { programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") },
  );

  const nftTokeAccounts = tokenAccounts.value.filter(
    (tokenAccount) =>
      tokenAccount.account.data.parsed.info.tokenAmount.amount === "1" &&
      tokenAccount.account.data.parsed.info.tokenAmount.decimals === 0,
  );

  return nftTokeAccounts.map((tokenAccount) =>
    publicKey(tokenAccount.account.data.parsed.info.mint),
  );
}
