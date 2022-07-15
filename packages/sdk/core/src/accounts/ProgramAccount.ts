import type { PublicKey } from '@solana/web3.js';

/**
 * Account and metadata
 */
export type ProgramAccount<T> = {
  pubkey: PublicKey;
  account: T;
  owner: PublicKey;
};
