import type { BigNumber } from 'bignumber.js';
import type BN from 'bn.js';

import { toBigNumber } from '../../utils/toBigNumber';
import { InstructionType } from '../InstructionType';

export class DepositGoverningTokens {
  instruction = InstructionType.DepositGoverningTokens;
  amount: BigNumber;

  constructor(args: { amount: BigNumber | BN }) {
    this.amount = toBigNumber(args.amount);
  }
}
