import { FC } from "react";

const StakingPromoBanner: FC = () => (
  <div
    className="flex h-[137px] max-h-fit w-full items-center rounded-[15px] border border-[#333333] bg-contain bg-left bg-no-repeat"
    style={{ backgroundImage: `url('./images/staking-promo-image.png')` }}
  >
    <div className="ml-4 mr-4 md:ml-52">
      <p className="font-sans text-base text-white">
        Harness the benefits of compounding by staking your tokens and
        reinvesting the rewards as they accumulate.
      </p>
    </div>
  </div>
);

export default StakingPromoBanner;
