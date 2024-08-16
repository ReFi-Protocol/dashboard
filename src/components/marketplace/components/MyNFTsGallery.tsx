import { FC, useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import NFTModal from "./NFTModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { getReFiNfts } from "../../../web3/solana/service/getReFiNfts";
import { useUmi } from "../../../web3/solana/hook";
import { DigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { fetchMetadata } from "../../../web3/solana/service/fetchMetadata";
import { Spinner, Button } from "@chakra-ui/react";
import { NFTInfo } from "../../../types";

const ITEMS_PER_PAGE = 6;

const MyNFTsGallery: FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [nftInfo, setNftInfo] = useState<NFTInfo | null>(null);
  const [nfts, setNfts] = useState<DigitalAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const wallet = useWallet();
  const umi = useUmi(wallet);

  useEffect(() => {
    const fetchNfts = async () => {
      if (wallet.publicKey && umi) {
        setLoading(true);
        try {
          const fetchedNfts = await getReFiNfts(umi, wallet.publicKey);
          setNfts(fetchedNfts);
        } catch (error) {
          console.error("Failed to fetch NFTs:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchNfts();
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

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  return (
    <div>
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <Spinner color="white" className="h-10 w-10" />
        </div>
      ) : nfts.length > 0 ? (
        <>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nfts.slice(0, visibleCount).map((nft, index) => (
              <NFTCard
                key={index}
                name={nft.metadata.name}
                uri={nft.metadata.uri}
                onClick={() => handleLearnMore(nft.metadata.uri)}
              />
            ))}
          </div>
          {visibleCount < nfts.length && (
            <div className="flex justify-center">
              <Button
                onClick={handleViewMore}
                variant="brand"
                borderRadius={"26px"}
                className="inset-y-0 mt-8 w-full max-w-40 flex-grow rounded-[26px] bg-[#25AC88] px-6 py-2.5 text-[14px] font-semibold text-[#000000]"
              >
                View More
              </Button>
            </div>
          )}
        </>
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
