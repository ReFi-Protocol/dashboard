import { FC, useState } from "react";
import NFTCard from "./NFTCard";
import { useCandyMachine, useUmi } from "../../../web3/solana/hook";
import { fetchCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { CANDY_MACHINE_ADDRESS } from "../../../web3/solana/const";
import { publicKey } from "@metaplex-foundation/umi";
import { Button, Image, useToast } from "@chakra-ui/react";
import NFTModal from "./NFTModal";
import { mintNftFromCandyMachine } from "../../../web3/solana/service/createNft";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { useWallet } from "@solana/wallet-adapter-react";
import { Umi } from "@metaplex-foundation/umi";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";
import { fetchDigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { fetchMetadata } from "../../../web3/solana/service/fetchMetadata";
import RevealNFTModal from "./RevealNFTModal";
import { Spinner } from "@chakra-ui/react";
import { useCustomToast } from "../../../utils";
import { env } from "../../../env";

const ITEMS_PER_PAGE = 12;

const NFTCollectionGallery: FC = () => {
  const showToast = useCustomToast();
  const candyMachine = useCandyMachine();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRevealModalOpen, setRevealModalOpen] = useState(false);
  const [nftInfo, setNftInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const FREEZED_NFTS =
    (candyMachine?.items?.length || 0) - env.VITE_MAX_NFT_AVAILABLE;

  const availableNFTs = candyMachine?.items?.length
    ? candyMachine?.items?.length -
      FREEZED_NFTS -
      Number(candyMachine?.itemsRedeemed)
    : 0;

  const wallet = useWallet();
  const umi = useUmi(wallet);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openRevealModal = () => setRevealModalOpen(true);
  const closeRevealModal = () => setRevealModalOpen(false);

  const buyNft = async (umi: Umi) => {
    setIsLoading(true);
    openRevealModal();

    try {
      const mint = await mintNftFromCandyMachine(umi);
      const digitalAsset = await fetchDigitalAsset(umi, mint);
      const metadata = await fetchMetadata(digitalAsset.metadata.uri);

      setNftInfo(metadata);
      closeRevealModal();
      openModal();
    } catch (error: any) {
      console.error("Error purchasing NFT:", error);

      console.log(JSON.stringify(error));
      console.log(error.name);
      function getDescription(error: { name: string }) {
        switch (error.name) {
          case "NotEnoughTokens":
            return "Not enough ReFi";
          case "ProgramErrorNotRecognizedError":
            return "Not enough SOL";
          default:
            return "An unexpected error occurred. Please contact us";
        }
      }

      console.log(JSON.stringify(error));
      closeRevealModal();
      showToast({
        title: "Error purchasing NFT",
        description: getDescription(error),
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const paginatedItems = candyMachine
    ? candyMachine.items
        .slice(0, env.VITE_MAX_NFT_AVAILABLE)
        .slice(0, currentPage * ITEMS_PER_PAGE)
    : [];

  return candyMachine ? (
    <div>
      <div className="mb-9  flex  h-fit items-center justify-between rounded-[20px] bg-[#061A11] py-6 pl-16 pr-2.5 text-white">
        <div className="mr-6 w-1/2">
          <h3 className="text-[34px] font-bold">Purchase pCRBN NFT</h3>
          <p className="mb-6 mt-2.5">
            These pCRBN NFTs represent partial ownership of the surface of the
            forest until the end of the Ownership Duration (OD). After the OD,
            the pCRBN remains in your wallet as a collectible
          </p>
          {wallet.publicKey && umi && availableNFTs > 0 ? (
            <Button
              variant="brand"
              onClick={() => buyNft(umi)}
              isLoading={isLoading}
              loadingText="Revealing NFT..."
              borderRadius={"26px"}
              className="inset-y-0 min-w-fit flex-grow bg-[#25AC88] px-6 py-2.5 text-[14px] font-semibold text-[#000000]"
            >
              Buy NFT for 125,000 $REFI
            </Button>
          ) : (
            <UnifiedWalletButton
              buttonClassName="wallet-button"
              overrideContent="Connect SOL WALLET"
            />
          )}
        </div>
        <div className="max-w-1/2 relative w-[538px]">
          <div className="flex min-h-[300px]  items-center">
            <Image
              src="./images/1.webp"
              className="h-[230px] w-[230px] rounded-[27px]"
              alt="First NFT Example"
            />
            <Image
              src="./images/5.webp"
              className="h-[230px] w-[230px] rounded-[27px]"
              alt="Third NFT Example"
            />
          </div>
          <Image
            src="./images/3.webp"
            className="z-1 absolute left-[45%] top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 transform rounded-[27px]"
            alt="Second NFT Example"
          />
        </div>
      </div>
      <h3 className="font-sans text-[22px] font-semibold text-white">
        Explore NFT Collection
      </h3>
      <p className="font-sans text-base font-medium text-white">
        {/* {candyMachine.items.length}  */}
        50 unique NFTs part of this project
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedItems.map((item) => (
          <NFTCard
            name={item.name}
            key={item.index}
            uri={item.uri}
            onClick={() => handleLearnMore(item.uri)}
          />
        ))}
      </div>
      {paginatedItems.length <
        candyMachine.items.slice(0, env.VITE_MAX_NFT_AVAILABLE).length && (
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
      <RevealNFTModal isOpen={isRevealModalOpen} onClose={closeRevealModal} />
      {nftInfo && (
        <NFTModal isOpen={isModalOpen} onClose={closeModal} nftInfo={nftInfo} />
      )}
    </div>
  ) : (
    <div className="flex h-full items-center justify-center">
      <Spinner color="white" className="h-10 w-10" />
    </div>
  );
};

export default NFTCollectionGallery;
