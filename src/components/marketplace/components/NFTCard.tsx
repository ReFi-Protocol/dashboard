import { FC, useEffect, useState } from "react";
import { useUmi } from "../../../web3/solana/hook";
import { mintNftFromCandyMachine } from "../../../web3/solana/service/create-nft";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { useWallet } from "@solana/wallet-adapter-react";
import { Umi } from "@metaplex-foundation/umi";
import { NFTMetadata } from "../../../types";

interface NFTCardProps {
  uri: string;
  name: string;
}

const NFTCard: FC<NFTCardProps> = ({ uri, name }) => {
  const wallet = useWallet();
  const umi = useUmi(wallet);
  const [metadata, setMetadata] = useState<NFTMetadata>();

  useEffect(() => {
    fetch(uri).then((response) => {
      response.json().then((json) => {
        setMetadata(json);
      });
    });
  }, []);

  const buyNft = async (umi: Umi) => {
    const mint = await mintNftFromCandyMachine(umi);

    alert(mint.toString());
  };

  return (
    <div className="flex flex-col items-start rounded-[20px] bg-[#061A11] p-5">
      <img
        src={metadata?.image}
        className="h-[242px mb-5 rounded-[18px] bg-[#000000]"
      />
      <div className="flex w-full flex-col gap-5 pl-2.5">
        <div>
          <h4 className="text-lg font-bold text-white">{name}</h4>
        </div>
        <div className="flex items-center justify-between">
          <p>
            <span className="text-sm font-normal text-white">Price</span>
            <span className="text-sm font-bold text-white">
              - {"125000 $REFI"}
            </span>
          </p>
          {wallet.publicKey && umi ? (
            <button
              onClick={() => buyNft(umi)}
              className="text-black rounded-full bg-[#07BA9A] px-10 py-[2px] font-bold hover:bg-white"
            >
              Buy
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
