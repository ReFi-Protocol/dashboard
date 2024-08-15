import { FC, useState } from "react";
import {
  LockIcon,
  GraphIcon,
  MoneyIcon,
  ShieldILockIcon,
  ConfettiIcon,
  SumIcon,
} from "../icons";

import StakesAndRewardsTable from "./components/StakesAndRewardsTable";

import { WidgetData, StakingPoolData } from "../../types";
import StakingPromoBanner from "./components/StakingPromoBanner";
import MetricsSection from "../MetricSection";
import StakingPools from "./components/StakingPools";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { getProgram } from "../../web3/solana/staking";
import {
  getStakeInfo,
  getStakeInfoAddress,
} from "../../web3/solana/staking/util";
import { Wallet } from "../../web3/solana/staking/types";
import { NFT_APY, SPL_MINT_PK } from "../../web3/solana/const";
import { getInitializeStakeInfoIx } from "../../web3/solana/staking/instruction/initializeStakeInfo";
import { getLockNftIx } from "../../web3/solana/staking/instruction/lockNft";
import { getStakeIx } from "../../web3/solana/staking/instruction/stake";
import { getConnection } from "../../web3/solana/connection";
import { d } from "../../web3/solana/service/d";
import {
  Connection,
  PublicKey,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { useUmi } from "../../web3/solana/hook";
import { Umi } from "@metaplex-foundation/umi";
import { getReFiNfts } from "../../web3/solana/service/getReFiNfts";

const globalMetricsWidgets: WidgetData[] = [
  {
    icon: <LockIcon width={28} height={28} fill="white" />,
    title: "Total Supply Locked",
    subtitle: "50%",
  },
  {
    icon: <GraphIcon width={28} height={28} fill="white" />,
    title: "Fully Diluted Valuation",
    subtitle: "$3,232,234",
  },
  {
    icon: <MoneyIcon width={28} height={28} fill="white" />,
    title: "USD Price",
    subtitle: "$0.002",
  },
  {
    icon: <ShieldILockIcon width={28} height={28} fill="white" />,
    title: "Total Value Locked",
    subtitle: "$REFI 200",
  },
];

const userMetricsWidgets: WidgetData[] = [
  {
    icon: <SumIcon width={28} height={28} fill="white" />,
    title: "Total Owned",
    subtitle: "350.4 $REFI",
  },
  {
    icon: <LockIcon width={28} height={28} fill="white" />,
    title: "Locked in Staking",
    subtitle: "1130 $REFI",
  },
  {
    icon: <ConfettiIcon width={28} height={28} fill="white" />,
    title: "Expected Rewards",
    subtitle: "540 $REFI",
  },
];

const stakingPoolData: StakingPoolData[] = [
  {
    duration: "30 Days",
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "35%",
  },
  {
    duration: "60 Days",
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "65%",
  },
  {
    duration: "90 Days",
    maxStake: "Maximum $REFI staked per wallet 750,000 $REFI.",
    apy: "110%",
  },
  {
    duration: "No lock-in period",
    maxStake:
      "Stake or de-stake anytime. There is no limit to the $REFI staked.",
    apy: "5.5%",
  },
];

const mockStakes = [
  {
    state: 0,
    amount: "$REFI 1500",
    usdValue: "$500",
    startDate: "14-07-2024",
    lockedEndDate: "16-07-2024",
    apy: "35%",
    txStatus: "CONFIRMED",
    rewards: "25 Tokens",
  },
  {
    state: 1,
    amount: "$REFI 1500",
    usdValue: "$500",
    startDate: "14-07-2024",
    lockedEndDate: "16-07-2024",
    apy: "35%",
    txStatus: "CONFIRMED",
    rewards: "25 Tokens",
  },
  {
    state: 2,
    amount: "$REFI 1500",
    usdValue: "$500",
    startDate: "No Lock-in",
    lockedEndDate: "No Lock-in",
    apy: "5.5%",
    txStatus: "CONFIRMED",
    rewards: "25 Tokens",
  },
];

const StakingContent: FC = () => {
  const [selectedPoolIndex, setSelectedPoolIndex] = useState<number>(
    stakingPoolData.length - 1,
  );
  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const umi = useUmi(wallet);

  async function test(wallet: Wallet, umi: Umi) {
    const refiNfts = await getReFiNfts(umi, wallet.publicKey);

    await stake(wallet, 500_00, {
      mint: new PublicKey(refiNfts[0].publicKey),
      lockPeriod: 90,
    });
  }

  async function stake(
    wallet: Wallet,
    amount: number,
    nftInfo?: {
      lockPeriod: keyof typeof NFT_APY;
      mint: PublicKey;
    },
  ) {
    const connection = getConnection();
    const program = getProgram(wallet);
    const stakeInfo = await getStakeInfo(wallet, program);

    const dAmount = d(amount);
    const stakeIndex = stakeInfo?.stakes.length || 0;

    const initializeStakeIx = await getInitializeStakeInfoIx({
      accounts: {
        signer: wallet.publicKey,
        stakeInfo: getStakeInfoAddress(wallet.publicKey, program.programId),
      },
      program,
    });

    const stakeIx = await getStakeIx({
      args: { dAmount },
      accounts: {
        signer: wallet.publicKey,
        mint: SPL_MINT_PK,
      },
      program,
    });

    const instructions: TransactionInstruction[] = stakeInfo
      ? []
      : [initializeStakeIx];

    instructions.push(stakeIx);

    if (nftInfo) {
      instructions.push(
        await getLockNftIx({
          args: { stakeIndex, lockPeriod: nftInfo.lockPeriod },
          accounts: {
            signer: wallet.publicKey,
            mint: nftInfo.mint,
          },
          program,
        }),
      );
    }

    const { blockhash } = await connection.getLatestBlockhash();

    const messageV0 = new TransactionMessage({
      payerKey: wallet.publicKey,
      recentBlockhash: blockhash,
      instructions,
    }).compileToV0Message();

    const transactionV0 = new VersionedTransaction(messageV0);

    // Simulate the versioned transaction
    const simulateResult = await connection.simulateTransaction(transactionV0);

    // Print the simulation result
    console.log("Simulation Result:", simulateResult);

    const hash = await sendTransaction(transactionV0, connection);

    console.log(hash);
  }

  async function sendTransaction(
    tx: VersionedTransaction,
    connection: Connection,
  ): Promise<string> {
    return wallet.sendTransaction(tx, connection);
  }

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSelectPool = (index: number) => {
    setSelectedPoolIndex(index);
  };

  return (
    <div className="flex flex-col gap-12 text-white">
      <StakingPromoBanner />
      <MetricsSection
        metricsWidgets={globalMetricsWidgets}
        title="Global Metrics"
      />
      <MetricsSection metricsWidgets={userMetricsWidgets} title="My Metrics" />
      <StakingPools
        stakingPoolData={stakingPoolData}
        selectedPoolIndex={selectedPoolIndex}
        onSelectPool={handleSelectPool}
      />
      {/* {anchorWallet && umi && (
          <button onClick={() => test(anchorWallet, umi)}>stake</button>
        )} */}
      <StakesAndRewardsTable stakes={mockStakes} onStakeNow={openModal} />
    </div>
  );
};

export default StakingContent;
