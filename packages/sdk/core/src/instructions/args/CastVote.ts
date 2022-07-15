import { Vote } from '../../vote/Vote';
import { YesNoVote } from '../../vote/YesNoVote';
import { InstructionType } from '../InstructionType';

export class CastVote {
  instruction = InstructionType.CastVote;
  /**
   * The vote value
   * @deprecated
   */
  yesNoVote?: YesNoVote;
  /**
   * The vote value
   */
  vote?: Vote;

  constructor(args: { yesNoVote?: YesNoVote; vote?: Vote }) {
    this.yesNoVote = args.yesNoVote;
    this.vote = args.vote;
  }
}
