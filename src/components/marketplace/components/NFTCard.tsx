import { FC } from "react";

interface NFTCardProps {
  name: string;
  author: string;
  price: string;
}

const NFTCard: FC<NFTCardProps> = ({ name, author, price }) => {
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
          <button className="text-black rounded-full bg-[#07BA9A] px-10 py-[2px] font-bold hover:bg-white">
            Rent
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
