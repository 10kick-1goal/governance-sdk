import type { PublicKey } from '@solana/web3.js';

export class AccountMetaData {
  pubkey: PublicKey;
  isSigner: boolean;
  isWritable: boolean;

  constructor(args: { pubkey: PublicKey; isSigner: boolean; isWritable: boolean }) {
    this.pubkey = args.pubkey;
    this.isSigner = !!args.isSigner;
    this.isWritable = !!args.isWritable;
  }
}
