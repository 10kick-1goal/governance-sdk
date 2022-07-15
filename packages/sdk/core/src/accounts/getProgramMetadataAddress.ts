import { PublicKey } from '@solana/web3.js';

/**
 * Get the address for a Program Metadata
 */
export async function getProgramMetadataAddress(programId: PublicKey) {
  const [signatoryRecordAddress] = await PublicKey.findProgramAddress(
    [Buffer.from('metadata')],
    programId
  );

  return signatoryRecordAddress;
}
