import { BigNumber } from 'bignumber.js';
import type BN from 'bn.js';

import { MintMaxVoteWeightSource } from '../mint/MintMaxVoteWeightSource';

interface Mint {
  supply: BN | BigNumber | bigint;
}

export function calculateMintMaxVoteWeight(
  mint: Pick<Mint, 'supply'>,
  maxVoteWeightSource: MintMaxVoteWeightSource
) {
  if (maxVoteWeightSource.isFullSupply()) {
    return new BigNumber(mint.supply.toString());
  }

  const supplyFraction = maxVoteWeightSource.getSupplyFraction();

  const maxVoteWeight = new BigNumber(supplyFraction.toString())
    .multipliedBy(mint.supply.toString())
    .shiftedBy(-MintMaxVoteWeightSource.SUPPLY_FRACTION_DECIMALS);

  return maxVoteWeight.dp(0, BigNumber.ROUND_DOWN);
}
