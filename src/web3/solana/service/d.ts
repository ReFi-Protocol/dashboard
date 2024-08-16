import { SPL_DECIMALS } from "../const";

export function d(amount: number, decimals: number = SPL_DECIMALS): number {
  return amount * 10 ** decimals;
}
