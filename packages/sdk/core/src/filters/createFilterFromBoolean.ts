import type { MemcmpFilter } from '@solana/web3.js';
import base58 from 'bs58';

/**
 * Convert a boolean value into a Memory Compare filter
 */
export function createFilterFromBoolean(offset: number, value: boolean): MemcmpFilter {
  return {
    memcmp: {
      offset,
      bytes: base58.encode(Buffer.from(value ? [1] : [0])),
    },
  };
}
