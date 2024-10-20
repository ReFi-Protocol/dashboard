import { FC } from "react";

type ConversionInfoProps = {
  value: number;
};

const ConversionInfo: FC<ConversionInfoProps> = ({ value }) => (
  <div className="2xl:max-w-1/4 flex flex-1">
    <div className="h-fit w-full rounded-[20px] bg-[#061A11] p-[15px]">
      <div className="flex flex-col">
        <p>Conversion</p>
        <div className="my-3 w-full border-b border-solid border-[#3C3B3B]"></div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-10 text-nowrap">
            <span>$REFI (ETH)</span>
            <span>{value}</span>
          </div>
          <div className="flex justify-between">
            <span>$REFI (SOL)</span>
            <span>{value}</span>
          </div>
          <div className="flex justify-between">
            <span>Fee</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ConversionInfo;
