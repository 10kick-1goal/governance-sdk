import type { Connection, PublicKey } from '@solana/web3.js';
import type { BigNumber } from 'bignumber.js';
import type BN from 'bn.js';

import { Proposal } from '../accounts/models/Proposal';
import { Realm } from '../accounts/models/Realm';
import { ProgramAccount } from '../accounts/ProgramAccount';

import { buildTopVoters } from './buildTopVoters';
import { getTokenOwnerRecords } from './getTokenOwnerRecords';
import { getVoteRecords } from './getVoteRecords';

interface Mint {
  supply: BN | BigNumber | bigint;
  decimals: number;
  mintAuthority: PublicKey;
}

interface Args {
  connection: Connection;
  governingTokenMint: Mint;
  programId: PublicKey;
  proposal: ProgramAccount<Proposal>;
  realm: ProgramAccount<Realm>;
}

export async function getVoteBreakdown({
  connection,
  governingTokenMint,
  programId,
  proposal,
  realm,
}: Args) {
  const [tokenOnwnerRecords, voteRecords] = await Promise.all([
    getTokenOwnerRecords({
      connection,
      programId,
      realm: realm.pubkey,
      governingTokenMint: governingTokenMint.mintAuthority,
    }),
    getVoteRecords({
      connection,
      programId,
      proposal: proposal.pubkey,
    }),
  ]);

  return buildTopVoters(
    Object.values(voteRecords),
    Object.values(tokenOnwnerRecords),
    realm,
    proposal,
    governingTokenMint
  );
}
