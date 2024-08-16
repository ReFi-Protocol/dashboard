import { FC } from "react";
import TransactionHistoryTable from "./components/TransactionHistoryTable";
import BridgeInfo from "./components/BridgeInfo";
import ConversionInfo from "./components/ConversionInfo";

interface Transaction {
  date: string;
  refiEth: string;
  refiSol: string;
  gasFee: string;
}

const transactions: Transaction[] = [
  {
    date: "02/07/2024",
    refiEth: "6426.95 MATIC",
    refiSol: "Market Price",
    gasFee: "$0.40",
  },
  {
    date: "02/07/2024",
    refiEth: "6426.95 MATIC",
    refiSol: "Market Price",
    gasFee: "$0.40",
  },
  {
    date: "02/07/2024",
    refiEth: "6426.95 MATIC",
    refiSol: "Market Price",
    gasFee: "$0.40",
  },
  {
    date: "02/07/2024",
    refiEth: "6426.95 MATIC",
    refiSol: "Market Price",
    gasFee: "$0.40",
  },
];

const BridgingContent: FC = () => {
  const handleSwap = () => {
    console.log("Swapping tokens");
  };

  return (
    <div className="flex flex-col pt-5 text-white">
      <div className="flex flex-col gap-6 lg:flex-row">
        <BridgeInfo onSwap={handleSwap} />
        <ConversionInfo />
      </div>
      <TransactionHistoryTable transactions={transactions} />
    </div>
  );
};

export default BridgingContent;
