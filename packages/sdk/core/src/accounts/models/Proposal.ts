import type { PublicKey } from '@solana/web3.js';
import type { BigNumber } from 'bignumber.js';
import type BN from 'bn.js';

import { InstructionExecutionFlag } from '../../instructions/InstructionExecutionFlag';
import { ProposalOption } from '../../proposal/ProposalOption';
import { ProposalState } from '../../proposal/ProposalState';
import { toBigNumber } from '../../utils/toBigNumber';
import { VoteThreshold } from '../../vote/VoteThreshold';
import { VoteType } from '../../vote/VoteType';
import { AccountType } from '../AccountType';

import { Governance } from './Governance';
import { TokenOwnerRecord } from './TokenOwnerRecord';

/**
 * An SPL-Governance Proposal
 */
export class Proposal {
  accountType: AccountType;
  /**
   * The total vote weight of those that explicitly voted "abstain"
   */
  abstainVoteWeight?: BigNumber;
  /**
   * UNIX timestamp representing when the proposal enters either a "complete" or "cancelled" state
   */
  closedAt: BigNumber | null;
  /**
   * The total vote weight denying any of the proposal options
   */
  denyVoteWeight?: BigNumber;
  /**
   * URL for additional Proposal description
   */
  descriptionLink: string;
  /**
   * UNIX timestamp representing when the Proposal was created
   */
  draftAt: BigNumber;
  /**
   * UNIX timestamp representing when the proposal began execution
   */
  executingAt: BigNumber | null;
  /**
   * @ignore
   */
  executionFlags: InstructionExecutionFlag;
  /**
   * Governance the Proposal belongs to
   */
  governance: PublicKey;
  /**
   * The Token that represents the voting population for the Proposal, ex: coucil or community
   */
  governingTokenMint: PublicKey;
  /**
   * The maximum vote weight at the time the proposal ends
   */
  maxVoteWeight: BigNumber | null;
  /**
   * How long the vote will run for, in seconds
   */
  maxVotingTime: number | null;
  /**
   * A title for the Proposal
   */
  name: string;
  /**
   * A list of choices for the Proposal
   */
  options: ProposalOption[];
  /**
   * The number of signatories associated with the Proposal
   */
  signatoriesCount: number;
  /**
   * The number of signatories that signed off on the Proposal
   */
  signatoriesSignedOffCount: number;
  /**
   * UNIX timestamp when the first signatory signed
   */
  signingOffAt: BigNumber | null;
  /**
   * UNIX timestamp representing when voting *should* start
   */
  startVotingAt: BigNumber | null;
  /**
   * The current state of the Proposal
   */
  state: ProposalState;
  /**
   * The TokenOwnerRecord that created the Proposal
   */
  tokenOwnerRecord: PublicKey;
  /**
   * The total vote weight by those with veto power
   */
  vetoVoteWeight?: BigNumber;
  /**
   * The vote threshold at the time the proposal ends
   */
  voteThreshold?: VoteThreshold | null;
  /**
   * Which voting type is used for the Proposal, ie "single-choice", "multiple-choice"
   */
  voteType: VoteType;
  /**
   * UNIX timestamp representing when the voting began
   */
  votingAt: BigNumber | null;
  /**
   * HashBlock "timestamp" representing when the voting began
   */
  votingAtSlot: BigNumber | null;
  /**
   * UNIX timestamp representing when the voting ended
   */
  votingCompletedAt: BigNumber | null;
  /**
   * Number of instructions in the Proposal
   * @deprecated v1, no longer in use
   */
  instructionsCount: number;
  /**
   * The number of the Proposal's isntructions that have been executed
   * @deprecated v1, no longer in use
   */
  instructionsExecutedCount: number;
  /**
   * The next instruction to be executed
   * @deprecated v1, no longer in use
   */
  instructionsNextIndex: number;
  /**
   * Number of "no" votes on the Proposal
   * @deprecated v1, no longer in use
   */
  noVotesCount: BigNumber;
  /**
   * Number of "yes" votes on the Proposal
   * @deprecated v1, no longer in use
   */
  yesVotesCount: BigNumber;

