import { FC, useState } from "react";
import NFTCard from "./NFTCard";
import { useCandyMachine, useUmi } from "../../../web3/solana/hook";
import { Button, Image } from "@chakra-ui/react";
import NFTModal from "./NFTModal";
import { mintNftFromCandyMachine } from "../../../web3/solana/service/createNft";
import { useWallet } from "@solana/wallet-adapter-react";
import { Umi } from "@metaplex-foundation/umi";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";
import { fetchDigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { fetchMetadata } from "../../../web3/solana/service/fetchMetadata";
import RevealNFTModal from "./RevealNFTModal";
import StakeNowModal from "./StakeNowModal";
import { Spinner } from "@chakra-ui/react";
import { useCustomToast } from "../../../utils";
import { env } from "../../../env";

const ITEMS_PER_PAGE = 12;

const NFTCollectionGallery: FC = () => {
  const showToast = useCustomToast();
  const candyMachine = useCandyMachine();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRevealModalOpen, setRevealModalOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isStakeModalOpen, setStakeModalOpen] = useState(false);
  const [nftInfo, setNftInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const availableNFTs = candyMachine?.items?.length
    ? candyMachine?.items?.length - Number(candyMachine?.itemsRedeemed)
    : 0;

  const wallet = useWallet();
  const umi = useUmi(wallet);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    openStakeModal();
  };
  const openRevealModal = () => setRevealModalOpen(true);
  const closeRevealModal = () => {
    setRevealModalOpen(false);
    setModalOpen(true);
  };
  const openStakeModal = () => setStakeModalOpen(true);

  const buyNft = async (umi: Umi) => {
    setIsLoading(true);
    openRevealModal();

    try {
      const mint = await mintNftFromCandyMachine(umi);
      const digitalAsset = await fetchDigitalAsset(umi, mint);
      const metadata = await fetchMetadata(digitalAsset.metadata.uri);

      setNftInfo(metadata);
      setIsRevealed(true);
    } catch (error: any) {
      console.error("Error purchasing NFT:", error);
      closeRevealModal();
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
      <div className="mb-9 flex h-fit flex-col items-center justify-between rounded-[20px] bg-[#061A11] py-6 pl-2.5 pr-2.5 text-white lg:flex-row lg:pl-16">
        <div className="m-0 mb-6 flex w-full flex-col justify-center px-4 text-center lg:mb-0 lg:mr-6 lg:w-1/2 lg:justify-start lg:text-start">
          <h3 className="text-[34px] font-bold">Purchase pCRBN NFT</h3>
          <p className="mb-6 mt-2.5">
            These pCRBN NFTs represent partial ownership of the surface of the
            forest until the end of the Ownership Duration (OD). After the OD,
            the pCRBN remains in your wallet as a collectible
          </p>
          {wallet.publicKey && umi && availableNFTs > 0 ? (
            <Button
              variant="solid"
              onClick={() => buyNft(umi)}
              isLoading={isLoading}
              background={"#25AC88"}
              textColor={"#000000"}
              loadingText="Revealing NFT..."
              borderRadius={"26px"}
              _hover={{ background: "#ffffff", color: "#25AC88" }}
              _active={{ background: "#ffffff", color: "#25AC88" }}
              className="inset-y-0 m-auto max-w-fit flex-grow px-6 py-2.5 text-[14px] font-semibold lg:m-0"
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
        <div className="lg:max-w-1/2 relative w-[538px]">
          <div className="flex flex-col items-center justify-center md:min-h-[300px] md:flex-row">
            <Image
              src="./images/1.webp"
              className="h-[200px] max-h-full w-[200px] max-w-full rounded-[27px] object-cover sm:h-[230px] sm:w-[230px]"
              alt="First NFT Example"
            />
            <Image
              src="./images/5.webp"
              className="h-[200px] max-h-full w-[200px] max-w-full rounded-[27px] object-cover sm:h-[230px] sm:w-[230px]"
              alt="Third NFT Example"
            />
          </div>
          <Image
            src="./images/3.webp"
            className="z-1 absolute left-1/2 top-1/2 h-[230px] max-h-full w-[230px] max-w-full -translate-x-1/2 -translate-y-1/2 transform rounded-[27px] object-cover sm:h-[300px] sm:w-[300px] md:left-[45%]"
            alt="Second NFT Example"
          />
        </div>
      </div>
      <h3 className="font-sans text-[22px] font-semibold text-white">
        Explore NFT Collection
      </h3>
      <p className="font-sans text-base font-medium text-white">
        {candyMachine.items.length} unique NFTs part of this project
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
            variant="solid"
            colorScheme="green"
            background={"#25AC88"}
            textColor={"#000000"}
            borderRadius={"26px"}
            _hover={{ background: "#ffffff", color: "#25AC88" }}
            _active={{ background: "#ffffff", color: "#25AC88" }}
            className="inset-y-0 mt-8 w-full max-w-40 flex-grow !text-wrap rounded-[26px] px-6 py-2.5 text-[14px] font-semibold"
          >
            View More
          </Button>
        </div>
      )}
      <RevealNFTModal
        isOpen={isRevealModalOpen}
        onClose={closeRevealModal}
        isRevealed={isRevealed}
      />
      <StakeNowModal
        isOpen={isStakeModalOpen}
        onClose={() => setStakeModalOpen(false)}
      />
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
