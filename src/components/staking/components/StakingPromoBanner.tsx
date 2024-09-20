import { FC, useEffect, useState } from "react";
import { getStakedNfts } from "../../../web3/solana/service/getStakedNfts";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { Stake } from "../../../web3/solana/staking/types";
import { useStakes, useUmi } from "../../../web3/solana/hook";
import { getMyStakes } from "../../../web3/solana/staking/service/getMyStakes";

const StakingPromoBanner: FC = () => {

  const [stakes, setStakes] = useState<Stake[]>([]);
  const [isRestakeMessage, setRestakeMessage] = useState(false);

  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const umi = useUmi(wallet);

  useEffect(() => {
    const loadStakes = async () => {
      if (!anchorWallet || !umi || !wallet.connected) {
        setStakes([]);
        return;
      }

      try {
        const [fetchedStakes] = await Promise.all([
          getMyStakes(anchorWallet),
        ]);
        console.log("FETCHED STAKES: " + fetchedStakes)
        setStakes(fetchedStakes);
      } catch (error) {
        console.error("Error fetching stakes or NFTs:", error);
      }
    };

    loadStakes();
  }, [anchorWallet, umi, wallet.connected]);

  useEffect(() => {
    if (stakes.filter(stake => stake.nft != null).length > 0) {
      setRestakeMessage(true);
    }
  }, [stakes]);

  return (
    <div
      className="flex h-[137px] max-h-fit w-full items-center rounded-[15px] border border-[#333333] bg-contain bg-left bg-no-repeat"
      style={{ backgroundImage: `url('./images/staking-promo-image.png')` }}
    >
      <div className="ml-4 mr-4 md:ml-52">
        <p className="font-sans text-base text-white">
          {isRestakeMessage ? "You can get more $REFI upfront if you restake all your stakes now!"  : "Harness the benefits of compounding by staking your tokens and reinvesting the rewards as they accumulate."}
        </p>
      </div>
    </div>
  );
};

export default StakingPromoBanner;