  constructor(args: {
    abstainVoteWeight?: BigNumber | BN;
    accountType: AccountType;
    closedAt: BigNumber | BN | null;
    denyVoteWeight?: BigNumber | BN;
    descriptionLink: string;
    draftAt: BigNumber | BN;
    executingAt: BigNumber | BN | null;
    executionFlags: InstructionExecutionFlag;
    governance: PublicKey;
    governingTokenMint: PublicKey;
    maxVoteWeight: BigNumber | BN | null;
    maxVotingTime: number | null;
    name: string;
    options: ProposalOption[];
    signatoriesCount: number;
    signatoriesSignedOffCount: number;
    signingOffAt: BigNumber | BN | null;
    startVotingAt: BigNumber | BN | null;
    state: ProposalState;
    tokenOwnerRecord: PublicKey;
    vetoVoteWeight?: BigNumber | BN;
    voteThreshold: VoteThreshold | null;
    voteType: VoteType;
    votingAt: BigNumber | BN | null;
    votingAtSlot: BigNumber | BN | null;
    votingCompletedAt: BigNumber | BN | null;
    // DEPRECATED
    instructionsCount: number;
    instructionsExecutedCount: number;
    instructionsNextIndex: number;
    noVotesCount: BigNumber | BN;
    yesVotesCount: BigNumber | BN;
  }) {
    this.abstainVoteWeight = toBigNumber(args.abstainVoteWeight);
    this.accountType = args.accountType;
    this.closedAt = toBigNumber(args.closedAt);
    this.denyVoteWeight = toBigNumber(args.denyVoteWeight);
    this.descriptionLink = args.descriptionLink;
    this.draftAt = toBigNumber(args.draftAt);
    this.executingAt = toBigNumber(args.executingAt);
    this.executionFlags = args.executionFlags;
    this.governance = args.governance;
    this.governingTokenMint = args.governingTokenMint;
    this.instructionsCount = args.instructionsCount;
    this.instructionsExecutedCount = args.instructionsExecutedCount;
    this.instructionsNextIndex = args.instructionsNextIndex;
    this.maxVoteWeight = toBigNumber(args.maxVoteWeight);
    this.maxVotingTime = args.maxVotingTime;
    this.name = args.name;
    this.noVotesCount = toBigNumber(args.noVotesCount);
    this.options = args.options;
    this.signatoriesCount = args.signatoriesCount;
    this.signatoriesSignedOffCount = args.signatoriesSignedOffCount;
    this.signingOffAt = toBigNumber(args.signingOffAt);
    this.startVotingAt = toBigNumber(args.startVotingAt);
    this.state = args.state;
    this.tokenOwnerRecord = args.tokenOwnerRecord;
    this.vetoVoteWeight = toBigNumber(args.vetoVoteWeight);
    this.voteThreshold = args.voteThreshold;
    this.voteType = args.voteType;
    this.votingAt = toBigNumber(args.votingAt);
    this.votingAtSlot = toBigNumber(args.votingAtSlot);
    this.votingCompletedAt = toBigNumber(args.votingCompletedAt);
    this.yesVotesCount = toBigNumber(args.yesVotesCount);
  }

  /// Returns true if Proposal is in state when no voting can happen any longer
  isVoteFinalized(): boolean {
    switch (this.state) {
      case ProposalState.Succeeded:
      case ProposalState.Executing:
      case ProposalState.Completed:
      case ProposalState.Cancelled:
      case ProposalState.Defeated:
      case ProposalState.ExecutingWithErrors:
        return true;
      case ProposalState.Draft:
      case ProposalState.SigningOff:
      case ProposalState.Voting:
        return false;
    }
  }

