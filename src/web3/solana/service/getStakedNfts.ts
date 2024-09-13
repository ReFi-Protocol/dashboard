import { fetchAllDigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { Umi } from "@metaplex-foundation/umi";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { Stake } from "../staking/types";

export async function getStakedNfts(umi: Umi, stakes: Stake[]) {
    try {
        const lockedNfts: any = [];
        const collectibleNfts: any = [];

        stakes
            .filter(stake => stake.nft !== null && stake.nftLockTime && stake.nftUnlockTime)
            .forEach(stake => {
                if (stake.nftLockTime && stake.nftUnlockTime) {
                    const lockTime = (stake.nftLockTime as BN).toNumber();
                    const unlockTime = (stake.nftUnlockTime as BN).toNumber();
                    console.log(lockTime, unlockTime)

                    const lockDurationDays = (unlockTime - lockTime) / (3600 * 24);
                    
                    if (lockDurationDays <= stake.maxNftApyDurationDays) {
                        lockedNfts.push(stake.nft as PublicKey);
                    } else {
                        collectibleNfts.push(stake.nft as PublicKey);
                    }
                }
            });
        if (lockedNfts.length === 0 && collectibleNfts.length === 0) {
            return { lockedNfts: [], collectibleNfts: [] };
        }

        const lockedNftMetadata = lockedNfts.length > 0 ? await fetchAllDigitalAsset(umi, lockedNfts) : [];
        const collectibleNftMetadata = collectibleNfts.length > 0 ? await fetchAllDigitalAsset(umi, collectibleNfts) : [];

        return {
            lockedNfts: lockedNftMetadata,
            collectibleNfts: collectibleNftMetadata
        };
    } catch (error) {
        console.error("Error fetching staked NFTs:", error);
        return { lockedNfts: [], collectibleNfts: [] };
    }
}