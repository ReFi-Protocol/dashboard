import { FC } from "react";
import { HiX } from "react-icons/hi";
import Links from "./Links";
import routes from "../../routes";
import { ConnectKitButton } from "connectkit";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ open, onClose }) => {
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
      <div className="flex flex-col gap-10 px-4 pt-8">
        <div className="flex items-center justify-start gap-2">
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
            <Links routes={routes} />
          </ul>
          <ConnectKitButton.Custom>
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
                  {isConnected ? address : "Connect Wallet"}
                </button>
              );
            }}
          </ConnectKitButton.Custom>
          {/* <UnifiedWalletButton /> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
