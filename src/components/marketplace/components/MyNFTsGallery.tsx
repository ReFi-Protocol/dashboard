import { Button, Image, Spinner } from "@chakra-ui/react";
import { DigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { FC, useEffect, useState } from "react";
import { NFTInfo } from "../../../types";
import { useUmi } from "../../../web3/solana/hook";
import { fetchMetadata } from "../../../web3/solana/service/fetchMetadata";
import { getReFiNfts } from "../../../web3/solana/service/getReFiNfts";
import { getStakedNfts } from "../../../web3/solana/service/getStakedNfts";
import { getMyStakes } from "../../../web3/solana/staking/service/getMyStakes";
import { Stake } from "../../../web3/solana/staking/types";
import NFTCard from "./NFTCard";
import NFTModal from "./NFTModal";

const ITEMS_PER_PAGE = 6;

const MyNFTsGallery: FC = () => {
  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const umi = useUmi(wallet);

  const [isModalOpen, setModalOpen] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const [stakes, setStakes] = useState<Stake[]>([]);
  const [nftInfo, setNftInfo] = useState<NFTInfo | null>(null);
  const [ownedNfts, setOwnedNfts] = useState<DigitalAsset[]>([]);
  const [lockedNfts, setLockedNfts] = useState<DigitalAsset[]>([]);
  const [collectibleNfts, setCollectibleNfts] = useState<DigitalAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedUri, setSelectedUri] = useState<string>("");

  useEffect(() => {
    const loadStakesAndNFTs = async () => {
      if (!anchorWallet || !umi || !wallet.connected) {
        setStakes([]);
        setOwnedNfts([]);
        return;
      }

      try {
        const [fetchedStakes, fetchedOwnedNfts] = await Promise.all([
          getMyStakes(anchorWallet),
          getReFiNfts(umi, anchorWallet.publicKey),
        ]);
        setStakes(fetchedStakes);
        setOwnedNfts(fetchedOwnedNfts);
      } catch (error) {
        console.error("Error fetching stakes or NFTs:", error);
      }
    };

    loadStakesAndNFTs();
  }, [anchorWallet, umi, wallet.connected]);

  useEffect(() => {
    const fetchNfts = async () => {
      if (!wallet.publicKey || !umi) return;

      setLoading(true);
      try {
        const [fetchedOwnedNfts, fetchedStakedNfts] = await Promise.all([
          getReFiNfts(umi, wallet.publicKey),
          getStakedNfts(umi, stakes),
        ]);
        setOwnedNfts(fetchedOwnedNfts);
        setLockedNfts(fetchedStakedNfts.lockedNfts);
        setCollectibleNfts(fetchedStakedNfts.collectibleNfts);
      } catch (error) {
        console.error("Failed to fetch NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNfts();
  }, [wallet.publicKey, umi, stakes]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleLearnMore = async (uri: string) => {
    setSelectedUri(uri);
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

  const allNfts = [
    ...ownedNfts.map(nft => ({ ...nft, label: 'Owned' })),
    ...lockedNfts.map(nft => ({ ...nft, label: 'Locked' })),
    ...collectibleNfts.map(nft => ({ ...nft, label: 'Collectible' })),
  ];

  return (
    <div>
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <Spinner color="white" className="h-10 w-10" />
        </div>
      ) : allNfts.length > 0 ? (
        <div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allNfts.slice(0, visibleCount).map((nft, index) => (
              <NFTCard
                key={index}
                name={nft.metadata.name}
                uri={nft.metadata.uri}
                label={nft.label}
                show={true}
                onClick={() => handleLearnMore(nft.metadata.uri)}
              />
            ))}
          </div>

          {allNfts.length > visibleCount && (
            <div className="flex justify-center">
              <Button
                variant="solid"
                size="sm"
                colorScheme="green"
                background={"#25AC88"}
                textColor={"#1A1A1A"}
                _hover={{ background: "#ffffff", color: "#25AC88" }}
                _active={{ background: "#ffffff", color: "#25AC88" }}
                className="inset-y-0 mt-8 w-full max-w-40 flex-grow rounded-[26px] bg-[#25AC88] px-6 py-2.5 text-[14px] font-semibold text-[#000000]"
                borderRadius={"26px"}
                onClick={handleViewMore}
              >
                View More
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="m-auto flex flex-col items-center pt-24">
          <Image
            src="/icons/empty-box-icon.svg"
            alt="No transaction"
            boxSize="210px"
          />
          <p className="text-[15px] font-normal text-[#D0D0D0]">
            Your PCRBN NFT collection is currently empty. Purchased NFTs will be displayed here
          </p>
        </div>
      )}
      {nftInfo && (
        <NFTModal isOpen={isModalOpen} onClose={closeModal} nftInfo={nftInfo} uri={selectedUri}/>
      )}
    </div>
  );
};

export default MyNFTsGallery;
