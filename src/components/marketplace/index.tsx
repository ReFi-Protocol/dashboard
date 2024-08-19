import { useState, FC } from "react";
import TabContent from "./components/TabContent";
import MarketplaceBanner from "./components/MarketplaceBanner";
import ProjectStats from "./components/ProjectStats";
import { useCandyMachine } from "../../web3/solana/hook";
import { useWallet } from "@solana/wallet-adapter-react";
import ConnectWalletModal from "../connect-wallet-modal";
import { env } from "../../env";

const tabOptions = [
  "NFT Collection",
  "About the project",
  "Highlights",
  "My NFTs",
];

const MarketplaceContent: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("NFT Collection");
  const [isModalOpen, setModalOpen] = useState(true);
  const wallet = useWallet();
  const candyMachine = useCandyMachine();
  const FREEZED_NFTS =
    (candyMachine?.items?.length || 0) - env.VITE_MAX_NFT_AVAILABLE;

  const availableNFTs = candyMachine?.items?.length
    ? candyMachine?.items?.length -
      FREEZED_NFTS -
      Number(candyMachine?.itemsRedeemed)
    : 0;

  const mockData = [
    {
      value: `${availableNFTs}/${env.VITE_MAX_NFT_AVAILABLE}`,
      name: "NFTs Available",
    },
    { value: "110%", name: "Maximum APY" },
    { value: "125,000 $REFI", name: "Starting from" },
    { value: "125,000 $REFI", name: "Volume traded" },
    { value: "92 days", name: "Ownership Duration" },
  ];

  if (!wallet.publicKey) {
    return (
      <ConnectWalletModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    );
  }

  return (
    <div>
      <MarketplaceBanner
        title="Peyrat-de-Bellac Forest"
        description="Discover the Peyrat-de-Bellac forest in central France, the work we do and the NFT collection you can buy of this Forest."
        logoSrc="./images/Logo-ET-vignette.png"
        bannerImage="/images/forest-promo-image.jpg"
      />
      <ProjectStats stats={mockData} />
      <div>
        <div className="mb-11 flex flex-col justify-start gap-4 sm:flex-row">
          {tabOptions.map((tab) => (
            <button
              key={tab}
              className={`rounded-[50px] px-5 py-2.5 font-sans text-base font-semibold ${
                activeTab === tab
                  ? "text-black bg-white"
                  : "bg-[#061A11] text-white"
              } rounded-[50px]`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <TabContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceContent;
