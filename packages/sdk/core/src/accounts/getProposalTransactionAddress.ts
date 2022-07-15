import { PublicKey } from '@solana/web3.js';

import { PROGRAM_VERSION_V1, ProgramVersion, GOVERNANCE_PROGRAM_SEED } from '../constants';

/**
 * Get the address for a Proposal Transaction
 */
export async function getProposalTransactionAddress(
  programId: PublicKey,
  programVersion: ProgramVersion,
  proposal: PublicKey,
  optionIndex: number,
  transactionIndex: number
) {
  const optionIndexBuffer = Buffer.alloc(1);
  optionIndexBuffer.writeUInt8(optionIndex);

  const instructionIndexBuffer = Buffer.alloc(2);
  instructionIndexBuffer.writeInt16LE(transactionIndex, 0);

  const seeds =
    programVersion === PROGRAM_VERSION_V1
      ? [Buffer.from(GOVERNANCE_PROGRAM_SEED), proposal.toBuffer(), instructionIndexBuffer]
      : [
          Buffer.from(GOVERNANCE_PROGRAM_SEED),
          proposal.toBuffer(),
          optionIndexBuffer,
          instructionIndexBuffer,
        ];

  const [instructionAddress] = await PublicKey.findProgramAddress(seeds, programId);

  return instructionAddress;
}
