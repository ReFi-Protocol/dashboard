import {
  fetchCandyGuard,
  fetchCandyMachine,
  mintV2,
} from "@metaplex-foundation/mpl-candy-machine";
import {
  setComputeUnitLimit,
  setComputeUnitPrice,
} from "@metaplex-foundation/mpl-toolbox";
import {
  generateSigner,
  isSome,
  publicKey,
  some,
  transactionBuilder,
  TransactionBuilderSendAndConfirmOptions,
  Umi
} from "@metaplex-foundation/umi";
import { getConnection } from "../connection";
import { CANDY_MACHINE_ADDRESS } from "../const";

export async function mintNftFromCandyMachine(
  umi: Umi,
  nftMint = generateSigner(umi),
) {
  // const nftMint = generateSigner(umi);
  const candyMachineAddress = publicKey(CANDY_MACHINE_ADDRESS);
  const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);
  const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);

  const sendAndConfirmOptions: TransactionBuilderSendAndConfirmOptions = {
    confirm: { commitment: "finalized" },
  };
  const latestBlockhash = await umi.rpc.getLatestBlockhash();

  const builder = transactionBuilder()
    .setFeePayer(umi.identity)
    .setBlockhash(latestBlockhash);

  try {
    const result = await builder
      .add(setComputeUnitLimit(umi, { units: 1_000_000 }))
      .add(setComputeUnitPrice(umi, { microLamports: 1000 }))
      .add(
        mintV2(umi, {
          candyMachine: candyMachine.publicKey,
          nftMint,
          collectionMint: candyMachine.collectionMint,
          collectionUpdateAuthority: candyMachine.authority,
          tokenStandard: candyMachine.tokenStandard,
          candyGuard: candyGuard.publicKey,
          mintArgs: {
            tokenPayment:
              candyGuard.guards.tokenPayment &&
              isSome(candyGuard.guards.tokenPayment)
                ? some({
                    destinationAta:
                      candyGuard.guards.tokenPayment.value.destinationAta,
                    mint: candyGuard.guards.tokenPayment.value.mint,
                    amount: candyGuard.guards.tokenPayment.value.amount,
                  })
                : undefined,
          },
        }),
      )
      .sendAndConfirm(umi, sendAndConfirmOptions);
  } catch (e: any) {
    /// TODO: remove after TransactionExpiredBlockheightExceededError resolved
    if (e.signature) {
      const { value: status } = await getConnection().getSignatureStatus(
        e.signature,
      );
      if (!status) {
        console.log("Transaction not found or status not available");
        throw e;
      }
      console.log("Transaction status:", status.confirmationStatus);
      console.log("Slot:", status.slot);
      if (status.err) {
        throw e;
      } else {
      }
    }
  }
console.log(nftMint.publicKey)
  return nftMint.publicKey;
}
