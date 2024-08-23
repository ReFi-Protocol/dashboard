import { Address } from "viem";
import { balanceOf } from "../config";

const TEAM_FINANCE_ADDRESS: Address =
  "0x53B7Ddc027d286FB83cC09Ac44054F77899386AC";
const MIGRATION_CONTRACT_ADDRESS: Address =
  "0x7701B2FC7a71703Ff212540ae16be1FcC1Aba1E5";
const LIQUIDITY_POOL_ADDRESS: Address =
  "0x98C36DCE8433DC89E91097b7Cf1dafbE32922457";

export async function getTotalValueLocked() {
  const lockedRefiAddresses: Address[] = [
    TEAM_FINANCE_ADDRESS,
    MIGRATION_CONTRACT_ADDRESS,
    LIQUIDITY_POOL_ADDRESS,
  ];

  const balances = await Promise.all(
    lockedRefiAddresses.map((address) => balanceOf(address)),
  );

  const totalBalance = balances.reduce((sum, balance) => sum + balance, 0n);

  return totalBalance;
}
