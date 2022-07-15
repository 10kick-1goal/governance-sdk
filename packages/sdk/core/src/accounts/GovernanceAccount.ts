import * as models from './models/index';

/**
 * A union of possible account classes that are relevant to governance
 */
export type GovernanceAccount =
  | models.Governance
  | models.ProgramMetadata
  | models.Proposal
  | models.ProposalTransaction
  | models.Realm
  | models.RealmConfig
  | models.SignatoryRecord
  | models.TokenOwnerRecord
  | models.VoteRecord;
