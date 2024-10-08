import {
  DigitalAsset,
  fetchAllDigitalAsset,
} from "@metaplex-foundation/mpl-token-metadata";
import { Umi } from "@metaplex-foundation/umi";
import { PublicKey } from "@solana/web3.js";
import { COLLECTION_MINT_ADDRESS } from "../const";
import { getNftMints } from "./getNfts";

export async function getReFiNfts(umi: Umi, address: PublicKey) {
  const nftMints = await getNftMints(address);
  const nfts = await fetchAllDigitalAsset(umi, nftMints);
  return nfts.reduce<DigitalAsset[]>((acc, curr) => {
    if (
      curr.metadata.collection.__option === "Some" &&
      curr.metadata.collection.value.key === COLLECTION_MINT_ADDRESS
    ) {
      acc.push(curr);
    }
    return acc;
  }, []);
}
