import { DigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../store";
import { useUmi } from "../../web3/solana/hook";
import { getReFiNfts } from "../../web3/solana/service/getReFiNfts";
import { getAllStakes } from "../../web3/solana/staking/service/getAllStakes";
import { getMyStakes } from "../../web3/solana/staking/service/getMyStakes";
import { Stake, StakeInfoAccount } from "../../web3/solana/staking/types";
import GlobalMetrics from "../GlobalMetrics";
import MyMetrics from "../MyMetrics";
import ConnectWalletModal from "../connect-wallet-modal";
import MyNFTsGallery from "../marketplace/components/MyNFTsGallery";
import ExchangeRateChart from "./components/ExchangeRateChart";
import GrowthChart from "./components/GrowthChart";

const DashboardContent: FC = () => {
  const { historicalPrices, currentPrice } = useAppSelector(
    (state) => state.price,
  );
  const anchorWallet = useAnchorWallet();
  const [isModalOpen, setModalOpen] = useState(true);
  const wallet = useWallet();
  const umi = useUmi(wallet);
  const [stakes, setStakes] = useState<Stake[]>([]);
  const [myNfts, setMyNfts] = useState<DigitalAsset[]>([]);
  const [allStakesAccs, setAllStakesAccs] = useState<StakeInfoAccount[]>([]);

  useEffect(() => {
    getAllStakes().then(setAllStakesAccs);
  }, []);

  useEffect(() => {
    if (anchorWallet && umi && wallet.connected) {
      getMyStakes(anchorWallet).then((stakes) => {
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
      <GlobalMetrics stakeAccounts={allStakesAccs} />
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
