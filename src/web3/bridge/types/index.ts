export type Operation = {
  sourceChain: string;
  destChain: string;
  toAddress: string;
  fromAddress: string;
  amount: number;
  fee: string;
  timestamp: string;
  vaa: any | undefined;
  status: OperationStatus;
  txHash: string;
};

export type OperationStatus = "COMPLET$ED" | "IN PROGRESS" | "VAA EMITTED";
