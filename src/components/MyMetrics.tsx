import { DigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { FC, useEffect, useState } from "react";
import { WidgetData } from "../types";
import { useUmi } from "../web3/solana/hook";
import { getReFiNfts } from "../web3/solana/service/getReFiNfts";
import { getExpectedReward } from "../web3/solana/staking/service/getExpectedReward";
import { getLockedNftCount } from "../web3/solana/staking/service/getLockedNftCount";
import { getLockedReFi } from "../web3/solana/staking/service/getLockedReFi";
import { getMyStakes } from "../web3/solana/staking/service/getMyStakes";
import { getTotalReFi } from "../web3/solana/staking/service/getTotalReFi";
import { Stake } from "../web3/solana/staking/types";
import { formatReFi } from "../web3/solana/staking/util";
import MetricsSection from "./MetricSection";
import { ConfettiIcon, LockIcon, SumIcon } from "./icons";

interface MyMetricsProps {
  claimedRewards: number;
}

const MyMetrics: FC<MyMetricsProps> = ({ claimedRewards }) => {
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
      getMyStakes(anchorWallet).then((stakes) => {
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

  const metricsWidgets: WidgetData[] = [
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
      subtitle: `${formatReFi(expectedReward - claimedRewards)} $REFI`,
    },
    {
      icon: <LockIcon width={28} height={28} fill="white" />,
      title: "Owned/Locked pCRBN",
      subtitle: `${myNfts.length } pCRBN`,
    },
  ];

  return <MetricsSection title="My Metrics" metricsWidgets={metricsWidgets} />;
};

export default MyMetrics;
