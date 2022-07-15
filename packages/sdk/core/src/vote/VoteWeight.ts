import type { BigNumber } from 'bignumber.js';
import type BN from 'bn.js';

import { toBigNumber } from '../utils/toBigNumber';

export class VoteWeight {
  yes: BigNumber;
  no: BigNumber;

  constructor(args: { yes: BigNumber | BN; no: BigNumber | BN }) {
    this.yes = toBigNumber(args.yes);
    this.no = toBigNumber(args.no);
  }
}
