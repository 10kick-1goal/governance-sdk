import { BigNumber } from 'bignumber.js';
import type BN from 'bn.js';

import { Proposal } from '../accounts/models/Proposal';
import { Realm } from '../accounts/models/Realm';
import { ProgramAccount } from '../accounts/ProgramAccount';

import { calculateMintMaxVoteWeight } from './calculateMintMaxVoteWeight';

interface Mint {
  supply: BN | BigNumber | bigint;
}

export function calculateMaxVoteScore(
  realm: ProgramAccount<Realm>,
  proposal: ProgramAccount<Proposal>,
  governingTokenMint: Pick<Mint, 'supply'>
) {
  if (proposal.account.isVoteFinalized() && proposal.account.maxVoteWeight) {
    return proposal.account.maxVoteWeight;
  }

  if (
    proposal.account.governingTokenMint.toBase58() === realm.account.config.councilMint?.toBase58()
  ) {
    return new BigNumber(governingTokenMint.supply.toString());
  }

  return calculateMintMaxVoteWeight(
    governingTokenMint,
    realm.account.config.communityMintMaxVoteWeightSource
  );
}
