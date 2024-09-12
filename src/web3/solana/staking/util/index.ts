import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import Big from "big.js";
import { d } from "../../../util/d";
import { APY_DECIMALS, ONE_DAY_SECONDS, SPL_DECIMALS } from "../../const";
import { Stake, Wallet } from "../types";
import { ViridisStaking } from "../types/viridis_staking";

export const getStakeInfoAddress = (
  address: PublicKey,
  programId: PublicKey,
) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("stake_info"), address.toBuffer()],
    programId,
  )[0];
};

export const getConfigAddress = (programId: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("config")],
    programId,
  )[0];
};

export const getVaultAddress = (programId: PublicKey) => {
  return PublicKey.findProgramAddressSync([Buffer.from("vault")], programId)[0];
};

export async function getConfig(program: Program<ViridisStaking>) {
  const configAddress = getConfigAddress(program.programId);

  const config = await program.account.config.fetch(configAddress);

  return config;
}

export async function getStakeInfo(
  wallet: Wallet,
  program: Program<ViridisStaking>,
) {
  const stakeInfoAddress = getStakeInfoAddress(
    wallet.publicKey,
    program.programId,
  );

  try {
    const stakeInfo = await program.account.stakeInfo.fetch(stakeInfoAddress);

    return stakeInfo;
  } catch (e) {
    return undefined;
  }
}

export function formatReFi(lamports: number, decimals: number = SPL_DECIMALS) {
  return d(lamports, decimals).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 7,
  }).format(amount);
}

export function calculateClaimableReward(
  stake: Stake,
  onDate: number = Date.now(),
) {
  const currentTimestamp = Math.floor(onDate / 1000);
  const startTimestamp = stake.startTime.toNumber();
  const daysPassed = Math.floor(
    (currentTimestamp - startTimestamp) / ONE_DAY_SECONDS,
  );

  const annualBaseReward = calculateReward(
    stake.amount.toNumber(),
    stake.baseApy,
    daysPassed,
  );

  if (!stake.nftApy) {
    return annualBaseReward;
  }

  const nftEffectiveDays = Math.min(daysPassed, stake.maxNftApyDurationDays);
  const annualNftReward = calculateReward(
    stake.amount.toNumber(),
    stake.nftApy,
    nftEffectiveDays,
  );

  const limitedAnnualNftReward = Math.min(
    annualNftReward,
    stake.maxNftRewardLamports.toNumber(),
  );

  return Math.max(annualBaseReward + limitedAnnualNftReward, 0);
}

export const calculateReward = (
  amount: number | bigint,
  apy: number,
  daysPassed: number,
): number => {
  try {
    const bAmount = new Big(String(amount));
    const bApy = new Big(apy).div(Big(10).pow(APY_DECIMALS));
    const bDaysPassed = new Big(daysPassed);
    const dailyRate = bApy.div(new Big(365));
    const dailyMultiplier = dailyRate.div(new Big(100));
    const reward = bAmount.mul(dailyMultiplier).mul(bDaysPassed);
    return reward.round().toNumber();
  } catch (error) {
    console.error("Error in calculateReward:", error);
    throw error;
  }
};

export function calculatePercentage(part: number, whole: number): number {
  if (whole === 0) {
    return 0; // Avoid division by zero
  }
  const percentage = (part / whole) * 100;
  return Number(percentage.toFixed(2));
}
