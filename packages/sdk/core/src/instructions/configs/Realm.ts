import type { BigNumber } from 'bignumber.js';
import type BN from 'bn.js';

import { MintMaxVoteWeightSource } from '../../mint/MintMaxVoteWeightSource';
import { toBigNumber } from '../../utils/toBigNumber';

export class Realm {
  useCouncilMint: boolean;
  communityMintMaxVoteWeightSource: MintMaxVoteWeightSource;
  minCommunityTokensToCreateGovernance: BigNumber;

  // Versions >= 2
  useCommunityVoterWeightAddin: boolean;
  useMaxCommunityVoterWeightAddin: boolean;

  constructor(args: {
    useCouncilMint: boolean;
    minCommunityTokensToCreateGovernance: BigNumber | BN;
    communityMintMaxVoteWeightSource: MintMaxVoteWeightSource;
    useCommunityVoterWeightAddin: boolean;
    useMaxCommunityVoterWeightAddin: boolean;
  }) {
    this.useCouncilMint = !!args.useCouncilMint;
    this.communityMintMaxVoteWeightSource = args.communityMintMaxVoteWeightSource;
    this.minCommunityTokensToCreateGovernance = toBigNumber(
      args.minCommunityTokensToCreateGovernance
    );
    this.useCommunityVoterWeightAddin = args.useCommunityVoterWeightAddin;
    this.useMaxCommunityVoterWeightAddin = args.useMaxCommunityVoterWeightAddin;
  }
}
