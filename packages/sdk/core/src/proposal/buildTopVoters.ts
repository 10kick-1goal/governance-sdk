import type { PublicKey } from '@solana/web3.js';
import { BigNumber } from 'bignumber.js';
import type BN from 'bn.js';

import { Proposal } from '../accounts/models/Proposal';
import { Realm } from '../accounts/models/Realm';
import { TokenOwnerRecord } from '../accounts/models/TokenOwnerRecord';
import { VoteRecord } from '../accounts/models/VoteRecord';
import { ProgramAccount } from '../accounts/ProgramAccount';

import { calculateMaxVoteScore } from './calculateMaxVoteScore';

interface Mint {
  supply: BN | BigNumber | bigint;
  decimals: number;
}

export enum VoteOption {
  No,
  Undecided,
  Yes,
}

export interface VoterDisplayData {
  decimals: number;
  name: PublicKey;
  voteOption: VoteOption;
  votesCast: BigNumber;
  votePercentage: number;
  key: string;
}

const buildResults = (
  key: PublicKey,
  amount: BigNumber,
  label: VoteOption,
  total: BigNumber,
  decimals: number
) => ({
  decimals,
  name: key,
  voteOption: label,
  votesCast: amount,
  key: key.toBase58(),
  votePercentage: amount.shiftedBy(2).dividedBy(total).toNumber(),
});

const ZERO = new BigNumber(0);

export function buildTopVoters(
  voteRecords: ProgramAccount<VoteRecord>[],
  tokenOwnerRecords: ProgramAccount<TokenOwnerRecord>[],
  realm: ProgramAccount<Realm>,
  proposal: ProgramAccount<Proposal>,
  governingTokenMint: Mint
): VoterDisplayData[] {
  const maxVote = calculateMaxVoteScore(realm, proposal, governingTokenMint);

  const undecidedData = tokenOwnerRecords
    .filter(
      (tokenOwnerRecord) =>
        !tokenOwnerRecord.account.governingTokenDepositAmount.isZero() &&
        !voteRecords.some(
          (voteRecord) =>
            voteRecord.account.governingTokenOwner.toBase58() ===
            tokenOwnerRecord.account.governingTokenOwner.toBase58()
        )
    )
    .map((record) =>
      buildResults(
        record.account.governingTokenOwner,
        record.account.governingTokenDepositAmount,
        VoteOption.Undecided,
        maxVote,
        governingTokenMint.decimals
      )
    );

  const noVoteData = voteRecords
    .filter((record) => record.account.getNoVoteWeight()?.isGreaterThan(ZERO))
    .map((record) =>
      buildResults(
        record.account.governingTokenOwner,
        record.account.getNoVoteWeight() as BigNumber,
        VoteOption.No,
        maxVote,
        governingTokenMint.decimals
      )
    );

  const yesVoteData = voteRecords
    .filter((record) => record.account.getYesVoteWeight()?.isGreaterThan(ZERO))
    .map((record) =>
      buildResults(
        record.account.governingTokenOwner,
        record.account.getYesVoteWeight() as BigNumber,
        VoteOption.Yes,
        maxVote,
        governingTokenMint.decimals
      )
    );

  return undecidedData
    .concat(yesVoteData)
    .concat(noVoteData)
    .sort((a, b) => b.votesCast.comparedTo(a.votesCast));
}
