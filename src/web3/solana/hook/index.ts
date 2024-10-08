import {
  CandyMachine,
  fetchCandyMachine,
  mplCandyMachine,
} from "@metaplex-foundation/mpl-candy-machine";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey, Umi } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { CANDY_MACHINE_ADDRESS, RPC_URL } from "../const";
import { getProgram } from "../staking";
import { Stake, Wallet } from "../staking/types";
import { getStakeInfo } from "../staking/util";

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
        }
      );
    }
  }, [umi]);

  return candyMachine;
};

export function useStakes(wallet?: Wallet | null) {
  const [stakes, setStakes] = useState<Stake[]>([]);

  useEffect(() => {
    if (!wallet) return;
    let intervalId;

    const fetchStakeInfo = async () => {
      getStakeInfo(wallet, getProgram(wallet)).then((info) => {
        setStakes(info?.stakes || []);
      });
    };

    fetchStakeInfo();
    intervalId = setInterval(fetchStakeInfo, 3000);

    return () => clearInterval(intervalId);
  }, [wallet]);

  return { stakes };
}
