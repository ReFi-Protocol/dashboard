import { FC } from "react";

interface MarketplaceBannerProps {
  title: string;
  description: string;
  logoSrc: string;
  bannerImage: string;
}

const MarketplaceBanner: FC<MarketplaceBannerProps> = ({
  title,
  description,
  logoSrc,
  bannerImage,
}) => {
  return (
    <div
      className="relative flex items-center justify-start rounded-[30px] pl-6"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "292px",
      }}
    >
      <div className="relative flex flex-col gap-1 lg:max-w-[40%]">
        <h3 className="font-sans text-[28px] text-lg font-extrabold text-white">
          {title}
        </h3>
        <p className="font-sans text-sm font-normal text-white">
          {description}
        </p>
      </div>
      <div
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 transform"
        style={{
          width: "150px",
          height: "150px",
          backgroundImage: `url(${logoSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "11px solid black",
          borderRadius: "50%",
        }}
      ></div>
    </div>
  );
};

export default MarketplaceBanner;
