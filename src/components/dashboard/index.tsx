import { FC } from "react";
import { MdBarChart, MdLock } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import Widget from "../../components/widget";
import { FaMoneyBills } from "react-icons/fa6";
import ExchangeRateChart from "./components/ExchangeRateChart";

const DashboardContent: FC = () => {
  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 3xl:grid-cols-4">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Owned"}
          subtitle={"350.4 $REFI"}
        />
        <Widget
          icon={<MdLock className="h-6 w-6" />}
          title={"Locked in Staking"}
          subtitle={"1130 $REFI"}
        />
        <Widget
          icon={<FaMoneyBills className="h-7 w-7" />}
          title={"Expected Rewards"}
          subtitle={"540 $REFI"}
        />
        <Widget
          icon={<IoLocationSharp className="h-6 w-6" />}
          title={"Owned/Staked pCRBN"}
          subtitle={"20 pCRBN"}
        />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
        <ExchangeRateChart />
      </div>
    </div>
  );
};

export default DashboardContent;
