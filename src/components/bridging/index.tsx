import { FC, useCallback, useEffect, useState } from "react";
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
import { Modal, ModalContent, ModalOverlay, Spinner } from "@chakra-ui/react";
import debounce from "lodash/debounce";
import { BridgeSupportedChain } from "../../web3/bridge/type";
import { getAllowance } from "../../web3/evm/config";
import { WORMHOLE_ADDRESS } from "../../web3/evm/const";
import { d } from "../../web3/util/d";

const BridgingContent: FC = () => {
  const walletContext = useWallet();
  const anchorWallet = useAnchorWallet();
  const { address } = useAccount();
  const [isModalOpen, setModalOpen] = useState(true);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAllowance, setHasAllowance] = useState(true);

  const [value, setValue] = useState(1);

  const debouncedSetValue = useCallback(
    debounce(async (value: number, sourceChain: BridgeSupportedChain) => {
      setValue(value);
      if (sourceChain === "Solana" || !address) {
        setHasAllowance(true);
      } else {
        const dAllowance = await getAllowance(address, WORMHOLE_ADDRESS);
        const allowance = d(Number(dAllowance), 18);

        setHasAllowance(allowance >= value);
      }
    }, 1000),
    [],
  );

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

  const handleRedeem = async (operation: Operation) => {
    if (anchorWallet && address && walletContext.wallet) {
      try {
        setIsLoading(true);
        await redeem(
          operation.txHash,
          anchorWallet,
          walletContext.wallet,
          operation.sourceChain as any,
          address,
          operation,
        );
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSwap = async (
    value: number,
    sourceChain: "Ethereum" | "Solana",
  ) => {
    if (anchorWallet && address && walletContext.wallet) {
      try {
        setIsLoading(true);
        if (sourceChain === "Ethereum") {
          await tokenBridge(
            value,
            anchorWallet,
            walletContext.wallet,
            address,
            getBridgeConnection(),
          );
        } else {
          await tokenBridgeReverse(
            value,
            anchorWallet,
            walletContext.wallet,
            address,
            getBridgeConnection(),
          );
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
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
      <Modal onClose={() => {}} isOpen={isLoading} isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent className="items-center justify-center !bg-[transparent] px-7">
          <Spinner color="white" className="h-10 w-10" />
        </ModalContent>
      </Modal>

      <div className="flex flex-col gap-6 lg:flex-row">
        <BridgeInfo
          hasAllowance={hasAllowance}
          onSwap={handleSwap}
          onChange={debouncedSetValue}
        />
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
