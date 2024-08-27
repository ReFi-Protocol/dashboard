import { FC, useEffect, useState } from "react";
import LeaderboardTable from "./components/LeaderboardTable";
import ConnectWalletModal from "../connect-wallet-modal";
import { useWallet } from "@solana/wallet-adapter-react";
import GlobalMetrics from "../GlobalMetrics";
import { StakeInfoAccount } from "../../web3/solana/staking/types";
import { getAllStakes } from "../../web3/solana/staking/service/getAllStakes";
import { useAppSelector } from "../../store";

const LeaderboardContent: FC = () => {
  const { currentPrice } = useAppSelector((state) => state.price);
  const wallet = useWallet();
  const [isModalOpen, setModalOpen] = useState(true);
  const [allStakesAccs, setAllStakesAccs] = useState<StakeInfoAccount[]>([]);

  useEffect(() => {
    getAllStakes().then(setAllStakesAccs);
  }, []);

  if (!wallet.publicKey) {
    return (
      <ConnectWalletModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    );
  }
  return (
    <div className="flex flex-col gap-8">
      <GlobalMetrics stakeAccounts={allStakesAccs} />
      <LeaderboardTable
        stakeAccounts={allStakesAccs}
        currentPrice={currentPrice}
      />
    </div>
  );
};

export default LeaderboardContent;
