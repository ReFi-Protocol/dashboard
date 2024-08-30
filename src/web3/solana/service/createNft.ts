import {
  Umi,
  generateSigner,
  some,
  isSome,
  transactionBuilder,
  publicKey,
  TransactionBuilderSendAndConfirmOptions,
  Instruction,
} from "@metaplex-foundation/umi";
import {
  mintV2,
  fetchCandyMachine,
  fetchCandyGuard,
} from "@metaplex-foundation/mpl-candy-machine";
import {} from "@metaplex-foundation/umi";
import {
  setComputeUnitLimit,
  setComputeUnitPrice,
} from "@metaplex-foundation/mpl-toolbox";
import { CANDY_MACHINE_ADDRESS } from "../const";
import { getConnection } from "../connection";
import { AnchorWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { sendTransaction } from "../staking/service/sendTransaction";
import {
  PublicKey,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

export async function mintNftFromCandyMachine(
  umi: Umi,
  wallet: WalletContextState,
  anchorWallet: AnchorWallet | undefined,
  nftMint = generateSigner(umi),
) {
  if (!wallet.publicKey || !anchorWallet) {
    return;
  }

  const connection = getConnection();

  const candyMachineAddress = publicKey(CANDY_MACHINE_ADDRESS);
  const candyMachine = await fetchCandyMachine(umi, candyMachineAddress);
  const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);

  const sendAndConfirmOptions: TransactionBuilderSendAndConfirmOptions = {
    send: {
      maxRetries: 5,
    },
    confirm: { commitment: "finalized" },
  };

  const builder = transactionBuilder();

  try {
    const ixs = await builder
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
      .add(setComputeUnitLimit(umi, { units: 1_000_000 }))
      .add(setComputeUnitPrice(umi, { microLamports: 1_000 }))
      .getInstructions();

    const tixs = convertInstructionsToTransactionInstructions(ixs);

    const { blockhash } = await connection.getLatestBlockhash("confirmed");

    const messageV0 = new TransactionMessage({
      payerKey: wallet.publicKey,
      recentBlockhash: blockhash,
      instructions: tixs,
    }).compileToV0Message();

    const transactionV0 = new VersionedTransaction(messageV0);

    // Simulate the versioned transaction
    const simulateResult = await connection.simulateTransaction(transactionV0);

    console.log(simulateResult);

    await wallet.sendTransaction(transactionV0, connection, {
      maxRetries: 5,
    });
  } catch (e: any) {
    console.log(e);
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

    throw e;
  }

  return nftMint.publicKey;
}

function convertInstructionsToTransactionInstructions(
  ixs: Instruction[],
): TransactionInstruction[] {
  return ixs.map((ix) => {
    return new TransactionInstruction({
      programId: new PublicKey(ix.programId.toString()),
      keys: ix.keys.map((key) => ({
        pubkey: new PublicKey(key.pubkey.toString()),
        isSigner: key.isSigner,
        isWritable: key.isWritable,
      })),
      data: Buffer.from(ix.data),
    });
  });
}
