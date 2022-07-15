import { Governance } from '../configs/Governance';
import { InstructionType } from '../InstructionType';

export class CreateGovernance {
  instruction = InstructionType.CreateGovernance;
  /**
   * The configuration for the new Governance
   */
  config: Governance;

  constructor(args: { config: Governance }) {
    this.config = args.config;
  }
}
