import type { BigNumber } from 'bignumber.js';
import type BN from 'bn.js';

import { toBigNumber } from '../utils/toBigNumber';

import type { OptionVoteResult } from './OptionVoteResult';

/**
 * A option that can be voted on in a Proposal
 */
export class ProposalOption {
  /**
   * Text representing the option
   */
  label: string;
  /**
   * The total number of transactions in the option
   */
  transactionsCount: number;
  /**
   * The number of transations that have already been executed
   */
  transactionsExecutedCount: number;
  /**
   * Which transaction will be executed next
   */
  transactionsNextIndex: number;
  /**
   * Whether the option has passed
   */
  voteResult: OptionVoteResult;
  /**
   * How much has been voted on the Option
   */
  voteWeight: BigNumber;

  constructor(args: {
    label: string;
    transactionsCount: number;
    transactionsExecutedCount: number;
    transactionsNextIndex: number;
    voteResult: OptionVoteResult;
    voteWeight: BigNumber | BN;
  }) {
    this.label = args.label;
    this.transactionsCount = args.transactionsCount;
    this.transactionsExecutedCount = args.transactionsExecutedCount;
    this.transactionsNextIndex = args.transactionsNextIndex;
    this.voteResult = args.voteResult;
    this.voteWeight = toBigNumber(args.voteWeight);
  }
}
