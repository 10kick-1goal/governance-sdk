import type { PublicKey } from '@solana/web3.js';

import { Governance as GovernanceConfig } from '../../instructions/configs/Governance';
import { AccountType } from '../AccountType';

/**
 * Primitive that defines voting rules, ie. quorum, thresholds, voting rights
 */
export class Governance {
  accountType: AccountType;
  /**
   * The specific rules that apply to the Governance
   */
  config: GovernanceConfig;
  /**
   * The account that the Governance's rules apply to
   * @deprecated
   */
  governedAccount: PublicKey;
  /**
   * Running number of proposals belonging to the Governance
   */
  proposalCount: number;
  /**
   * The DAO that owns this Governance
   */
  realm: PublicKey;
  /**
   * Extra unused reserved space
   */
  reserved?: Uint8Array;
  /**
   * Running number of proposals in a voting state belonging to the Governance
   */
  votingProposalCount: number;

  constructor(args: {
    accountType: number;
    config: GovernanceConfig;
    governedAccount: PublicKey;
    proposalCount: number;
    realm: PublicKey;
    reserved?: Uint8Array;
    votingProposalCount: number;
  }) {
    this.accountType = args.accountType;
    this.config = args.config;
    this.governedAccount = args.governedAccount;
    this.proposalCount = args.proposalCount;
    this.realm = args.realm;
    this.reserved = args.reserved;
    this.votingProposalCount = args.votingProposalCount;
  }

  isProgramGovernance() {
    return (
      this.accountType === AccountType.ProgramGovernanceV1 ||
      this.accountType === AccountType.ProgramGovernanceV2
    );
  }

  isAccountGovernance() {
    return (
      this.accountType === AccountType.GovernanceV1 || this.accountType === AccountType.GovernanceV2
    );
  }

  isMintGovernance() {
    return (
      this.accountType === AccountType.MintGovernanceV1 ||
      this.accountType === AccountType.MintGovernanceV2
    );
  }

  isTokenGovernance() {
    return (
      this.accountType === AccountType.TokenGovernanceV1 ||
      this.accountType === AccountType.TokenGovernanceV2
    );
  }
}
