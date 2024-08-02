// import { ConnectKitButton } from "connectkit";
// import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";

export default function MarketplaceLayout() {
  return (
    <div className="flex h-full min-h-[100vh] w-full gap-6 bg-black px-10 pt-5">
      <div className=" w-[225px] rounded-[20px] bg-[#061A11]">
        <div className="flex flex-col gap-10 px-4 pt-8">
          <div>
            <span className="font-sans text-base font-normal text-white">
              Refi Protocol
            </span>
          </div>
          <div>
            <button className="w-48 rounded-3xl bg-[#25AC88] py-2 text-xs font-medium">
              Connect Wallet
            </button>
            {/* <ConnectKitButton /> */}
            {/* <UnifiedWalletButton /> */}
          </div>
        </div>
      </div>
      {/* Navbar & Main Content */}
      <div className="w-full pt-4 ">
        {/* Main Content */}
        <main className={`flex-nonetransition-all mx-[12px]  h-full md:pr-2`}>
          <div>
            <p className="font-sans text-3xl font-medium text-white">
              MarketPlace
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
