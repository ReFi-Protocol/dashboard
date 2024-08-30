import {
  Connection,
  Keypair,
  PublicKey,
  SendOptions,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  Network,
  SignAndSendSigner,
  UnsignedTransaction,
  Wormhole,
} from "@wormhole-foundation/sdk";

export interface Provider {
  publicKey: PublicKey | null;
  signAndSendTransaction: (
    transaction: Transaction | VersionedTransaction,
    opts?: SendOptions,
  ) => Promise<{ signature: string; publicKey: PublicKey }>;
  signTransaction: (
    transaction: Transaction | VersionedTransaction,
  ) => Promise<Transaction | VersionedTransaction>;
  signAllTransactions: (
    transactions: (Transaction | VersionedTransaction)[],
  ) => Promise<(Transaction | VersionedTransaction)[]>;
}

export function isVersionedTransaction(tx: any): tx is VersionedTransaction {
  return tx.signatures !== undefined && tx.message !== undefined;
}

export class Signer implements SignAndSendSigner<"Mainnet", "Solana"> {
  private constructor(
    private connection: Connection,
    private provider: Provider,
    private _address: string,
  ) {}

  static async fromProvider(wh: Wormhole<Network>, provider: Provider) {
    if (!provider.publicKey)
      throw new Error("No public key, did you forget to call connect?");

    const ctx = wh.getChain("Solana");
    return new Signer(
      await ctx.getRpc(),
      provider,
      provider.publicKey.toBase58(),
    );
  }

  chain(): "Solana" {
    return "Solana";
  }

  address(): string {
    return this._address;
  }

  async signAndSend(txs: UnsignedTransaction[]): Promise<string[]> {
    const txids: string[] = [];

    for (const txn of txs) {
      const { description, transaction } = txn as UnsignedTransaction<
        "Mainnet",
        "Solana"
      >;
      console.log(`Signing ${description}`);

      const { transaction: tx, signers } = transaction as {
        transaction: Transaction | VersionedTransaction;
        signers?: Keypair[];
      };

      // Set recent blockhash
      const { blockhash, lastValidBlockHeight } =
        await this.connection.getLatestBlockhash();
      if (isVersionedTransaction(tx)) {
        tx.message.recentBlockhash = blockhash;
        if (signers && signers.length > 0) tx.sign(signers);
      } else {
        tx.recentBlockhash = blockhash;
        tx.lastValidBlockHeight = lastValidBlockHeight;
        if (signers && signers.length > 0) tx.partialSign(...signers);
      }

      // Partial sign with any signers passed in
      // NOTE: this _must_ come after any modifications to the transaction
      // otherwise, the signature wont verify
      const { signature: txid } =
        await this.provider.signAndSendTransaction(tx);

      if (!txid)
        throw new Error(
          "Could not determine if transaction was signed and sent",
        );

      txids.push(txid);
    }

    // Make sure they're all finalized
    await Promise.all(
      txids.map(async (txid) =>
        this.connection.confirmTransaction(txid, "confirmed"),
      ),
    );

    return txids;
  }
}
