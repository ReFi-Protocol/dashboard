import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  RpcResponseAndContext,
  SimulatedTransactionResponse,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import IDL from "../idl/viridis_staking.json";

const tokenProgramErrors = [
  "Lamport balance below rent-exempt threshold",
  "Insufficient funds",
  "Invalid Mint",
  "Account not associated with this Mint",
  "Owner does not match",
  "Fixed supply",
  "Already in use",
  "Invalid number of provided signers",
  "Invalid number of required signers",
  "State is unititialized",
  "Instruction does not support native tokens",
  "Non-native account can only be closed if its balance is zero",
  "Invalid instruction",
  "State is invalid for requested operation",
  "Operation overflowed",
  "Account does not support specified authority type",
  "This token mint cannot freeze accounts",
  "Account is frozen",
  "The provided decimals value different from the Mint decimals",
  "Instruction does not support non-native tokens",
] as const;

export function checkCustomError({
  value,
}: RpcResponseAndContext<SimulatedTransactionResponse>) {
  if (value.err) {
    if (typeof value.err === "object" && "InstructionError" in value.err) {
      const instructionError = value.err.InstructionError;
      if (Array.isArray(instructionError) && instructionError.length === 2) {
        const [, customError] = instructionError;
        if (typeof customError === "object" && "Custom" in customError) {
          const errorCode = customError.Custom;
          const programError = IDL.errors.find((e) => e.code === errorCode);

          if (programError) {
            throw new Error(programError.msg);
          }

          const tokenProgramErrorMessage = tokenProgramErrors[errorCode];

          if (tokenProgramErrorMessage) {
            throw new Error(tokenProgramErrorMessage);
          }

          console.log(tokenProgramErrorMessage);

          throw new Error(`Unknown error`);
        }
      }
    }
  }
}
