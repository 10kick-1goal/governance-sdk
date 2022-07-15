import { VoteChoice } from './VoteChoice';
import { VoteKind } from './VoteKind';
import { YesNoVote } from './YesNoVote';

export class Vote {
  voteType: VoteKind;
  approveChoices?: VoteChoice[];
  deny?: boolean;

  static fromYesNoVote(yesNoVote: YesNoVote) {
    switch (yesNoVote) {
      case YesNoVote.Yes: {
        return new Vote({
          voteType: VoteKind.Approve,
          approveChoices: [new VoteChoice({ rank: 0, weightPercentage: 100 })],
          deny: undefined,
        });
      }
      case YesNoVote.No: {
        return new Vote({
          voteType: VoteKind.Deny,
          approveChoices: undefined,
          deny: true,
        });
      }
    }
  }

  constructor(args: { voteType: VoteKind; approveChoices?: VoteChoice[]; deny?: boolean }) {
    this.voteType = args.voteType;
    this.approveChoices = args.approveChoices;
    this.deny = args.deny;
  }

  toYesNoVote() {
    switch (this.voteType) {
      case VoteKind.Deny: {
        return YesNoVote.No;
      }
      case VoteKind.Approve: {
        return YesNoVote.Yes;
      }
    }
  }
}
