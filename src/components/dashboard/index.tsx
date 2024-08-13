import { FC } from "react";
import ExchangeRateChart from "./components/ExchangeRateChart";
import { LockIcon, ShieldILockIcon, ChartIcon, SellIcon } from "../icons";
import { WidgetData } from "../../types";
import MetricsSection from "../MetricSection";

const globalMetricsWidgets: WidgetData[] = [
  {
    icon: <LockIcon width={28} height={28} fill="white" />,
    title: "Total Supply Locked",
    subtitle: "152,500 $REFI",
  },
  {
    icon: <ChartIcon width={28} height={28} fill="white" />,
    title: "Fully Diluted Valuation",
    subtitle: "1130 $REFI",
  },
  {
    icon: <SellIcon width={28} height={28} fill="white" />,
    title: "USD Price",
    subtitle: "$0.002",
  },
  {
    icon: <ShieldILockIcon width={28} height={28} fill="white" />,
    title: "Total Value Locked",
    subtitle: "200 $REFI",
  },
];

const DashboardContent: FC = () => {
  return (
    <div>
      <MetricsSection
        metricsWidgets={globalMetricsWidgets}
        title="Global Metrics"
      />
      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
        <ExchangeRateChart />
      </div>
    </div>
  );
};

export default DashboardContent;
