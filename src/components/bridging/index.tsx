import { FC } from "react";
import { Input, InputRightElement, InputGroup } from "@chakra-ui/react";

const BridgingContent: FC = () => {
  return (
    <div className="grid grid-cols-2 pt-5 text-white">
      <div className="rounded-[20px] bg-[#061A11] p-[30px]">
        <div className="mb-8 flex flex-col gap-2.5">
          <h3 className="font-sans text-3xl font-medium text-white">Bridge</h3>
          <p className="font-sans text-sm font-medium text-white">
            Viridis Network offers a secured & unlimited transfer across chains
            for tokens & NFT
          </p>
        </div>
        <div className="mb-8 flex justify-between gap-5">
          <div className="flex flex-col items-center  text-center">
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
            <InputGroup className="relative flex flex-col">
              <Input
                borderRadius="10px"
                backgroundColor="transparent"
                padding="14px 20px 14px 25px"
                className="focus:border-white focus:ring-0"
                borderColor="#494949"
                textColor="white"
              />
              <InputRightElement className="absolute inset-y-0 pr-5">
                ETH
              </InputRightElement>
            </InputGroup>
            <img
              src={"./icons/swap-icon.svg"}
              alt="Transfer"
              className="my-2 h-8 w-8 self-center"
            />
            <InputGroup className="relative flex flex-col">
              <Input
                borderRadius="10px"
                backgroundColor="transparent"
                padding="14px 20px 14px 25px"
                borderColor="#494949"
                textColor="white"
                className="focus:border-white focus:ring-0"
              />
              <InputRightElement className="absolute inset-y-0 pr-5">
                <span className="text-white">SOLANA</span>
              </InputRightElement>
            </InputGroup>
          </div>
        </div>
        <button className="w-full rounded-[30px] bg-[#07BA9A] p-3 text-center text-base font-semibold text-[#000000]">
          Swap
        </button>
      </div>
    </div>
  );
};

export default BridgingContent;
