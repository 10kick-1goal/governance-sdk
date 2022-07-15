import { PublicKey } from '@solana/web3.js';

import { GOVERNANCE_PROGRAM_SEED } from '../constants';

/**
 * Get the address for a Token Owner Record
 */
export async function getTokenOwnerAddress(
  programId: PublicKey,
  realm: PublicKey,
  governingTokenMint: PublicKey,
  governingTokenOwner: PublicKey
) {
  const [tokenOwnerRecordAddress] = await PublicKey.findProgramAddress(
    [
      Buffer.from(GOVERNANCE_PROGRAM_SEED),
      realm.toBuffer(),
      governingTokenMint.toBuffer(),
      governingTokenOwner.toBuffer(),
    ],
    programId
  );

  return tokenOwnerRecordAddress;
}
