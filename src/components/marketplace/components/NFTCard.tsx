import { FC, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { NFTMetadata } from "../../../types";
import { fetchMetadata } from "../../../web3/solana/service/fetchMetadata";

interface NFTCardProps {
  uri: string;
  name: string;
  onClick: () => void;
}

const NFTCard: FC<NFTCardProps> = ({ uri, name, onClick }) => {
  const [metadata, setMetadata] = useState<NFTMetadata>();
  const wallet = useWallet();

  useEffect(() => {
    fetchMetadata(uri).then(setMetadata);
  }, []);

  return (
    <div className="flex flex-col items-start rounded-[20px] bg-[#061A11] p-5">
      <img
        src={metadata?.image}
        className="h-[242px mb-5 rounded-[18px] bg-[#000000]"
      />
      <div className="flex w-full flex-col gap-5 pl-2.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white">{name}</span>
          {wallet.publicKey ? (
            <button
              onClick={onClick}
              className="rounded-full bg-none px-10 py-[2px] font-bold text-white hover:bg-none hover:underline"
            >
              Learn more
            </button>
          ) : (
            <button className="text-black rounded-full bg-[#07BA9A] px-10 py-[2px] font-bold hover:bg-white">
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
