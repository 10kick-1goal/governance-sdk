import type { PublicKey } from '@solana/web3.js';

import { InstructionType } from '../InstructionType';

export class AddSignatory {
  instruction = InstructionType.AddSignatory;
  /**
   * Public key of the signatory
   */
  signatory: PublicKey;

  constructor(args: { signatory: PublicKey }) {
    this.signatory = args.signatory;
  }
}
