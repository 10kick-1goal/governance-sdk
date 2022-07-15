import { Connection, PublicKey, MemcmpFilter } from '@solana/web3.js';

import { AccountType } from './AccountType';
import { getGovernanceSchema } from './getGovernanceSchema';
import { getProgramAccounts } from './getProgramAccounts';
import { getRelevantAccountTypes } from './getRelevantAccountTypes';
import { GovernanceAccount } from './GovernanceAccount';
import { ProgramAccount } from './ProgramAccount';

interface Args<A extends { accountType: AccountType }> {
  accountClass: new (...args: any[]) => A;
  connection: Connection;
  filters: MemcmpFilter[];
  programId: PublicKey;
}

/**
 * Fetch a list of accounts that match a set of filters
 */
export async function getAccountsByFilters<A extends GovernanceAccount>({
  accountClass,
  connection,
  filters,
  programId,
}: Args<A>) {
  const accountTypes = getRelevantAccountTypes(accountClass);
  const accounts = await Promise.all(
    accountTypes.map((accountType) =>
      getProgramAccounts<A>({
        connection,
        programId,
        accountType,
        getSchema: (at) => getGovernanceSchema(at),
        AccountFactory: accountClass,
        filters,
      }).catch((error) => {
        console.error(error);
        return [];
      })
    )
  );
  const flattenedAccounts = accounts.flat();
  const accountsDict = flattenedAccounts.reduce((acc, account) => {
    acc[account.pubkey.toBase58()] = account;
    return acc;
  }, {} as { [address: string]: ProgramAccount<A> });

  return accountsDict;
}
