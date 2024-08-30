import {
  Chain,
  Network,
  TokenId,
  TokenTransfer,
  Wormhole,
  amount as amountSdk,
} from "@wormhole-foundation/sdk";

import { SignerStuff } from "./type";
import { waitLog } from "./utils";
import {
  getEvmSigner as getEthSigner,
  getSignerStuff,
  getSolanaSigner as getSolSigner,
} from "./evm-signer";
import { AnchorWallet, Wallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import {
  ethChain,
  solChain as solChain,
  wh,
  WRAPPED_TOKEN_ADDRESS,
} from "./config";

export async function tokenBridgeReverse(
  amount: number,
  anchorWallet: AnchorWallet,
  wallet: Wallet,
  address: string,
  connection: Connection,
) {
  const automatic = false;
  const nativeGas = automatic ? "1" : undefined;
  const roundTrip: boolean = false;

  const solSigner = await getSolSigner(wh, anchorWallet, wallet, connection);
  const ethSigner = getEthSigner(address);
  const token = Wormhole.tokenId(solChain.chain, WRAPPED_TOKEN_ADDRESS);
  const decimals = Number(await wh.getDecimals(token.chain, token.address));

  const ethSignerStuff = getSignerStuff(ethSigner, ethChain);
  const solSignerStuff = getSignerStuff(solSigner, solChain);

  const xfer = await tokenTransfer(
    wh,
    {
      token,
      amount: amountSdk.units(amountSdk.parse(amount, decimals)),
      source: solSignerStuff,
      destination: ethSignerStuff,
      delivery: {
        automatic,
        nativeGas: nativeGas
          ? amountSdk.units(amountSdk.parse(nativeGas, decimals))
          : undefined,
      },
    },
    roundTrip,
  );
  const receipt = await waitLog(wh, xfer);

  // Log out the results
  console.log(receipt);
}

async function tokenTransfer<N extends Network>(
  wh: Wormhole<N>,
  route: {
    token: TokenId;
    amount: bigint;
    source: SignerStuff<N, Chain>;
    destination: SignerStuff<N, Chain>;
    delivery?: {
      automatic: boolean;
      nativeGas?: bigint;
    };
    payload?: Uint8Array;
  },
  roundTrip?: boolean,
): Promise<TokenTransfer<N>> {
  const xfer = await wh.tokenTransfer(
    route.token,
    route.amount,
    route.source.address,
    route.destination.address,
    route.delivery?.automatic ?? false,
    route.payload,
    route.delivery?.nativeGas,
  );

  const quote = await TokenTransfer.quoteTransfer(
    wh,
    route.source.chain,
    route.destination.chain,
    xfer.transfer,
  );
  console.log(quote);

  if (xfer.transfer.automatic && quote.destinationToken.amount < 0)
    throw "The amount requested is too low to cover the fee and any native gas requested.";

  // 1) Submit the transactions to the source chain, passing a signer to sign any txns
  console.log("Starting transfer");
  const srcTxids = await xfer.initiateTransfer(route.source.signer);
  alert(srcTxids[1]); // tx to check on wormholescan
  console.log(`Started transfer: `, srcTxids);

  // If automatic, we're done
  if (route.delivery?.automatic) return xfer;

  // 2) Wait for the VAA to be signed and ready (not required for auto transfer)
  console.log("Getting Attestation");
  const attestIds = await xfer.fetchAttestation(60_000);
  console.log(`Got Attestation: `, attestIds);

  // 3) Redeem the VAA on the dest chain
  console.log("Completing Transfer");
  const destTxids = await xfer.completeTransfer(route.destination.signer);
  console.log(`Completed Transfer: `, destTxids);
  // EXAMPLE_TOKEN_TRANSFER

  // If no need to send back, dip
  if (!roundTrip) return xfer;

  const { destinationToken: token } = quote;
  return await tokenTransfer(wh, {
    ...route,
    token: token.token,
    amount: token.amount,
    source: route.destination,
    destination: route.source,
  });
}
