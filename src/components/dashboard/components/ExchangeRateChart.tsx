import React from "react";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "../../../variables/charts";
import Card from "../../card";
import LineChart from "../../charts/LineChart";
import { FaChartLine } from "react-icons/fa6";

const ExchangeRateChart: React.FC = () => {
  return (
    <Card extra="!p-5 text-center">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2.5">
          <h3 className="self-start font-sans text-xl font-bold text-white">
            ReFi Token
          </h3>
          <div className="flex items-center gap-2.5 text-white">
            <FaChartLine className="h-4 w-4" />
            <span className="font-sans text-sm font-semibold text-white">
              1 REFI = 1 USD
            </span>
          </div>
        </div>
        {/* <div className="mb-6 flex items-center justify-center font-sans text-xs font-bold text-white">
          <select className="mb-3 mr-2 flex items-center justify-center rounded-md border-none bg-[#061A11] hover:cursor-pointer focus:border-none focus:bg-[#061A11] focus:text-white  focus:outline-none focus:ring-white">
            <option value="monthly" className="bg-[#061A11]  hover:bg-gray-700">
              Monthly
            </option>
            <option value="yearly" className="bg-[#061A11]  hover:bg-gray-700">
              Yearly
            </option>
            <option value="weekly" className="bg-[#061A11] hover:bg-gray-700">
              Weekly
            </option>
          </select>
        </div> */}
      </div>
      <div className="mt-10 flex h-full w-full sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="h-full w-full">
          {" "}
          {/* Контейнер для графика с шириной 100% */}
          <LineChart
            options={lineChartOptionsTotalSpent}
            series={lineChartDataTotalSpent}
          />
        </div>
      </div>
    </Card>
  );
};

export default ExchangeRateChart;
