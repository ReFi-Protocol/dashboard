import {
  Chain,
  Network,
  TokenId,
  TokenTransfer,
  Wormhole,
  amount as amountSdk,
} from "@wormhole-foundation/sdk";

import { SignerStuff } from "./type";
import { getEvmSigner, getSignerStuff, getSolanaSigner } from "./evm-signer";
import { AnchorWallet, Wallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { TOKEN_ADDRESS, ethChain, solChain, wh } from "./config";

export async function tokenBridge(
  amount: number,
  anchorWallet: AnchorWallet,
  wallet: Wallet,
  address: string,
  connection: Connection,
) {
  const automatic = false;
  const nativeGas = automatic ? "1" : undefined;
  const roundTrip: boolean = false;

  const solSigner = await getSolanaSigner(wh, anchorWallet, wallet, connection);
  const ethSigner = getEvmSigner(address);
  const token = Wormhole.tokenId(ethChain.chain, TOKEN_ADDRESS);
  const decimals = Number(await wh.getDecimals(token.chain, token.address));

  const ethSignerStuff = getSignerStuff(ethSigner, ethChain);
  const solSignerStuff = getSignerStuff(solSigner, solChain);

  const xfer = await tokenTransfer(
    wh,
    {
      token,
      amount: amountSdk.units(amountSdk.parse(amount, decimals)),
      source: ethSignerStuff,
      destination: solSignerStuff,
      delivery: {
        automatic,
        nativeGas: nativeGas
          ? amountSdk.units(amountSdk.parse(nativeGas, decimals))
          : undefined,
      },
    },
    roundTrip,
  );
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
) {
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

  await xfer.initiateTransfer(route.source.signer);
}
