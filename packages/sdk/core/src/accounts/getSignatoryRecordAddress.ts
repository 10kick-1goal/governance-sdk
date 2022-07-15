import { PublicKey } from '@solana/web3.js';

import { GOVERNANCE_PROGRAM_SEED } from '../constants';

/**
 * Get the address for a Signatory Record
 */
export async function getSignatoryRecordAddress(
  programId: PublicKey,
  proposal: PublicKey,
  signatory: PublicKey
) {
  const [signatoryRecordAddress] = await PublicKey.findProgramAddress(
    [Buffer.from(GOVERNANCE_PROGRAM_SEED), proposal.toBuffer(), signatory.toBuffer()],
    programId
  );

  return signatoryRecordAddress;
}
