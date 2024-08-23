import { SPL_DECIMALS } from "../solana/const";

export function D(amount: number, decimals: number = SPL_DECIMALS): number {
  return amount * 10 ** decimals;
}

export function d(amount: number, decimals: number = SPL_DECIMALS): number {
  return amount / 10 ** decimals;
}
