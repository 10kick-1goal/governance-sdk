import type { PublicKey } from '@solana/web3.js';
import type { BigNumber } from 'bignumber.js';
import type BN from 'bn.js';

import { toBigNumber } from '../../utils/toBigNumber';
import { Vote } from '../../vote/Vote';
import { VoteKind } from '../../vote/VoteKind';
import { VoteWeight } from '../../vote/VoteWeight';
import { AccountType } from '../AccountType';

export class VoteRecord {
  accountType: AccountType.VoteRecordV1 | AccountType.VoteRecordV2;
  proposal: PublicKey;
  governingTokenOwner: PublicKey;
  isRelinquished: boolean;

  // V1
  /**
   * @deprecated Use `voterWeight` and `vote` instead
   * @version 1
   */
  voteWeight?: VoteWeight;

  // V2
  voterWeight?: BigNumber;
  vote?: Vote;

  constructor(args: {
    accountType: AccountType.VoteRecordV1 | AccountType.VoteRecordV2;
    proposal: PublicKey;
    governingTokenOwner: PublicKey;
    isRelinquished: boolean;

    // V1
    /**
     * @deprecated Use `voterWeight` and `vote` instead
     * @version 1
     */
    voteWeight?: VoteWeight;
    // V2
    voterWeight?: BigNumber | BN;
    vote?: Vote;
  }) {
    this.accountType = args.accountType;
    this.proposal = args.proposal;
    this.governingTokenOwner = args.governingTokenOwner;
    this.isRelinquished = args.isRelinquished;
    this.voteWeight = args.voteWeight;
    this.voterWeight = toBigNumber(args.voterWeight);
    this.vote = args.vote;
  }

  getNoVoteWeight() {
    switch (this.accountType) {
      case AccountType.VoteRecordV1: {
        return this.voteWeight?.no;
      }
      case AccountType.VoteRecordV2: {
        switch (this.vote?.voteType) {
          case VoteKind.Approve: {
            return undefined;
          }
          case VoteKind.Deny: {
            return this.voterWeight;
          }
          default:
            throw new Error('Invalid voteKind');
        }
      }
      default:
        throw new Error(`Invalid account type ${this.accountType} `);
    }
  }

  getYesVoteWeight() {
    switch (this.accountType) {
      case AccountType.VoteRecordV1: {
        return this.voteWeight?.yes;
      }
      case AccountType.VoteRecordV2: {
        switch (this.vote?.voteType) {
          case VoteKind.Approve: {
            return this.voterWeight;
          }
          case VoteKind.Deny: {
            return undefined;
          }
          default:
            throw new Error('Invalid voteKind');
        }
      }
      default:
        throw new Error(`Invalid account type ${this.accountType} `);
    }
  }
}
