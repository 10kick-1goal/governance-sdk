import { BigNumber } from 'bignumber.js';
import type BN from 'bn.js';

import { toBigNumber } from '../utils/toBigNumber';

import { MintMaxVoteWeightSourceType } from './MintMaxVoteWeightSourceType';

export class MintMaxVoteWeightSource {
  type = MintMaxVoteWeightSourceType.SupplyFraction;
  value: BigNumber;

  constructor(args: { value: BigNumber | BN }) {
    this.value = toBigNumber(args.value);
  }

  static SUPPLY_FRACTION_BASE = new BigNumber(10000000000);
  static SUPPLY_FRACTION_DECIMALS = 10;

  static FULL_SUPPLY_FRACTION = new MintMaxVoteWeightSource({
    value: MintMaxVoteWeightSource.SUPPLY_FRACTION_BASE,
  });

  isFullSupply() {
    return (
      this.type === MintMaxVoteWeightSourceType.SupplyFraction &&
      this.value.comparedTo(MintMaxVoteWeightSource.SUPPLY_FRACTION_BASE) === 0
    );
  }

  getSupplyFraction() {
    if (this.type !== MintMaxVoteWeightSourceType.SupplyFraction) {
      throw new Error('Max vote weight is not fraction');
    }

    return this.value;
  }

  fmtSupplyFractionPercentage() {
    return this.getSupplyFraction()
      .shiftedBy(-MintMaxVoteWeightSource.SUPPLY_FRACTION_DECIMALS + 2)
      .toFormat();
  }
}
