import { FC, useEffect, useState } from "react";

import StakesAndRewardsTable from "./components/StakesAndRewardsTable";

import { StakingPoolData } from "../../types";
import StakingPromoBanner from "./components/StakingPromoBanner";
import StakingPools from "./components/StakingPools";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";

import { Stake, StakeInfoAccount } from "../../web3/solana/staking/types";

import { useUmi } from "../../web3/solana/hook";
import { getMyStakes } from "../../web3/solana/staking/service/getMyStakes";
import { useAppSelector } from "../../store";
import ConnectWalletModal from "../connect-wallet-modal";
import StakingPoolOptionsModal from "./components/StakingPoolOptionsModal";
import { getReFiNfts } from "../../web3/solana/service/getReFiNfts";
import { getConfig } from "../../web3/solana/staking/service/getConfig";
import MyMetrics from "../MyMetrics";
import GlobalMetrics from "../GlobalMetrics";
import RestakeModal from "./components/RestakeModal";
import { getAllStakes } from "../../web3/solana/staking/service/getAllStakes";

const stakingPoolData: StakingPoolData[] = [
  {
    duration: 45,
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "20%",
  },
  {
    duration: 80,
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "50%",
  },
  {
    duration: 90,
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "110%",
  },
  {
    duration: null,
    maxStake:
      "Stake or de-stake anytime. There is no limit to the $REFI staked.",
    apy: "3.5%",
  },
];

const StakingContent: FC = () => {
  const { currentPrice } = useAppSelector((state) => state.price);
  const [selectedPoolIndex, setSelectedPoolIndex] = useState<number | null>(
    null,
  );
  const [stakes, setStakes] = useState<Stake[]>([]);
  const [config, setConfig] = useState<Awaited<
    ReturnType<typeof getConfig>
  > | null>(null);
  const [userHasNfts, setUserHasNfts] = useState<boolean>(false);
  const [isConnectWalletModalOpen, setConnectWalletModalOpen] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRestakeModalOpen, setRestakeModalOpen] = useState(false);
  const anchorWallet = useAnchorWallet();
  const walletContext = useWallet();
  const umi = useUmi(walletContext);
  const [allStakesAccs, setAllStakesAccs] = useState<StakeInfoAccount[]>([]);

  useEffect(() => {
    getAllStakes().then(setAllStakesAccs);
  }, []);

  useEffect(() => {
    if (anchorWallet && umi) {
      getReFiNfts(umi, anchorWallet.publicKey).then((refiNfts) => {
        setUserHasNfts(refiNfts.length > 0);
      });
    }
  }, [anchorWallet, umi]);

  useEffect(() => {
    if (anchorWallet && umi && walletContext.connected) {
      getMyStakes(anchorWallet).then((stakes) => {
        setStakes(stakes);
      });

      getConfig(anchorWallet).then((config) => {
        setConfig(config);
      });
    } else {
      setStakes([]);
    }
  }, [anchorWallet, umi]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSelectPool = (index: number) => {
    setSelectedPoolIndex(index);
  };

  if (!walletContext.publicKey) {
    return (
      <ConnectWalletModal
        isOpen={isConnectWalletModalOpen}
        onClose={() => setConnectWalletModalOpen(false)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-12 text-white">
      <StakingPromoBanner />
      <GlobalMetrics stakeAccounts={allStakesAccs} />
      <MyMetrics />
      <StakingPools
        stakingPoolData={stakingPoolData}
        selectedPoolIndex={selectedPoolIndex}
        onSelectPool={handleSelectPool}
        userHasNfts={userHasNfts}
      />
      <StakesAndRewardsTable
        currentPrice={currentPrice}
        stakes={stakes}
        onStakeNow={openModal}
      />
      <StakingPoolOptionsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        stakingPoolData={stakingPoolData}
        selectedPoolIndex={selectedPoolIndex}
        onSelectPool={handleSelectPool}
      />
      <RestakeModal
        isOpen={isRestakeModalOpen}
        onClose={() => setRestakeModalOpen(false)}
      />
    </div>
  );
};

export default StakingContent;
