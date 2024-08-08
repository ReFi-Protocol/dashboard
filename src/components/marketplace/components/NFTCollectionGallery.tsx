import { FC } from "react";
import NFTCard from "./NFTCard";

const mockNFTs = [
  { name: "Swipe Circles", author: "Peter Will", price: "125000 $REFI" },
  { name: "Swipe Circles", author: "Peter Will", price: "125000 $REFI" },
  { name: "Swipe Circles", author: "Peter Will", price: "125000 $REFI" },
  { name: "Swipe Circles", author: "Peter Will", price: "125000 $REFI" },
  { name: "Swipe Circles", author: "Peter Will", price: "125000 $REFI" },
  { name: "Swipe Circles", author: "Peter Will", price: "125000 $REFI" },
];

const NFTCollectionGallery: FC = () => {
  return (
    <div className="">
      <h3 className="font-sans text-[22px] font-semibold text-white">
        NFT Collection
      </h3>
      <p className="font-sans text-base font-medium text-white">
        250 unique NFTs part of this project
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockNFTs.map((nft, index) => (
          <NFTCard
            key={index}
            name={nft.name}
            author={nft.author}
            price={nft.price}
          />
        ))}
      </div>
    </div>
  );
};

export default NFTCollectionGallery;
