import { chainIdToChain, Wormhole } from "@wormhole-foundation/sdk";
import {  getBridgeConnection, TOKEN_ADDRESS } from "./config";
import { d } from "../util/d";
import { Operation } from "./types";

const apiUrl = "https://api.wormholescan.io/api/v1";

export async function getWormholeBridgeHistory(walletAddress: string) {
  const url = `${apiUrl}/transactions?address=${walletAddress}`;
  const connection = getBridgeConnection();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  return fetch(url, options).then((res) => res.json());
}

export async function getOperations(
  walletAddress: string,
): Promise<Operation[]> {
  const url = `${apiUrl}/operations?address=${walletAddress}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const data = await fetch(url, options).then((res) => res.json());

  const mappedOperations = data.operations
    .filter((operation: any) => operation.content.payload.toChain)
    .map((operation: any) => {
      const sourceChain = chainIdToChain(
        operation.content.standarizedProperties.fromChain,
      );
      const destChain = chainIdToChain(
        operation.content.standarizedProperties.toChain,
      );
      const dAmount = Number(operation.content.payload.amount);
      const decimals = 8;
      const amount = d(dAmount, decimals);
      const status = operation.targetChain
        ? "COMPLETED"
        : operation.vaa
          ? "VAA EMITTED"
          : "IN PROGRESS";

      return {
        sourceChain,
        destChain,
        toAddress: operation.content.standarizedProperties.toAddress,
        fromAddress: operation.sourceChain.from,
        amount,
        fee: operation.sourceChain.fee,
        vaa: operation.vaa,
        timestamp: operation.sourceChain.timestamp,
        status,
        txHash: operation.sourceChain.transaction.txHash,
      };
    });

  return mappedOperations;
}
