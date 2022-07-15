import { getGovernanceSchema as getProgramGovernanceSchema } from '../program/getGovernanceSchema';

import { AccountType } from './AccountType';

import { getProgramVersion } from './getProgramVersion';

/**
 * Returns the scheme for an account type
 */
export function getGovernanceSchema(accountType: AccountType) {
  return getProgramGovernanceSchema(getProgramVersion(accountType));
}
