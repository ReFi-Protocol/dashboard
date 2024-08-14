import { FC } from "react";
import { MdBarChart, MdLock } from "react-icons/md";
import Widget from "../../components/widget";
import { FaMoneyBills } from "react-icons/fa6";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";
import { TbShieldLockFilled } from "react-icons/tb";
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

const StakingContent: FC = () => {
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
        {anchorWallet && umi && (
          <button onClick={() => test(anchorWallet, umi)}>stake</button>
        )}
      </div>
    </div>
  );
};

export default StakingContent;
