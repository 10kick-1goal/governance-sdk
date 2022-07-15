import type { PublicKey } from '@solana/web3.js';
import type { BigNumber } from 'bignumber.js';
import type BN from 'bn.js';

import type { MintMaxVoteWeightSource } from '../mint/MintMaxVoteWeightSource';
import { toBigNumber } from '../utils/toBigNumber';

export class RealmConfig {
  councilMint?: PublicKey;
  communityMintMaxVoteWeightSource: MintMaxVoteWeightSource;
  minCommunityTokensToCreateGovernance: BigNumber;
  useCommunityVoterWeightAddin: boolean;
  useMaxCommunityVoterWeightAddin: boolean;
  reserved: Uint8Array;

  constructor(args: {
    councilMint?: PublicKey;
    communityMintMaxVoteWeightSource: MintMaxVoteWeightSource;
    minCommunityTokensToCreateGovernance: BigNumber | BN;
    reserved: Uint8Array;
    useCommunityVoterWeightAddin: boolean;
    useMaxCommunityVoterWeightAddin: boolean;
  }) {
    this.councilMint = args.councilMint;
    this.communityMintMaxVoteWeightSource = args.communityMintMaxVoteWeightSource;
    this.minCommunityTokensToCreateGovernance = toBigNumber(
      args.minCommunityTokensToCreateGovernance
    );
    this.useCommunityVoterWeightAddin = !!args.useCommunityVoterWeightAddin;
    this.useMaxCommunityVoterWeightAddin = !!args.useMaxCommunityVoterWeightAddin;
    this.reserved = args.reserved;
  }
}
