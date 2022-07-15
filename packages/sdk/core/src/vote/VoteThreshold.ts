import { VoteThresholdType } from './VoteThresholdType';

export class VoteThreshold {
  type: VoteThresholdType;
  value: number | undefined;

  constructor(args: { type: VoteThresholdType; value?: number | undefined }) {
    this.type = args.type;
    this.value = args.value;
  }
}
