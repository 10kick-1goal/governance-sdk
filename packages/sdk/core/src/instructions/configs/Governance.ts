import type { BigNumber } from 'bignumber.js';
import type BN from 'bn.js';

import { toBigNumber } from '../../utils/toBigNumber';
import { VoteThreshold } from '../../vote/VoteThreshold';
import { VoteTipping } from '../../vote/VoteTipping';

export class Governance {
  communityVoteThreshold: VoteThreshold;
  minCommunityTokensToCreateProposal: BigNumber;
  minInstructionHoldUpTime: number;
  maxVotingTime: number;
  voteTipping: VoteTipping;
  minCouncilTokensToCreateProposal: BigNumber;

  // VERSION >= 3
  councilVoteThreshold: VoteThreshold;
  reserved = [0, 0];

  constructor(args: {
    communityVoteThreshold: VoteThreshold;
    minCommunityTokensToCreateProposal: BigNumber | BN;
    minInstructionHoldUpTime: number;
    maxVotingTime: number;
    voteTipping?: VoteTipping;
    minCouncilTokensToCreateProposal: BigNumber | BN;

    // VERSION >= 3
    // For versions < 3 must be set to YesVotePercentage(0)
    councilVoteThreshold: VoteThreshold;
  }) {
    this.communityVoteThreshold = args.communityVoteThreshold;
    this.minCommunityTokensToCreateProposal = toBigNumber(args.minCommunityTokensToCreateProposal);
    this.minInstructionHoldUpTime = args.minInstructionHoldUpTime;
    this.maxVotingTime = args.maxVotingTime;
    this.voteTipping = args.voteTipping ?? VoteTipping.Strict;
    this.minCouncilTokensToCreateProposal = toBigNumber(args.minCouncilTokensToCreateProposal);

    // VERSION >= 3
    this.councilVoteThreshold = args.councilVoteThreshold;
  }
}
