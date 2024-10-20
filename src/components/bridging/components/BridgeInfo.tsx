import { FC, useEffect, useState } from "react";
import {
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";
import { useAccount } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import { BridgeSupportedChain } from "../../../web3/bridge/type";

interface Chain {
  name: string;
  icon: string;
}

interface BridgeInfoProps {
  onSwap: (value: number, sourceChain: BridgeSupportedChain) => void;
  onChange: (value: number, sourceChain: BridgeSupportedChain) => void;
  hasAllowance: boolean;
}

const chains: [Chain, Chain] = [
  { name: "Ethereum", icon: "./icons/eth.svg" },
  { name: "Solana", icon: "./icons/sol.svg" },
];

const BridgeInfo: FC<BridgeInfoProps> = ({
  onSwap,
  onChange,
  hasAllowance,
}) => {
  const [isSwapped, setIsSwapped] = useState(false);
  const ethAccount = useAccount();
  const walletContext = useWallet();
  const canSwap = ethAccount.address && walletContext.connected;

  const [value, setValue] = useState(1);

  const handleSwap = () => {
    onChange(value, isSwapped ? "Ethereum" : "Solana");
    return setIsSwapped(!isSwapped);
  };

  const onSwapClick = () => {
    onSwap(value, isSwapped ? "Solana" : "Ethereum");
  };

  const renderChainBlock = (chain: Chain, walletComponent: JSX.Element) => (
    <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
      <NumberInput
        onChange={(valueString) => {
          const normalizedValue = Number(valueString);

          setValue(normalizedValue);
          onChange(normalizedValue, isSwapped ? "Solana" : "Ethereum");
        }}
        className="min-h-11 w-full !rounded-[12px] !border-[1px] !border-[#494949] !py-3 !pl-4 text-white"
        max={5_000_000}
        min={1}
        step={1}
        value={value}
        precision={0}
      >
        <NumberInputField className="!focus:ring-0 !active:ring-0 !focus:border-none !focus:outline-none !active:border-none !active:outline-none !border-none !p-0 text-white !outline-none !ring-0" />
        <NumberInputStepper />
      </NumberInput>
      {walletComponent}
    </div>
  );

  const ethWalletButton = (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress }) => (
        <button
          onClick={show}
          className={`${isConnected ? "text-[#ffffff]" : "text-[#000000]"} w-48 rounded-3xl bg-[#25AC88] py-2 text-xs font-medium`}
        >
          {isConnected ? truncatedAddress : "Connect ETH Wallet"}
        </button>
      )}
    </ConnectKitButton.Custom>
  );

  const solWalletButton = (
    <UnifiedWalletButton
      buttonClassName="wallet-button"
      overrideContent="Connect SOL Wallet"
    />
  );

  return (
    <div className="2xl:max-w-3/4 flex flex-1">
      <div className="h-fit w-full rounded-[20px] bg-[#061A11] p-[30px]">
        <div className="mb-8 flex flex-col gap-2.5">
          <h3 className="font-sans text-3xl font-medium text-white">Bridge</h3>
          <p className="font-sans text-sm font-medium text-white">
            ReFi Protocol offers a secured & unlimited transfers across chains
            for tokens for free! Please refresh page after swapping to update the table below!
          </p>
        </div>
        <div className="mb-8 flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex flex-col items-center text-center">
            {chains.map((chain, index) => (
              <div key={index}>
                <div className="flex flex-col items-center">
                  <img
                    src={isSwapped ? chains[1 - index].icon : chain.icon}
                    alt={isSwapped ? chains[1 - index].name : chain.name}
                    className="h-6 w-6"
                  />
                  <p className="text-[10px] font-medium">
                    {isSwapped ? chains[1 - index].name : chain.name}
                  </p>
                  {index === 0 && (
                    <div className="my-2 h-12 border-l border-dashed border-white"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-grow flex-col">
            {renderChainBlock(
              isSwapped ? chains[1] : chains[0],
              isSwapped ? solWalletButton : ethWalletButton,
            )}
            <img
              src={"./icons/swap-icon.svg"}
              alt="Transfer"
              className="my-2 h-8 w-8 cursor-pointer self-center"
              onClick={handleSwap}
            />
            {renderChainBlock(
              isSwapped ? chains[0] : chains[1],
              isSwapped ? ethWalletButton : solWalletButton,
            )}
          </div>
        </div>
        <Button
          variant="brand"
          onClick={onSwapClick}
          borderRadius={"30px"}
          disabled={!canSwap}
          className="w-full rounded-[30px] bg-[#07BA9A] p-3 text-center text-base font-semibold text-[#000000]"
        >
          {hasAllowance ? "Swap" : "Increase allowance"}
        </Button>
      </div>
    </div>
  );
};

export default BridgeInfo;
