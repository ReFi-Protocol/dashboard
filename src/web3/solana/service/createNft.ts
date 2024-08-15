import {
  Umi,
  PublicKey,
  generateSigner,
  some,
  isSome,
  transactionBuilder,
  publicKey,
  TransactionBuilderSendAndConfirmOptions,
} from "@metaplex-foundation/umi";
import {
  mintV2,
  fetchCandyMachine,
  fetchCandyGuard,
} from "@metaplex-foundation/mpl-candy-machine";
import {} from "@metaplex-foundation/umi";
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";
import { CANDY_MACHINE_ADDRESS } from "../const";

export async function mintNftFromCandyMachine(
  umi: Umi,
  nftMint = generateSigner(umi),
) {
  const candyMachineAddress = publicKey(CANDY_MACHINE_ADDRESS);
  const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);
  const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);

  const sendAndConfirmOptions: TransactionBuilderSendAndConfirmOptions = {
    confirm: { commitment: "finalized" },
  };

  await transactionBuilder()
    .add(setComputeUnitLimit(umi, { units: 800_000 }))
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

  return nftMint.publicKey;
}
