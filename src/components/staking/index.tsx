import { FC, useEffect, useState } from "react";
import {
  LockIcon,
  GraphIcon,
  MoneyIcon,
  ShieldILockIcon,
  ConfettiIcon,
  SumIcon,
} from "../icons";

import StakesAndRewardsTable from "./components/StakesAndRewardsTable";

import { WidgetData, StakingPoolData } from "../../types";
import StakingPromoBanner from "./components/StakingPromoBanner";
import MetricsSection from "../MetricSection";
import StakingPools from "./components/StakingPools";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";

import { Stake } from "../../web3/solana/staking/types";

import { useUmi } from "../../web3/solana/hook";
import { getStakes } from "../../web3/solana/staking/service/getStakes";
import { useAppSelector } from "../../store";
import ConnectWalletModal from "../connect-wallet-modal";
import StakingPoolOptionsModal from "./components/StakingPoolOptionsModal";
import { getReFiNfts } from "../../web3/solana/service/getReFiNfts";
import RestakeModal from "./components/RestakeModal";
import { getLockedReFi } from "../../web3/solana/staking/service/getLockedReFi";
import { getTotalReFi } from "../../web3/solana/staking/service/getTotalReFi";
import { formatReFi } from "../../web3/solana/staking/util";
import { getExpectedReward } from "../../web3/solana/staking/service/getExpectedReward";
import { getLockedNftCount } from "../../web3/solana/staking/service/getLockedNftCount";
import { DigitalAsset } from "@metaplex-foundation/mpl-token-metadata";

const globalMetricsWidgets: WidgetData[] = [
  {
    icon: <LockIcon width={28} height={28} fill="white" />,
    title: "Total Supply Locked",
    subtitle: "50%",
  },
  {
    icon: <GraphIcon width={28} height={28} fill="white" />,
    title: "Fully Diluted Valuation",
    subtitle: "$3,232,234",
  },
  {
    icon: <MoneyIcon width={28} height={28} fill="white" />,
    title: "USD Price",
    subtitle: "$0.002",
  },
  {
    icon: <ShieldILockIcon width={28} height={28} fill="white" />,
    title: "Total Value Locked",
    subtitle: "$REFI 200",
  },
];

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
    apy: "5.5%",
  },
];

const StakingContent: FC = () => {
  const { currentPrice } = useAppSelector((state) => state.price);
  const [selectedPoolIndex, setSelectedPoolIndex] = useState<number | null>(
    null,
  );
  const [stakes, setStakes] = useState<Stake[]>([]);
  const [userHasNfts, setUserHasNfts] = useState<boolean>(false);
  const [isConnectWalletModalOpen, setConnectWalletModalOpen] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRestakeModalOpen, setRestakeModalOpen] = useState(false);

  const anchorWallet = useAnchorWallet();
  const walletContext = useWallet();
  const umi = useUmi(walletContext);

  const [myNfts, setMyNfts] = useState<DigitalAsset[]>([]);
  const lockedReFi = getLockedReFi(stakes);
  const expectedReward = getExpectedReward(stakes);
  const lockedNftCount = getLockedNftCount(stakes);
  const [totalReFi, setTotalReFi] = useState(0);

  const userMetricsWidgets: WidgetData[] = [
    {
      icon: <SumIcon width={28} height={28} fill="white" />,
      title: "Total Owned",
      subtitle: `${formatReFi(totalReFi)} $REFI`,
    },
    {
      icon: <LockIcon width={28} height={28} fill="white" />,
      title: "Locked in Staking",
      subtitle: `${formatReFi(lockedReFi)} $REFI`,
    },
    {
      icon: <ConfettiIcon width={28} height={28} fill="white" />,
      title: "Expected Rewards",
      subtitle: `${formatReFi(expectedReward)} $REFI`,
    },
    {
      icon: <LockIcon width={28} height={28} fill="white" />,
      title: "Owned/Locked pCRBN",
      subtitle: `${myNfts.length + lockedNftCount} pCRBN`,
    },
  ];

  useEffect(() => {
    if (anchorWallet && umi) {
      getReFiNfts(umi, anchorWallet.publicKey).then((refiNfts) => {
        setUserHasNfts(refiNfts.length > 0);
      });
    }
  }, [anchorWallet, umi]);

  useEffect(() => {
    if (anchorWallet && umi && walletContext.connected) {
      getStakes(anchorWallet).then((stakes) => {
        setStakes(stakes);
      });
      getReFiNfts(umi, anchorWallet.publicKey).then(setMyNfts);
    } else {
      setStakes([]);
      setMyNfts([]);
    }
  }, [anchorWallet, umi]);

  useEffect(() => {
    if (anchorWallet) {
      getTotalReFi(anchorWallet.publicKey).then(setTotalReFi);
    } else {
      setTotalReFi(0);
    }
  }, [anchorWallet]);

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
      <MetricsSection
        metricsWidgets={globalMetricsWidgets}
        title="Global Metrics"
      />
      <MetricsSection metricsWidgets={userMetricsWidgets} title="My Metrics" />
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
