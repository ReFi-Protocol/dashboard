import { FC, useState } from "react";
import StakingPoolCard from "./StakingPoolCard";
import { StakingPoolData } from "../../../types";
import StakingPoolOptionsModal from "./StakingPoolOptionsModal";

interface StakingPoolsProps {
  stakingPoolData: StakingPoolData[];
  selectedPoolIndex: number | null;
  onSelectPool: (index: number) => void;
  userHasNfts: boolean;
}

const StakingPools: FC<StakingPoolsProps> = ({
  stakingPoolData,
  selectedPoolIndex,
  onSelectPool,
  userHasNfts,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
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
            onStakeClick={() => {
              onSelectPool(index);
              if (userHasNfts || index === 3) {
                openModal();
              }
            }}
            userHasNfts={userHasNfts}
          />
        ))}
      </div>
      <StakingPoolOptionsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        stakingPoolData={stakingPoolData}
        selectedPoolIndex={selectedPoolIndex}
        onSelectPool={onSelectPool}
      />
    </div>
  )
};

export default StakingPools;
