import { FC, useEffect, useState } from "react";
import TransactionHistoryTable from "./components/TransactionHistoryTable";
import BridgeInfo from "./components/BridgeInfo";
import ConversionInfo from "./components/ConversionInfo";
import ConnectWalletModal from "../connect-wallet-modal";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { getOperations } from "../../web3/bridge/wormhole-scan";
import { tokenBridge } from "../../web3/bridge/token-bridge";
import { useAccount } from "wagmi";
import { getBridgeConnection } from "../../web3/bridge/config";
import { tokenBridgeReverse } from "../../web3/bridge/token-bridge-reverse";
import { Operation } from "../../web3/bridge/types";
import { redeem } from "../../web3/bridge/redeem";

const BridgingContent: FC = () => {
  const walletContext = useWallet();
  const anchorWallet = useAnchorWallet();
  const { address } = useAccount();
  const [isModalOpen, setModalOpen] = useState(true);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (walletContext.publicKey && address) {
      Promise.all([
        getOperations(address),
        getOperations(walletContext.publicKey.toString()),
      ]).then(([res1, res2]) => {
        const mergedOperations = [...res1, ...res2];

        const uniqueOperations = mergedOperations.reduce<Operation[]>(
          (acc, current) => {
            const x = acc.find((item) => item.txHash === current.txHash);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          },
          [],
        );

        setOperations(uniqueOperations);
      });
    }
  }, [walletContext.publicKey, address]);

  const handleRedeem = (operation: Operation) => {
    if (anchorWallet && address && walletContext.wallet) {
      redeem(
        operation.txHash,
        anchorWallet,
        walletContext.wallet,
        operation.sourceChain as any,
        address,
        operation,
      );
    }
  };

  const handleSwap = (value: number, sourceChain: "Ethereum" | "Solana") => {
    if (anchorWallet && address && walletContext.wallet) {
      if (sourceChain === "Ethereum") {
        tokenBridge(
          value,
          anchorWallet,
          walletContext.wallet,
          address,
          getBridgeConnection(),
        );
      } else {
        tokenBridgeReverse(
          value,
          anchorWallet,
          walletContext.wallet,
          address,
          getBridgeConnection(),
        );
      }
    }
  };

  if (!walletContext.publicKey) {
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
        <BridgeInfo onSwap={handleSwap} onChange={setValue} />
        <ConversionInfo value={value} />
      </div>
      <TransactionHistoryTable
        operations={operations}
        onRedeemClick={handleRedeem}
      />
    </div>
  );
};

export default BridgingContent;
