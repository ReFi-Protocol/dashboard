import { fetchAllDigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { Umi } from "@metaplex-foundation/umi";
import { PublicKey } from "@solana/web3.js";
import { Stake } from "../staking/types";

export async function getStakedNfts(umi: Umi, stakes: Stake[]) {
    try {
        const nftMints: any = stakes
            .filter(stake => stake.nft !== null && stake.nftLockTime && !stake.nftUnlockTime)
            .map(stake => stake.nft as PublicKey);

        if (nftMints.length === 0) {
            return [];
        }

        const stakedNftMetadata = await fetchAllDigitalAsset(umi, nftMints);
        return stakedNftMetadata;
    } catch (error) {
        console.error("Error fetching staked NFTs:", error);
        return [];
    }
}
