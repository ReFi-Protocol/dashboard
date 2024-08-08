import { FC } from "react";
import { publicKey } from "@metaplex-foundation/umi";
import { useUmi } from "../../../web3/solana/hook";
import { mintNftFromCandyMachine } from "../../../web3/solana/service/create-nft";
import { CANDY_MACHINE_ADDRESS } from "../../../web3/solana/const";
import { useWallet } from "@solana/wallet-adapter-react";

interface NFTCardProps {
  name: string;
  author: string;
  price: string;
}

const NFTCard: FC<NFTCardProps> = ({ name, author, price }) => {
  const umi = useUmi();
  const wallet = useWallet();

  const buyNft = async () => {
    const mint = await mintNftFromCandyMachine(
      umi,
      publicKey(CANDY_MACHINE_ADDRESS),
    );

    alert(mint.toString());
  };

  return (
    <div className="flex flex-col items-start rounded-[20px] bg-[#061A11] p-5">
      <div className="mb-5 h-[205px] w-full rounded-[18px] bg-[#000000]"></div>
      <div className="flex w-full flex-col gap-5 pl-2.5">
        <div>
          <h4 className="text-lg font-bold text-white">{name}</h4>
          <p className="text-sm font-normal text-[#A3D0C5]">By {author}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>
            <span className="text-sm font-normal text-white">Price</span>
            <span className="text-sm font-bold text-white"> - {price}</span>
          </p>
          {wallet.publicKey ? (
            <button
              onClick={buyNft}
              className="text-black rounded-full bg-[#07BA9A] px-10 py-[2px] font-bold hover:bg-white"
            >
              Rent
            </button>
          ) : (
            <button
              onClick={buyNft}
              className="text-black rounded-full bg-[#07BA9A] px-10 py-[2px] font-bold hover:bg-white"
            >
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
