import { useWallet } from "@solana/wallet-adapter-react";
import { FC, useEffect, useState } from "react";
import { NFTMetadata } from "../../../types";
import { fetchMetadata } from "../../../web3/solana/service/fetchMetadata";

interface NFTCardProps {
  uri: string;
  name: string;
  onClick: () => void;
  label?: string;
  show?: boolean;
}

const NFTCard: FC<NFTCardProps> = ({ uri, name, onClick, show = false, label }) => {
  const [metadata, setMetadata] = useState<NFTMetadata>();
  const wallet = useWallet();

  const getLabelColor = () => {
    switch (label) {
      case 'Owned':
        return '#07BA9A';
      case 'Locked':
        return '#FF6347';
      case 'Collectible':
        return '#C0C0C0';
      default:
        return '#FFFFFF';
    }
  };

  useEffect(() => {
    fetchMetadata(uri).then(setMetadata);
  }, [uri]);

  return (
    <div className="flex flex-col items-start rounded-[20px] bg-[#061A11] p-5">
      <div className="relative">
        <img
          src={metadata?.image}
          className="mb-5 rounded-[18px] bg-[#000000]"
          alt={name}
        />

        {show && label && (
          <div
            className="absolute top-14 right-8 rounded-md w-fit px-2 py-1 text-white font-semibold text-xl"
            style={{ backgroundColor: getLabelColor(), color: '#000000' }}>
            {label}
          </div>
        )}
      </div>
      <div className="flex w-full flex-col gap-5 pl-2.5">
        <div className="flex flex-col  items-center justify-between gap-2 sm:flex-row">
          <h3 className=" min-w-1/2 text-lg font-bold text-white">{name}</h3>
          {wallet.publicKey ? (
            <button
              className="text-black rounded-full bg-[#07BA9A] px-10 py-[2px] font-bold hover:bg-white"
              onClick={onClick}
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
