import * as chains from "viem/chains";
import { createConfig, http } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { CHAIN_ID, RPC_URL } from "../const";
import { env } from "../../../env";
import { Address, erc20Abi } from "viem";
import { REFI_ADDRESS } from "../const";
import { readContract } from "wagmi/actions";

function getChain(id: number): chains.Chain {
  return (
    Object.values(chains).find((x) => x.id === id) ??
    (() => {
      throw new Error(`Chain with ID ${id} not found`);
    })()
  );
}

const chain = getChain(CHAIN_ID);

export const web3config = createConfig(
  getDefaultConfig({
    chains: [chain],
    transports: {
      [chain.id]: http(RPC_URL),
    },
    walletConnectProjectId: env.VITE_WALLETCONNECT_PROJECT_ID,
    appName: "Dashboard",
  }),
);

export const refiContractConfig = {
  address: REFI_ADDRESS as Address,
  abi: erc20Abi,
};

export function balanceOf(address: Address) {
  return readContract(web3config, {
    ...refiContractConfig,
    functionName: "balanceOf",
    args: [address],
  });
}

export function totalSupply() {
  return readContract(web3config, {
    ...refiContractConfig,
    functionName: "totalSupply",
  });
}

export function decimals() {
  return readContract(web3config, {
    ...refiContractConfig,
    functionName: "decimals",
  });
}
