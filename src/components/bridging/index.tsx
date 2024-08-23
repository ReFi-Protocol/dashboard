import { FC, useState } from "react";
import TransactionHistoryTable from "./components/TransactionHistoryTable";
import BridgeInfo from "./components/BridgeInfo";
import ConversionInfo from "./components/ConversionInfo";
import ConnectWalletModal from "../connect-wallet-modal";
import { useWallet } from "@solana/wallet-adapter-react";

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
  const wallet = useWallet();
  const [isModalOpen, setModalOpen] = useState(true);

  const handleSwap = () => {
    console.log("Swap tokens");
  };

  if (!wallet.publicKey) {
    return (
      <ConnectWalletModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    );
  }

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
