export class VoteChoice {
  rank: number;
  weightPercentage: number;

  constructor(args: { rank: number; weightPercentage: number }) {
    this.rank = args.rank;
    this.weightPercentage = args.weightPercentage;
  }
}
