import { FC, useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import NFTModal from "./NFTModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { getReFiNfts } from "../../../web3/solana/service/getReFiNfts";
import { useUmi } from "../../../web3/solana/hook";
import { DigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { fetchMetadata } from "../../../web3/solana/service/fetchMetadata";

const MyNFTsGallery: FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [nftInfo, setNftInfo] = useState<DigitalAsset | null>(null);
  const [nfts, setNfts] = useState<DigitalAsset[]>([]);
  const wallet = useWallet();
  const umi = useUmi(wallet);

  useEffect(() => {
    if (wallet.publicKey && umi) {
      (async () => {
        const fetchedNfts = await getReFiNfts(umi, wallet.publicKey);
        setNfts(fetchedNfts);
      })();
    }
  }, [wallet.publicKey, umi]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleLearnMore = async (uri: string) => {
    try {
      const metadata = await fetchMetadata(uri);
      setNftInfo(metadata);
      openModal();
    } catch (error) {
      console.error("Failed to fetch metadata for NFT:", error);
    }
  };

  return (
    <div>
      {nfts.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nfts.map((nft, index) => (
            <NFTCard
              key={index}
              name={nft.metadata.name}
              uri={nft.metadata.uri}
              onClick={() => handleLearnMore(nft.metadata.uri)}
            />
          ))}
        </div>
      ) : (
        <p className="text-white">No NFTs found.</p>
      )}
      {nftInfo && (
        <NFTModal isOpen={isModalOpen} onClose={closeModal} nftInfo={nftInfo} />
      )}
    </div>
  );
};

export default MyNFTsGallery;
