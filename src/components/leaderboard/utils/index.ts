import { BN } from "@coral-xyz/anchor";
import { StakeInfoAccount } from "../../../web3/solana/staking/types";

type TableData = {
  walletAddress: string;
  totalStaked: BN;
  totalStakedUsd: number;
  distinctNftCount: number;
};

export function createLeaderboardTable(
  stakeInfoAccounts: StakeInfoAccount[],
  currentPrice: number,
): TableData[] {
  const tableData: TableData[] = [];

  stakeInfoAccounts.forEach((account) => {
    let totalStaked = new BN(0);
    const distinctNfts = new Set<string>();

    account.account.stakes.forEach((stake) => {
      if (!stake.destakeTime) {
        totalStaked = totalStaked.add(stake.amount);
      }
      if (stake.nft) {
        distinctNfts.add(stake.nft.toString());
      }
    });

    const totalStakedUsd = totalStaked.toNumber() * currentPrice;
    tableData.push({
      walletAddress: truncateAddress(account.account.address.toString()),
      totalStaked: totalStaked,
      distinctNftCount: distinctNfts.size,
      totalStakedUsd,
    });
  });

  return tableData.sort((a, b) => b.totalStaked.sub(a.totalStaked).toNumber());
}

function truncateAddress(address: string): string {
  return address.length <= 12
    ? address
    : `${address.slice(0, 6)}...${address.slice(-4)}`;
}
