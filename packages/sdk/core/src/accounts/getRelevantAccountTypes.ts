import { AccountType } from './AccountType';
import { GovernanceAccount } from './GovernanceAccount';
import * as models from './models/index';

/**
 * Helper function that returns the account types supported by a Account class
 */
export function getRelevantAccountTypes(account: new (...args: any[]) => GovernanceAccount) {
  switch (account) {
    case models.SignatoryRecord:
      return [AccountType.SignatoryRecordV1, AccountType.SignatoryRecordV2];
    case models.TokenOwnerRecord:
      return [AccountType.TokenOwnerRecordV1, AccountType.TokenOwnerRecordV2];
    case models.VoteRecord:
      return [AccountType.VoteRecordV1, AccountType.VoteRecordV2];
    default:
      throw new Error('Invalid account type');
  }
}
