import { Connection, PublicKey, MemcmpFilter } from '@solana/web3.js';
import { Schema } from 'borsh';
import bs58 from 'bs58';

import { deserialize } from '../utils/borsh/deserialize';

import { AccountType } from './AccountType';
import { GovernanceAccount } from './GovernanceAccount';

import { ProgramAccount } from './ProgramAccount';

/**
 * Helper function that returns a list of Program Accounts mathcing a set of
 * filters and an account type
 */
export async function getProgramAccounts<Account extends GovernanceAccount>(args: {
  AccountFactory: new (...args: any[]) => Account;
  accountType?: number;
  connection: Connection;
  filters: MemcmpFilter[];
  getSchema: (accountType: AccountType) => Schema;
  programId: PublicKey;
}) {
  const accountType = args.accountType || new args.AccountFactory({}).accountType;
  const rawAccounts = await args.connection.getProgramAccounts(args.programId, {
    commitment: args.connection.commitment,
    filters: [
      {
        memcmp: {
          offset: 0,
          bytes: bs58.encode([accountType]),
        },
      },
      ...args.filters,
    ],
  });
  const accounts = rawAccounts.map((rawAccount) => {
    try {
      const data = rawAccount.account.data;
      const accountType = data[0];

      const account: ProgramAccount<Account> = {
        pubkey: new PublicKey(rawAccount.pubkey),
        account: deserialize(args.getSchema(accountType), args.AccountFactory, data),
        owner: rawAccount.account.owner,
      };

      return [account];
    } catch {
      return [];
    }
  });

  return accounts.flat();
}
