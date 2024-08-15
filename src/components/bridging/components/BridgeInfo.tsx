import { FC } from "react";
import { Input, Button } from "@chakra-ui/react";

interface BridgeInfoProps {
  onSwap: () => void;
}

const BridgeInfo: FC<BridgeInfoProps> = ({ onSwap }) => (
  <div className="2xl:max-w-3/4 flex flex-1">
    <div className="h-fit w-full rounded-[20px] bg-[#061A11] p-[30px]">
      <div className="mb-8 flex flex-col gap-2.5">
        <h3 className="font-sans text-3xl font-medium text-white">Bridge</h3>
        <p className="font-sans text-sm font-medium text-white">
          ReFi Protocol offers a secured & unlimited transfer across chains for
          tokens & NFT
        </p>
      </div>
      <div className="mb-8 flex flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <img src={"./icons/eth.svg"} alt="Ethereum" className="h-6 w-6" />
            <p className="text-[10px] font-medium">Ethereum</p>
          </div>
          <div className="my-2 h-12 border-l border-dashed border-white"></div>
          <div className="flex flex-col items-center">
            <img src={"./icons/sol.svg"} alt="Solana" className="h-6 w-6" />
            <p className="text-[10px] font-medium">Solana</p>
          </div>
        </div>
        <div className="flex flex-grow flex-col">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <Input
              borderRadius="10px"
              backgroundColor="transparent"
              padding="14px 20px 14px 25px"
              className="w-full flex-grow focus:border-white focus:ring-0"
              borderColor="#494949"
              textColor="white"
            />
            <Button
              variant="ghost"
              className="inset-y-0 min-w-fit flex-grow pl-2.5 pr-2.5 text-[14px] font-semibold text-[#25AC88] lg:mr-12"
            >
              Connect ETH wallet
            </Button>
          </div>
          <img
            src={"./icons/swap-icon.svg"}
            alt="Transfer"
            className="my-2 h-8 w-8 self-center"
          />
          <div className="flex flex-col items-center justify-between md:flex-row">
            <Input
              borderRadius="10px"
              backgroundColor="transparent"
              padding="14px 20px 14px 25px"
              borderColor="#494949"
              textColor="white"
              className="w-full flex-grow focus:border-white focus:ring-0"
            />
            <Button
              variant="ghost"
              className="inset-y-0 min-w-fit flex-grow pl-2.5 pr-2.5 text-[14px] font-semibold text-[#25AC88] lg:mr-12"
            >
              Connect SOL wallet
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="brand"
        onClick={onSwap}
        className="w-full rounded-[30px] bg-[#07BA9A] p-3 text-center text-base font-semibold text-[#000000]"
      >
        Swap
      </Button>
    </div>
  </div>
);

export default BridgeInfo;