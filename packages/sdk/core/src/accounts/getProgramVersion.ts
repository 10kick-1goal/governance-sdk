import { PROGRAM_VERSION_V1, PROGRAM_VERSION_V2 } from '../constants';

import { AccountType } from './AccountType';

/**
 * Return the program version that supports a given account type
 */
export function getProgramVersion(accountType: AccountType) {
  switch (accountType) {
    case AccountType.VoteRecordV2:
    case AccountType.ProposalTransactionV2:
    case AccountType.ProposalV2:
      return PROGRAM_VERSION_V2;
    default:
      return PROGRAM_VERSION_V1;
  }
}
