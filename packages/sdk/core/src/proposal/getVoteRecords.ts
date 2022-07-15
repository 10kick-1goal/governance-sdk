import type { Connection, PublicKey } from '@solana/web3.js';

import { getAccountsByFilters } from '../accounts/getAccountsByFilters';
import { VoteRecord } from '../accounts/models/VoteRecord';
import { createFilterFromPublicKey } from '../filters/createFilterFromPublicKey';

interface Args {
  connection: Connection;
  proposal: PublicKey;
  programId: PublicKey;
}

export async function getVoteRecords({ connection, programId, proposal }: Args) {
  const filter = createFilterFromPublicKey(1, proposal);

  return getAccountsByFilters({
    connection,
    programId,
    accountClass: VoteRecord,
    filters: [filter],
  });
}
