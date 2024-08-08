import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import { useWallet } from "@solana/wallet-adapter-react";
import { RPC_URL } from "../const";

export const useUmi = () => {
  const wallet = useWallet();

  const umi = createUmi(RPC_URL)
    .use(mplTokenMetadata())
    .use(mplCandyMachine())
    .use(walletAdapterIdentity(wallet));

  return umi;
};