  isFinalState(): boolean {
    // 1) ExecutingWithErrors is not really a final state, it's undefined.
    //    However it usually indicates none recoverable execution error so we treat is as final for the ui purposes
    // 2) Succeeded with no instructions is also treated as final since it can't transition any longer
    //    It really doesn't make any sense but until it's solved in the program we have to consider it as final in the ui
    switch (this.state) {
      case ProposalState.Completed:
      case ProposalState.Cancelled:
      case ProposalState.Defeated:
      case ProposalState.ExecutingWithErrors:
        return true;
      case ProposalState.Succeeded:
        return this.instructionsCount === 0;
      case ProposalState.Executing:
      case ProposalState.Draft:
      case ProposalState.SigningOff:
      case ProposalState.Voting:
        return false;
    }
  }

  getStateTimestamp(): number {
    switch (this.state) {
      case ProposalState.Succeeded:
      case ProposalState.Defeated:
        return this.votingCompletedAt ? this.votingCompletedAt.toNumber() : 0;
      case ProposalState.Completed:
      case ProposalState.Cancelled:
        return this.closedAt ? this.closedAt.toNumber() : 0;
      case ProposalState.Executing:
      case ProposalState.ExecutingWithErrors:
        return this.executingAt ? this.executingAt.toNumber() : 0;
      case ProposalState.Draft:
        return this.draftAt.toNumber();
      case ProposalState.SigningOff:
        return this.signingOffAt ? this.signingOffAt.toNumber() : 0;
      case ProposalState.Voting:
        return this.votingAt ? this.votingAt.toNumber() : 0;
    }
  }

  getStateSortRank(): number {
    // Always show proposals in voting state at the top
    if (this.state === ProposalState.Voting) {
      return 2;
    }
    // Then show proposals in pending state and finalized at the end
    return this.isFinalState() ? 0 : 1;
  }

  /// Returns true if Proposal has not been voted on yet
  isPreVotingState() {
    return !this.votingAtSlot;
  }

  getYesVoteOption() {
    if (this.options.length !== 1 && !this.voteType.isSingleChoice()) {
      throw new Error('Proposal is not Yes/No vote');
    }

    return this.options[0];
  }

  getYesVoteCount() {
    switch (this.accountType) {
      case AccountType.ProposalV1:
        return this.yesVotesCount;
      case AccountType.ProposalV2:
        return this.getYesVoteOption().voteWeight;
      default:
        throw new Error(`Invalid account type ${this.accountType}`);
    }
  }

  getNoVoteCount() {
    switch (this.accountType) {
      case AccountType.ProposalV1:
        return this.noVotesCount;
      case AccountType.ProposalV2:
        return this.denyVoteWeight as BigNumber;
      default:
        throw new Error(`Invalid account type ${this.accountType}`);
    }
  }

  getTimeToVoteEnd(governance: Governance) {
    const unixTimestampInSeconds = Date.now() / 1000;

    return this.isPreVotingState()
      ? governance.config.maxVotingTime
      : (this.votingAt?.toNumber() ?? 0) + governance.config.maxVotingTime - unixTimestampInSeconds;
  }

  hasVoteTimeEnded(governance: Governance) {
    return this.getTimeToVoteEnd(governance) <= 0;
  }

  canCancel(governance: Governance) {
    if (this.state === ProposalState.Draft || this.state === ProposalState.SigningOff) {
      return true;
    }

    if (this.state === ProposalState.Voting && !this.hasVoteTimeEnded(governance)) {
      return true;
    }

    return false;
  }

  canWalletCancel(governance: Governance, proposalOwner: TokenOwnerRecord, walletPk: PublicKey) {
    if (!this.canCancel(governance)) {
      return false;
    }
    return (
      proposalOwner.governingTokenOwner.equals(walletPk) ||
      proposalOwner.governanceDelegate?.equals(walletPk)
    );
  }
}
