import { FC, useEffect, useState } from "react";
import { MdBarChart, MdLock } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import Widget from "../../components/widget";
import { FaMoneyBills } from "react-icons/fa6";
import ExchangeRateChart from "./components/ExchangeRateChart";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useUmi } from "../../web3/solana/hook";
import { Stake } from "../../web3/solana/staking/types";
import { getReFiNfts } from "../../web3/solana/service/getReFiNfts";
import { getStakes } from "../../web3/solana/staking/service/getStakes";
import { DigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { getLockedReFi } from "../../web3/solana/staking/service/getLockedReFi";
import { getTotalReFi } from "../../web3/solana/staking/service/getTotalReFi";
import { formatReFi } from "../../web3/solana/staking/util";
import { getExpectedReward } from "../../web3/solana/staking/service/getExpectedReward";
import { getLockedNftCount } from "../../web3/solana/staking/service/getLockedNftCount";
import GrowthChart from "./components/GrowthChart";

const DashboardContent: FC = () => {
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

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 3xl:grid-cols-4">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Owned"}
          subtitle={`${formatReFi(totalReFi)} $REFI`}
        />
        <Widget
          icon={<MdLock className="h-6 w-6" />}
          title={"Locked in Staking"}
          subtitle={`${formatReFi(lockedReFi)} $REFI`}
        />
        <Widget
          icon={<FaMoneyBills className="h-7 w-7" />}
          title={"Expected Rewards"}
          subtitle={`${formatReFi(expectedReward)} $REFI`}
        />
        <Widget
          icon={<IoLocationSharp className="h-6 w-6" />}
          title={"Owned/Staked pCRBN"}
          subtitle={`${myNfts.length + lockedNftCount} pCRBN`}
        />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ExchangeRateChart />
        <GrowthChart stakes={stakes} />
      </div>
    </div>
  );
};

export default DashboardContent;
