import { useState, FC } from "react";
import TabContent from "./components/TabContent";

const mockData = [
  { value: "250", name: "NFTs" },
  { value: "110%", name: "Maximum APY" },
  { value: "125000 $REFI", name: "Starting from" },
  { value: "0.56", name: "Floor price" },
  { value: "0.56", name: "Floor price" },
];

const tabOptions = ["NFT Collection", "About the project", "Highlights"];

const MarketplaceContent: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("NFT Collection");
  return (
    <div>
      <div
        className="relative flex items-center justify-start rounded-[30px] pl-6"
        style={{
          backgroundImage: "url(/images/forest-promo-image.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "292px",
        }}
      >
        <div
          className="absolute inset-0 rounded-[30px] bg-[#000000] opacity-40"
          style={{ zIndex: 1 }}
        ></div>
        <div
          className="relative flex flex-col gap-1 lg:max-w-[40%]"
          style={{ zIndex: 2 }}
        >
          <h3 className="font-sans text-[28px] text-lg font-extrabold text-white">
            Peyrat-de-Bellac Forest
          </h3>
          <p className="font-sans text-sm font-normal text-white">
            Discover the Peyrat-de-Bellac forest in central France, the work we
            do and the NFT collection you can buy of this Forest.
          </p>
        </div>
        <div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 transform"
          style={{
            width: "150px",
            height: "150px",
            backgroundImage: "url('./images/Logo-ET-vignette.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "11px solid black",
            borderRadius: "50%",
            zIndex: 2,
          }}
        ></div>
      </div>

      <div className="mb-20 mt-[106px] flex flex-col gap-4 px-16">
        <div className="flex justify-center rounded-[20px] bg-[#061A11]">
          <ul className="flex flex-col px-12 py-5 text-center text-white md:flex-row">
            {mockData.map((item, index) => (
              <li
                key={index}
                className="flex flex-col items-center md:flex-row"
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="font-sans text-xl font-bold lg:text-2xl">
                    {item.value}
                  </span>
                  <span className="font-sans text-xs font-medium lg:text-base">
                    {item.name}
                  </span>
                </div>
                {index < mockData.length - 1 && (
                  <div
                    className="my-2 border-b border-[#414141] md:mx-5 md:my-0 md:border-b-0 md:border-l lg:mx-10"
                    style={{
                      height: index < mockData.length - 1 ? "100%" : "0px",
                      width: "1px",
                      display: "block",
                    }}
                  ></div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <p className="px-1 text-center font-sans text-[15px] font-normal text-white md:px-11">
          The project commenced on May 20, 2019, and is certified by the
          Programme for the Endorsement of Forest Certification (PEFC). It
          encompasses a land area of 8.947 hectares and features significant
          biodiversity elements, including a wetland, ZNIEFF type II
          designation, forest ponds, and a stream. There are currently no social
          action initiatives associated with the project. Additionally, the area
          is open to the public from January 4 to January 9.
        </p>
      </div>
      <div>
        <div className="mb-11 flex flex-col justify-start gap-4 sm:flex-row">
          {tabOptions.map((tab) => (
            <button
              key={tab}
              className={`rounded-[50px] px-5 py-2.5 font-sans text-base font-semibold ${
                activeTab === tab
                  ? "text-black bg-white"
                  : "bg-[#061A11] text-white"
              } rounded-[50px]`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <TabContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceContent;
