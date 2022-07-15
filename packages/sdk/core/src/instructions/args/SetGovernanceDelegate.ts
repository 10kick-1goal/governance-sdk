import type { PublicKey } from '@solana/web3.js';

import { InstructionType } from '../InstructionType';

export class SetGovernanceDelegate {
  instruction = InstructionType.SetGovernanceDelegate;
  newGovernanceDelegate?: PublicKey;

  constructor(args: { newGovernanceDelegate?: PublicKey }) {
    this.newGovernanceDelegate = args.newGovernanceDelegate;
  }
}
