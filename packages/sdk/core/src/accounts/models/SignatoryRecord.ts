import type { PublicKey } from '@solana/web3.js';

import { AccountType } from '../AccountType';

export class SignatoryRecord {
  accountType = AccountType.SignatoryRecordV1;
  proposal: PublicKey;
  signatory: PublicKey;
  signedOff: boolean;

  constructor(args: { proposal: PublicKey; signatory: PublicKey; signedOff: boolean }) {
    this.proposal = args.proposal;
    this.signatory = args.signatory;
    this.signedOff = args.signedOff;
  }
}
