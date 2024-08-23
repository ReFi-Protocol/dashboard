import { FC, useState } from "react";
import LeaderboardTable from "./components/LeaderboardTable";
import ConnectWalletModal from "../connect-wallet-modal";
import { useWallet } from "@solana/wallet-adapter-react";
import GlobalMetrics from "../GlobalMetrics";

const LeaderboardContent: FC = () => {
  const wallet = useWallet();
  const [isModalOpen, setModalOpen] = useState(true);

  if (!wallet.publicKey) {
    return (
      <ConnectWalletModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    );
  }
  return (
    <div>
      <GlobalMetrics />
      <LeaderboardTable />
    </div>
  );
};

export default LeaderboardContent;
