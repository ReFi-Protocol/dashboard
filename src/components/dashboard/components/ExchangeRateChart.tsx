import React from "react";
import Card from "../../card";
import LineChart from "../../charts/LineChart";
import { FaChartLine } from "react-icons/fa6";
import { createLineChartConfig } from "../../../service";
import { format } from "date-fns";

type ExchangeRateChartProps = {
  prices: [number, number][];
  currentPrice: number;
};

const ExchangeRateChart: React.FC<ExchangeRateChartProps> = ({
  prices,
  currentPrice,
}) => {
  const { series, options } = createLineChartConfig(
    prices.map((price) => price[1]),
    prices.map((price) => format(price[0], "MMM dd")),
    {
      name: "Exchange rate",
    },
  );

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
              {`1 ReFi = ${currentPrice} USD`}
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
          <LineChart options={options} series={series} />
        </div>
      </div>
    </Card>
  );
};

export default ExchangeRateChart;
