import { isAddress } from "viem";
import { z } from "zod";

export const zHex = z.string().regex(/^0x[a-fA-F0-9]+$/, "Invalid hex string");

export const zAddress = z.string().refine((value) => isAddress(value), {
  message: "Provided address is invalid",
});
