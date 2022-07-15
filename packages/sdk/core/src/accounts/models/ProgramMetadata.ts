import type { BigNumber } from 'bignumber.js';
import type BN from 'bn.js';

import { toBigNumber } from '../../utils/toBigNumber';
import { AccountType } from '../AccountType';

/**
 * Metadata for the SPL Governance Program
 */
export class ProgramMetadata {
  accountType = AccountType.ProgramMetadata;
  /**
   * Extra reserved space
   * @ignore
   */
  reserved: Uint8Array;
  /**
   * UNIX timestamp representing when the metadata was last updated
   */
  updatedAt: BigNumber;
  /**
   * The Program version
   */
  version: string;

  constructor(args: { reserved: Uint8Array; updatedAt: BigNumber | BN; version: string }) {
    this.reserved = args.reserved;
    this.updatedAt = toBigNumber(args.updatedAt);
    this.version = args.version;
  }
}
