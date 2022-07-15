import type { MemcmpFilter } from '@solana/web3.js';
import base58 from 'bs58';

/**
 * Determine if a Memory Compare Filter matches a Buffer
 */
export function matchesBuffer(filter: MemcmpFilter, buffer: Buffer) {
  const filterBuffer = Buffer.from(base58.decode(filter.memcmp.bytes));

  if (filter.memcmp.offset + filterBuffer.length > buffer.length) {
    return false;
  }

  for (let i = 0; i < filterBuffer.length; i++) {
    if (filterBuffer[i] !== buffer[filter.memcmp.offset + i]) {
      return false;
    }
  }

  return true;
}
