import type { Connection, PublicKey } from '@solana/web3.js';

import { getAccountsByFilters } from '../accounts/getAccountsByFilters';
import { TokenOwnerRecord } from '../accounts/models/TokenOwnerRecord';
import { createFilterFromPublicKey } from '../filters/createFilterFromPublicKey';

interface Args {
  connection: Connection;
  governingTokenMint: PublicKey;
  programId: PublicKey;
  realm: PublicKey;
}

export async function getTokenOwnerRecords({
  connection,
  governingTokenMint,
  programId,
  realm,
}: Args) {
  const realmFilter = createFilterFromPublicKey(1, realm);
  const mintFilter = createFilterFromPublicKey(1 + 32, governingTokenMint);

  return getAccountsByFilters({
    connection,
    programId,
    accountClass: TokenOwnerRecord,
    filters: [realmFilter, mintFilter],
  });
}
