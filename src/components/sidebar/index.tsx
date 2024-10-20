import { FC, useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import routes from "../../routes";
import Links from "./Links";
// import { ConnectKitButton } from "connectkit";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { getTotalReFi } from "../../web3/solana/staking/service/getTotalReFi";
import { d } from "../../web3/util/d";
import ZeroRefiTokensPopUpModal from "../dashboard/components/ZeroReFiTokensPopUpModal";
import { ProgramConfig } from "../../web3/solana/staking/types";
import { getConfig } from "../../web3/solana/staking/service/getConfig";
interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ open, onClose }) => {
  const anchorWallet = useAnchorWallet();
  const { connected } = useWallet();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasWalletConnected, setHasWalletConnected] = useState(false);
  const [totalHumanReFi, setTotalHumanReFi] = useState<number | null>(null);
  const [config, setConfig] = useState<ProgramConfig | null>(null);

  useEffect(() => {
    if (anchorWallet) {
      getTotalReFi(anchorWallet.publicKey).then((value) => {
        setTotalHumanReFi(Math.trunc(d(value)));
      });

      getConfig(anchorWallet).then(setConfig)
    }
  }, [anchorWallet]);

  useEffect(() => {
    if (connected && !hasWalletConnected) {
      setHasWalletConnected(true);
      setIsModalVisible(true);
    }
  }, [connected, hasWalletConnected]);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full w-[225px] flex-col rounded-[20px]  bg-[#061A11] pb-10 shadow-2xl shadow-white/5 transition-all  md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX className="text-white " />
      </span>
      <div className="flex flex-col px-4 pt-8">
        <div className="flex items-center justify-center gap-2 pb-11">
          <img
            src="./images/Refi_logo.png"
            alt="Refi Protocol Logo"
            className="h-8 w-8"
          />
          <span className="font-sans text-base font-normal text-white">
            Refi Protocol
          </span>
        </div>
        <div>
          <ul className="mb-auto pt-1">
            <Links routes={routes.filter((route) =>{
      return !route.isAdmin || config && anchorWallet && config.admin.equals(anchorWallet?.publicKey)
    })} />
          </ul>
          {/* <ConnectKitButton.Custom>
            {({
              isConnected,
              isConnecting,
              show,
              hide,
              address,
              ensName,
              chain,
            }) => {
              return (
                <button
                  onClick={show}
                  className="w-48 rounded-3xl bg-[#25AC88] py-2 text-xs font-medium text-white"
                >
                  {isConnected ? address : "Connect SOL Wallet"}
                </button>
              );
            }}
          </ConnectKitButton.Custom> */}
        </div>
        <div className="flex justify-center pt-5">
          <UnifiedWalletButton
            buttonClassName="wallet-button"
            overrideContent="Connect SOL WALLET"
          />
        </div>
      </div>
      {/* {isModalVisible &&  totalHumanReFi != null && (
        <ZeroRefiTokensPopUpModal
          isOpen={isModalVisible}
          onClose={handleModalClose}
          zeroRefiTokens={totalHumanReFi === 0}
        />
      )} */}
    </div>
  );
};

export default Sidebar;
