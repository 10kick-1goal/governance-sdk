import type { PublicKey } from '@solana/web3.js';

import { AccountType } from '../AccountType';

export class RealmConfig {
  accountType = AccountType.RealmConfig;
  realm: PublicKey;
  communityVoterWeightAddin?: PublicKey;
  maxCommunityVoterWeightAddin?: PublicKey;

  constructor(args: {
    realm: PublicKey;
    communityVoterWeightAddin?: PublicKey;
    maxCommunityVoterWeightAddin?: PublicKey;
  }) {
    this.realm = args.realm;
    this.communityVoterWeightAddin = args.communityVoterWeightAddin;
    this.maxCommunityVoterWeightAddin = args.maxCommunityVoterWeightAddin;
  }
}
