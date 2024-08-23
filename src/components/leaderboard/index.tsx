import { FC, useState } from "react";
import MetricsSection from "../MetricSection";
import { LockIcon, GraphIcon, MoneyIcon, ShieldILockIcon } from "../icons";
import { WidgetData } from "../../types";
import LeaderboardTable from "./components/LeaderboardTable";
import ConnectWalletModal from "../connect-wallet-modal";
import { useWallet } from "@solana/wallet-adapter-react";

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
      <MetricsSection
        title="Global Metrics"
        metricsWidgets={globalMetricsWidgets}
      />
      <LeaderboardTable />
    </div>
  );
};

export default LeaderboardContent;
