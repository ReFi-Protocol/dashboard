import React, { FC, useEffect, useState } from "react";
import MetricsSection from "./MetricSection";
import {
  LockIcon,
  ConfettiIcon,
  SumIcon,
  GraphIcon,
  MoneyIcon,
  ShieldILockIcon,
} from "./icons";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useUmi } from "../web3/solana/hook";
import { Stake } from "../web3/solana/staking/types";
import { getReFiNfts } from "../web3/solana/service/getReFiNfts";
import { getStakes } from "../web3/solana/staking/service/getStakes";
import { DigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { getLockedReFi } from "../web3/solana/staking/service/getLockedReFi";
import { getTotalReFi } from "../web3/solana/staking/service/getTotalReFi";
import { formatReFi, formatUSD } from "../web3/solana/staking/util";
import { getExpectedReward } from "../web3/solana/staking/service/getExpectedReward";
import { getLockedNftCount } from "../web3/solana/staking/service/getLockedNftCount";
import { WidgetData } from "../types";
import { useAppSelector } from "../store";

const GlobalMetrics: FC = () => {
  const { currentPrice, fullyDilutedValuation } = useAppSelector(
    (state) => state.price,
  );
  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const umi = useUmi(wallet);
  const [stakes, setStakes] = useState<Stake[]>([]);
  const [myNfts, setMyNfts] = useState<DigitalAsset[]>([]);

  const lockedReFi = getLockedReFi(stakes);
  const expectedReward = getExpectedReward(stakes);
  const lockedNftCount = getLockedNftCount(stakes);
  const [totalReFi, setTotalReFi] = useState(0);

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

  useEffect(() => {
    if (anchorWallet) {
      getTotalReFi(anchorWallet.publicKey).then(setTotalReFi);
    } else {
      setTotalReFi(0);
    }
  }, [anchorWallet]);

  const globalMetricsWidgets: WidgetData[] = [
    {
      icon: <LockIcon width={28} height={28} fill="white" />,
      title: "Total Supply Locked",
      subtitle: "50%",
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
      subtitle: "$REFI 200",
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
