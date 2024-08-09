import { FC } from "react";
import { MdBarChart, MdLock } from "react-icons/md";
import Widget from "../../components/widget";
import { FaMoneyBills } from "react-icons/fa6";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";
import { TbShieldLockFilled } from "react-icons/tb";

const StakingContent: FC = () => {
  return (
    <div className="flex flex-col gap-12 text-white">
      <div
        className="flex h-[137px] max-h-fit w-full items-center rounded-[15px] border border-[#333333] bg-contain bg-left bg-no-repeat"
        style={{ backgroundImage: `url('./images/staking-promo-image.png')` }}
      >
        <div className=" ml-4 mr-4 md:ml-52">
          <p className="font-sans text-base text-white">
            Harness the benefits of compounding by staking your tokens and
            reinvesting the rewards as they accumulate.
          </p>
        </div>
      </div>
      <div>
        <h3 className="mb-4 font-sans text-xl font-semibold text-white">
          Global Metrics
        </h3>
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 3xl:grid-cols-4">
          <Widget
            icon={<MdBarChart className="h-7 w-7" />}
            title={"Total Supply Locked"}
            subtitle={"50%"}
          />
          <Widget
            icon={<MdLock className="h-6 w-6" />}
            title={"Fully Diluted Valuation"}
            subtitle={"$3,232,234"}
          />
          <Widget
            icon={<FaMoneyBills className="h-7 w-7" />}
            title={"USD Price"}
            subtitle={"$0.002"}
          />
          <Widget
            icon={<TbShieldLockFilled className="h-7 w-7" />}
            title={"Total Value Locked"}
            subtitle={"$REFI 200"}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-sans text-xl font-semibold text-white">
          User Metrics
        </h3>
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 3xl:grid-cols-4">
          <Widget
            icon={<MdBarChart className="h-7 w-7" />}
            title={"Total Owned"}
            subtitle={"350.4 $REFI"}
          />
          <Widget
            icon={<MdLock className="h-6 w-6" />}
            title={"Locked in Staking"}
            subtitle={"1130 $REFI"}
          />
          <Widget
            icon={<FaMoneyBills className="h-7 w-7" />}
            title={"Expected Rewards"}
            subtitle={"540 $REFI"}
          />
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-2.5">
          <h3 className="font-sans text-xl font-semibold text-white">
            Staking Pools
          </h3>
          <UnifiedWalletButton buttonClassName="wallet-button" />
        </div>
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 3xl:grid-cols-4"></div>
      </div>

      <div>
        <h3 className="mb-4 font-sans text-xl font-semibold text-white">
          My Stakes & Rewards
        </h3>
      </div>
    </div>
  );
};

export default StakingContent;
