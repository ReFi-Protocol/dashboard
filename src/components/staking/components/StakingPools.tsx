import { FC } from "react";
import StakingPoolCard from "./StakingPoolCard";
import { StakingPoolData } from "../../../types";

interface StakingPoolsProps {
  stakingPoolData: StakingPoolData[];
  selectedPoolIndex: number | null;
  onSelectPool: (index: number) => void;
}

const StakingPools: FC<StakingPoolsProps> = ({
  stakingPoolData,
  selectedPoolIndex,
  onSelectPool,
}) => (
  <div>
    <div className="mb-4 flex items-center">
      <h3 className="font-sans text-xl font-semibold text-white">
        Staking Pools
      </h3>
    </div>
    <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 3xl:grid-cols-4">
      {stakingPoolData.map((pool, index) => (
        <StakingPoolCard
          key={index}
          duration={pool.duration}
          maxStake={pool.maxStake}
          apy={pool.apy}
          isSelected={selectedPoolIndex === index}
          onSelect={() => onSelectPool(index)}
          selectedPoolIndex={selectedPoolIndex}
          stakingPoolData={stakingPoolData}
        />
      ))}
    </div>
  </div>
);

export default StakingPools;
