export enum VoteThresholdType {
  // Approval Quorum
  YesVotePercentage = 0,
  // Not supported in the current version
  QuorumPercentage = 1,
  // Supported for VERSION >= 3
  Disabled = 2,
}
