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
import {
  useAnchorWallet,
  useWallet,
  WalletContextState,
} from "@solana/wallet-adapter-react";

import { Stake, Wallet } from "../../web3/solana/staking/types";

import { PublicKey } from "@solana/web3.js";
import { useUmi } from "../../web3/solana/hook";
import { Umi } from "@metaplex-foundation/umi";
import { getReFiNfts } from "../../web3/solana/service/getReFiNfts";
import { getStakes } from "../../web3/solana/staking/service/getStakes";
import { useAppSelector } from "../../store";
import { stake } from "../../web3/solana/staking/service/stake";
import { useToast } from "@chakra-ui/react";
import { useCustomToast } from "../../utils";
import { claim } from "../../web3/solana/staking/service/claim";
import { destake } from "../../web3/solana/staking/service/destake";
import { restake } from "../../web3/solana/staking/service/restake";

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

const userMetricsWidgets: WidgetData[] = [
  {
    icon: <SumIcon width={28} height={28} fill="white" />,
    title: "Total Owned",
    subtitle: "350.4 $REFI",
  },
  {
    icon: <LockIcon width={28} height={28} fill="white" />,
    title: "Locked in Staking",
    subtitle: "1130 $REFI",
  },
  {
    icon: <ConfettiIcon width={28} height={28} fill="white" />,
    title: "Expected Rewards",
    subtitle: "540 $REFI",
  },
  {
    icon: <LockIcon width={28} height={28} fill="white" />,
    title: "Owned/Locked pCRBN",
    subtitle: `22 pCRBN`,
  },
];

const stakingPoolData: StakingPoolData[] = [
  {
    duration: "45 Days",
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "20%",
  },
  {
    duration: "80 Days",
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "50%",
  },
  {
    duration: "90 Days",
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "110%",
  },
  {
    duration: "No lock-in period",
    maxStake:
      "Stake or de-stake anytime. There is no limit to the $REFI staked.",
    apy: "5.5%",
  },
];

const StakingContent: FC = () => {
  const showToast = useCustomToast();
  const { currentPrice } = useAppSelector((state) => state.price);
  const [selectedPoolIndex, setSelectedPoolIndex] = useState<number>(
    stakingPoolData.length - 1,
  );
  const [stakes, setStakes] = useState<Stake[]>([]);
  const anchorWallet = useAnchorWallet();
  const walletContext = useWallet();
  const umi = useUmi(walletContext);

  useEffect(() => {
    if (anchorWallet && umi && walletContext.connected) {
      getStakes(anchorWallet).then((stakes) => {
        setStakes(stakes);
      });
    } else {
      setStakes([]);
    }
  }, [anchorWallet, umi]);

  async function test(
    wallet: Wallet,
    umi: Umi,
    walletContext: WalletContextState,
  ) {
    const refiNfts = await getReFiNfts(umi, wallet.publicKey);
    const amount = 10_000;
    const nftToLock = new PublicKey(refiNfts[0].publicKey);
    const lockPeriod = 90;

    try {
      await stake(walletContext, wallet, amount, {
        mint: nftToLock,
        lockPeriod,
      });
    } catch (e: any) {
      showToast({
        title: "Error",
        description: e.message,
        status: "error",
      });

      console.error(e);
    }
  }

  async function test1(
    wallet: Wallet,
    walletContext: WalletContextState,
    stakeIndex: number,
  ) {
    try {
      await claim(walletContext, wallet, stakeIndex);
    } catch (e: any) {
      showToast({
        title: "Error",
        description: e.message,
        status: "error",
      });

      console.error(e);
    }
  }

  async function test2(
    wallet: Wallet,
    walletContext: WalletContextState,
    stakeIndex: number,
  ) {
    try {
      await destake(walletContext, wallet, stakeIndex);
    } catch (e: any) {
      showToast({
        title: "Error",
        description: e.message,
        status: "error",
      });

      console.error(e);
    }
  }

  async function test3(
    wallet: Wallet,
    walletContext: WalletContextState,
    stakeIndex: number,
  ) {
    try {
      await restake(walletContext, wallet, stakeIndex);
    } catch (e: any) {
      showToast({
        title: "Error",
        description: e.message,
        status: "error",
      });

      console.error(e);
    }
  }

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSelectPool = (index: number) => {
    setSelectedPoolIndex(index);
  };

  return (
    <div className="flex flex-col gap-12 text-white">
      {anchorWallet && umi && (
        <button onClick={() => test(anchorWallet, umi, walletContext)}>
          test stake
        </button>
      )}
      {anchorWallet && (
        <button onClick={() => test1(anchorWallet, walletContext, 0)}>
          test claim
        </button>
      )}
      {anchorWallet && (
        <button onClick={() => test2(anchorWallet, walletContext, 0)}>
          test destake
        </button>
      )}
      {anchorWallet && (
        <button onClick={() => test3(anchorWallet, walletContext, 0)}>
          test restake
        </button>
      )}
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
      />
      <StakesAndRewardsTable
        currentPrice={currentPrice}
        stakes={stakes}
        onStakeNow={openModal}
      />
    </div>
  );
};

export default StakingContent;
