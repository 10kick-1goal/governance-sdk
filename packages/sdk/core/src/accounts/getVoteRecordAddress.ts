import { PublicKey } from '@solana/web3.js';

import { GOVERNANCE_PROGRAM_SEED } from '../constants';

/**
 * Get the address for a Vote Record
 */
export async function getVoteRecordAddress(
  programId: PublicKey,
  proposal: PublicKey,
  tokenOwnerRecord: PublicKey
) {
  const [voteRecordAddress] = await PublicKey.findProgramAddress(
    [Buffer.from(GOVERNANCE_PROGRAM_SEED), proposal.toBuffer(), tokenOwnerRecord.toBuffer()],
    programId
  );

  return voteRecordAddress;
}
