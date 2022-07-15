import { Governance } from '../configs/Governance';
import { InstructionType } from '../InstructionType';

export class SetGovernanceConfig {
  instruction = InstructionType.SetGovernanceConfig;
  config: Governance;

  constructor(args: { config: Governance }) {
    this.config = args.config;
  }
}
