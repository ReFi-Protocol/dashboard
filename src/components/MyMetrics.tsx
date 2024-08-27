import { FC, useEffect, useState } from "react";
import MetricsSection from "./MetricSection";
import { LockIcon, ConfettiIcon, SumIcon } from "./icons";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useUmi } from "../web3/solana/hook";
import { Stake } from "../web3/solana/staking/types";
import { getReFiNfts } from "../web3/solana/service/getReFiNfts";
import { getMyStakes } from "../web3/solana/staking/service/getMyStakes";
import { DigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { getLockedReFi } from "../web3/solana/staking/service/getLockedReFi";
import { getTotalReFi } from "../web3/solana/staking/service/getTotalReFi";
import { formatReFi } from "../web3/solana/staking/util";
import { getExpectedReward } from "../web3/solana/staking/service/getExpectedReward";
import { getLockedNftCount } from "../web3/solana/staking/service/getLockedNftCount";
import { WidgetData } from "../types";

const MyMetrics: FC = () => {
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
      subtitle: `${formatReFi(expectedReward)} $REFI`,
    },
    {
      icon: <LockIcon width={28} height={28} fill="white" />,
      title: "Owned/Locked pCRBN",
      subtitle: `${myNfts.length + lockedNftCount} pCRBN`,
    },
  ];

  return <MetricsSection title="My Metrics" metricsWidgets={metricsWidgets} />;
};

export default MyMetrics;