import { clusterApiUrl, Connection } from "@solana/web3.js";
import { Wormhole, wormhole } from "@wormhole-foundation/sdk";
import evm from "@wormhole-foundation/sdk/evm";
import solana from "@wormhole-foundation/sdk/solana";

const rpc =
  "https://mainnet.helius-rpc.com/?api-key=0cb9cd1b-d738-4f13-9a5c-a1967d205f11";

export const wh = await wormhole("Mainnet", [evm, solana], {
  chains: {
    Solana: {
      rpc,
    },
  },
});

export const getBridgeConnection = () => {
  return new Connection(rpc, {
    commitment: "confirmed",
  });
};

export const TOKEN_ADDRESS = "0xA4bB712B4ea05E74a9590EC550BD922cd857AfcB";
export const WRAPPED_TOKEN_ADDRESS =
  "GHCuvQZcLovrFKL9ceY6epPWBt91FiThU8pwNs7bGjqg";
export const ethChain = wh.getChain("Ethereum");
export const solChain = wh.getChain("Solana");
