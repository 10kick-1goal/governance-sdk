import type { PublicKey } from '@solana/web3.js';

import type { VoteType } from '../../vote/VoteType';
import { InstructionType } from '../InstructionType';

export class CreateProposal {
  instruction = InstructionType.CreateProposal;
  /**
   * Title of the new proposal
   */
  name: string;
  /**
   * URL for additional Proposal description
   */
  descriptionLink: string;
  /**
   * Which voting type is used for the Proposal, ie "single-choice", "multiple-choice"
   */
  voteType: VoteType;
  /**
   * A list of choices for the Proposal
   */
  options: string[];
  /**
   *
   */
  useDenyOption: boolean;
  /**
   * The Token that represents the voting population for the Proposal, ex: coucil or community
   * @deprecated
   */
  governingTokenMint: PublicKey;

  constructor(args: {
    name: string;
    descriptionLink: string;
    governingTokenMint: PublicKey;
    voteType: VoteType;
    options: string[];
    useDenyOption: boolean;
  }) {
    this.name = args.name;
    this.descriptionLink = args.descriptionLink;
    this.governingTokenMint = args.governingTokenMint;
    this.voteType = args.voteType;
    this.options = args.options;
    this.useDenyOption = args.useDenyOption;
  }
}
