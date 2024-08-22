import { FC, useEffect, useState } from "react";
import ExchangeRateChart from "./components/ExchangeRateChart";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useUmi } from "../../web3/solana/hook";
import { Stake } from "../../web3/solana/staking/types";
import { getReFiNfts } from "../../web3/solana/service/getReFiNfts";
import { getStakes } from "../../web3/solana/staking/service/getStakes";
import { DigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import GrowthChart from "./components/GrowthChart";
import MyMetrics from "../MyMetrics";
import MyNFTsGallery from "../marketplace/components/MyNFTsGallery";
import ConnectWalletModal from "../connect-wallet-modal";
import { useAppSelector } from "../../store";

const DashboardContent: FC = () => {
  const { historicalPrices } = useAppSelector((state) => state.price);
  const anchorWallet = useAnchorWallet();
  const [isModalOpen, setModalOpen] = useState(true);
  const wallet = useWallet();
  const umi = useUmi(wallet);
  const [stakes, setStakes] = useState<Stake[]>([]);
  const [myNfts, setMyNfts] = useState<DigitalAsset[]>([]);
  const currentPrice = historicalPrices[historicalPrices.length - 1]?.[1] || 0;

  useEffect(() => {
    if (anchorWallet && umi && wallet.connected) {
      getStakes(anchorWallet).then((stakes) => {
        setStakes(stakes);
      });
      getReFiNfts(umi, anchorWallet.publicKey).then(setMyNfts);
    } else {
      setStakes([]);
      setMyNfts([]);
    }
  }, [anchorWallet, umi]);

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
      <MyMetrics />
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ExchangeRateChart
          prices={historicalPrices}
          currentPrice={currentPrice}
        />
        <GrowthChart stakes={stakes} />
      </div>
      <div>
        <h3 className="mb-4 mt-6 font-sans text-xl font-semibold text-white">
          My NFTs
        </h3>
        <MyNFTsGallery />
      </div>
    </div>
  );
};

export default DashboardContent;
