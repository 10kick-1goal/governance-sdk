import type { PublicKey } from '@solana/web3.js';

import type { SetRealmAuthorityAction } from '../configs/SetRealmAuthorityAction';
import { InstructionType } from '../InstructionType';

export class SetRealmAuthority {
  instruction = InstructionType.SetRealmAuthority;

  // V1
  newRealmAuthority?: PublicKey;

  // V2
  action?: SetRealmAuthorityAction;

  constructor(args: { newRealmAuthority?: PublicKey; action?: SetRealmAuthorityAction }) {
    // V1
    this.newRealmAuthority = args.newRealmAuthority;

    // V2
    this.action = args.action;
  }
}
