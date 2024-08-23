import { FC } from "react";
import MetricsSection from "../MetricSection";
import { LockIcon, GraphIcon, MoneyIcon, ShieldILockIcon } from "../icons";
import { WidgetData } from "../../types";
import LeaderboardTable from "./components/LeaderboardTable";

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
