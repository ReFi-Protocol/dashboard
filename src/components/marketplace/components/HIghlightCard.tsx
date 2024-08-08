import { FC } from "react";

interface HighLightCardProps {
  description: string;
}

const HighlightCard: FC<HighLightCardProps> = ({ description }) => {
  return (
    <div className="flex flex-col items-start rounded-[20px] bg-[#061A11] p-[18px]">
      <div className="mb-2.5 h-[205px] w-full rounded-[18px] bg-[#000000]"></div>
      <p className="mb-10 w-full text-sm font-normal text-white">
        {description}
      </p>
    </div>
  );
};

export default HighlightCard;
