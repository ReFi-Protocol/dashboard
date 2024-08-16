import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import {
  CandyMachine,
  fetchCandyMachine,
  mplCandyMachine,
} from "@metaplex-foundation/mpl-candy-machine";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { CANDY_MACHINE_ADDRESS, RPC_URL } from "../const";
import { useEffect, useState } from "react";
import { publicKey, Umi } from "@metaplex-foundation/umi";

export const useUmi = (wallet?: WalletContextState) => {
  const [umi, setUmi] = useState<Umi>();

  useEffect(() => {
    const umi = createUmi(RPC_URL)
      .use(mplTokenMetadata())
      .use(mplCandyMachine());

    if (wallet) {
      umi.use(walletAdapterIdentity(wallet));
    }

    setUmi(umi);
  }, [wallet]);

  return umi;
};

export const useCandyMachine = (wallet?: WalletContextState) => {
  const umi = useUmi(wallet);
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  useEffect(() => {
    if (umi) {
      fetchCandyMachine(umi, publicKey(CANDY_MACHINE_ADDRESS)).then(
        (candyMachine) => {
          setCandyMachine(candyMachine);
        },
      );
    }
  }, [umi]);

  return candyMachine;
};
