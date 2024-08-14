import { FC, useState } from "react";
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
];

const stakingPoolData: StakingPoolData[] = [
  {
    duration: "30 Days",
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "35%",
  },
  {
    duration: "60 Days",
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "65%",
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

const mockStakes = [
  {
    state: 0,
    amount: "$REFI 1500",
    usdValue: "$500",
    startDate: "14-07-2024",
    lockedEndDate: "16-07-2024",
    apy: "35%",
    txStatus: "CONFIRMED",
    rewards: "25 Tokens",
  },
  {
    state: 1,
    amount: "$REFI 1500",
    usdValue: "$500",
    startDate: "14-07-2024",
    lockedEndDate: "16-07-2024",
    apy: "35%",
    txStatus: "CONFIRMED",
    rewards: "25 Tokens",
  },
  {
    state: 2,
    amount: "$REFI 1500",
    usdValue: "$500",
    startDate: "No Lock-in",
    lockedEndDate: "No Lock-in",
    apy: "5.5%",
    txStatus: "CONFIRMED",
    rewards: "25 Tokens",
  },
];

const StakingContent: FC = () => {
  const [selectedPoolIndex, setSelectedPoolIndex] = useState<number>(
    stakingPoolData.length - 1,
  );

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSelectPool = (index: number) => {
    setSelectedPoolIndex(index);
  };

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
      />
      <StakesAndRewardsTable stakes={mockStakes} onStakeNow={openModal} />
    </div>
  );
};

export default StakingContent;
