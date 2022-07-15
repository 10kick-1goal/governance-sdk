import type { PublicKey } from '@solana/web3.js';
import type { BigNumber } from 'bignumber.js';
import type BN from 'bn.js';

import { toBigNumber } from '../../utils/toBigNumber';
import { AccountType } from '../AccountType';

/**
 * Represents membership within a DAO voting population, aka the entity that votes.
 */
export class TokenOwnerRecord {
  accountType = AccountType.TokenOwnerRecordV1;
  /**
   * Any wallet that can vote on behalf of the TokenOwnerRecord
   */
  governanceDelegate?: PublicKey;
  /**
   * Governance power in a default setup
   */
  governingTokenDepositAmount: BigNumber;
  /**
   * The voting population the TokenOwnerRecord belongs to, ie: community or council
   */
  governingTokenMint: PublicKey;
  /**
   * The wallet that owns this record
   */
  governingTokenOwner: PublicKey;
  /**
   * Number of proposals this record has created that are in the Draft or Voting states
   */
  outstandingProposalCount: number;
  /**
   * The DAO the record belongs to
   */
  realm: PublicKey;
  /**
   *
   */
  reserved: Uint8Array;
  /**
   * How many votes were cast by this record
   */
  totalVotesCount: number;
  /**
   * Number of tokens "locked" due to voting
   */
  unrelinquishedVotesCount: number;

  constructor(args: {
    governanceDelegate?: PublicKey;
    governingTokenDepositAmount: BigNumber | BN;
    governingTokenMint: PublicKey;
    governingTokenOwner: PublicKey;
    outstandingProposalCount: number;
    realm: PublicKey;
    reserved: Uint8Array;
    totalVotesCount: number;
    unrelinquishedVotesCount: number;
  }) {
    this.governanceDelegate = args.governanceDelegate;
    this.governingTokenDepositAmount = toBigNumber(args.governingTokenDepositAmount);
    this.governingTokenMint = args.governingTokenMint;
    this.governingTokenOwner = args.governingTokenOwner;
    this.outstandingProposalCount = args.outstandingProposalCount;
    this.realm = args.realm;
    this.reserved = args.reserved;
    this.totalVotesCount = args.totalVotesCount;
    this.unrelinquishedVotesCount = args.unrelinquishedVotesCount;
  }
}
