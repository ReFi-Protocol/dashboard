import { FC } from "react";

interface HighLightCardProps {
  description: string;
  imageUrl: string;
  link: string;
}

const HighlightCard: FC<HighLightCardProps> = ({
  description,
  imageUrl,
  link,
}) => {
  return (
    <div className="flex h-full flex-col rounded-[20px] bg-[#061A11] p-[18px]">
      <div
        className="mb-2.5 h-[205px] w-full rounded-[18px] bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="flex flex-grow flex-col">
        <p className="mb-4 line-clamp-5 w-full text-sm font-normal text-white">
          {description}
        </p>
        {/* Spacer to push the button to the bottom */}
        <div className="flex-grow"></div>
        <button className="max-w-fit rounded-full bg-[#07BA9A] px-10 py-[2px] font-bold text-[#000000] hover:bg-white">
          <a href={link} target="_blank" rel="noopener noreferrer">
            Learn more
          </a>
        </button>
      </div>
    </div>
  );
};

export default HighlightCard;
