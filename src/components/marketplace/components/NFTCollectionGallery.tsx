import { FC, useEffect } from "react";
import NFTCard from "./NFTCard";
import { useCandyMachine, useUmi } from "../../../web3/solana/hook";
import { fetchCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { CANDY_MACHINE_ADDRESS } from "../../../web3/solana/const";
import { publicKey } from "@metaplex-foundation/umi";

const NFTCollectionGallery: FC = () => {
  const candyMachine = useCandyMachine();

  return candyMachine ? (
    <div className="">
      <h3 className="font-sans text-[22px] font-semibold text-white">
        NFT Collection
      </h3>
      <p className="font-sans text-base font-medium text-white">
        {candyMachine.items.length} unique NFTs part of this project
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {candyMachine.items.splice(0, 12).map((item) => (
          <NFTCard name={item.name} key={item.index} uri={item.uri} />
        ))}
      </div>
    </div>
  ) : (
    <div>loading...</div>
  );
};

export default NFTCollectionGallery;
