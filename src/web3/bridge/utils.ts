import {
  DEFAULT_TASK_TIMEOUT,
  Network,
  TokenTransfer,
  TransferState,
  Wormhole,
} from "@wormhole-foundation/sdk";

export async function waitLog<N extends Network = Network>(
  wh: Wormhole<N>,
  xfer: TokenTransfer<N>,
  tag: string = "WaitLog",
  timeout: number = DEFAULT_TASK_TIMEOUT,
) {
  const tracker = TokenTransfer.track(
    wh,
    TokenTransfer.getReceipt(xfer),
    timeout,
  );
  let receipt;
  for await (receipt of tracker) {
    console.log(
      `${tag}: Current trasfer state: `,
      TransferState[receipt.state],
    );
  }
  return receipt;
}
