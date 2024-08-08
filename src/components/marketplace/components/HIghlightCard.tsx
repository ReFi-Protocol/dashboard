import { FC } from "react";

interface HighLightCardProps {
  description: string;
  imageUrl: string;
}

const HighlightCard: FC<HighLightCardProps> = ({ description, imageUrl }) => {
  return (
    <div className="flex h-full flex-col rounded-[20px] bg-[#061A11] p-[18px]">
      <div
        className="mb-2.5 h-[205px] w-full rounded-[18px] bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="flex flex-grow flex-col">
        <p className="mb-4 w-full text-sm font-normal text-white">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HighlightCard;
