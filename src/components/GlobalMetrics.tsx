import React, { FC, useEffect, useState } from "react";
import MetricsSection from "./MetricSection";
import { LockIcon, GraphIcon, MoneyIcon, ShieldILockIcon } from "./icons";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useUmi } from "../web3/solana/hook";

import {
  calculatePercentage,
  formatReFi,
  formatUSD,
} from "../web3/solana/staking/util";

import { WidgetData } from "../types";
import { useAppSelector } from "../store";
import { getTotalValueLocked } from "../web3/evm/service/getTotalValueLocked";
import { getTotalSupply } from "../web3/evm/service/getTotalSupply";
import { d } from "../web3/util/d";
import { ERC_REFI_DECIMALS } from "../web3/evm/const";
import { StakeInfoAccount } from "../web3/solana/staking/types";
import { getTotalRefiLocked } from "../web3/solana/staking/service/getTotalRefiLocked";

interface GlobalMetricsProps {
  stakeAccounts: StakeInfoAccount[];
}

const GlobalMetrics: FC<GlobalMetricsProps> = ({ stakeAccounts }) => {
  const { currentPrice, fullyDilutedValuation } = useAppSelector(
    (state) => state.price,
  );
  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const umi = useUmi(wallet);
  const [ethValueLocked, setEthValueLocked] = useState<bigint>(0n);
  const [dTotalSupply, setDTotaSupply] = useState<bigint>(0n);
  const totalSplReFiLocked = getTotalRefiLocked(stakeAccounts);
  const totalSupply = d(Number(dTotalSupply), ERC_REFI_DECIMALS);

  const totalRefiLocked =
    d(Number(ethValueLocked), ERC_REFI_DECIMALS) +
    d(Number(totalSplReFiLocked));
  const percentageLocked = calculatePercentage(totalRefiLocked, totalSupply);

  useEffect(() => {
    getTotalValueLocked().then(setEthValueLocked);
    getTotalSupply().then(setDTotaSupply);
  }, []);

  const globalMetricsWidgets: WidgetData[] = [
    {
      icon: <LockIcon width={28} height={28} fill="white" />,
      title: "Total Supply Staked",
      subtitle: `${percentageLocked}%`,
    },
    {
      icon: <GraphIcon width={28} height={28} fill="white" />,
      title: "Fully Diluted Valuation",
      subtitle: `${formatUSD(fullyDilutedValuation)}`,
    },
    {
      icon: <MoneyIcon width={28} height={28} fill="white" />,
      title: "USD Price",
      subtitle: `${formatUSD(currentPrice)}`,
    },
    {
      icon: <ShieldILockIcon width={28} height={28} fill="white" />,
      title: "Total Value Locked",
      subtitle: `${formatReFi(totalRefiLocked, 0)} $REFI`,
    },
  ];

  return (
    <MetricsSection
      title="Global Metrics"
      metricsWidgets={globalMetricsWidgets}
    />
  );
};

export default GlobalMetrics;
