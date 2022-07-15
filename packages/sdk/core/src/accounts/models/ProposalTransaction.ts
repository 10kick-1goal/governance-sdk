import type { PublicKey } from '@solana/web3.js';
import type { BigNumber } from 'bignumber.js';
import type BN from 'bn.js';

import { InstructionData } from '../../instructions/InstructionData';
import { InstructionExecutionStatus } from '../../instructions/InstructionExecutionStatus';
import { toBigNumber } from '../../utils/toBigNumber';
import { AccountType } from '../AccountType';

export class ProposalTransaction {
  accountType: AccountType;
  executedAt: BigNumber | null;
  executionStatus: InstructionExecutionStatus;
  holdUpTime: number;
  instructionIndex: number;
  proposal: PublicKey;

  // V1
  instruction: InstructionData;

  // V2
  optionIndex: number;
  instructions: InstructionData[];

  constructor(args: {
    accountType: AccountType;
    proposal: PublicKey;
    instructionIndex: number;
    optionIndex: number;
    holdUpTime: number;
    instruction: InstructionData;
    executedAt: BigNumber | BN | null;
    executionStatus: InstructionExecutionStatus;
    instructions: InstructionData[];
  }) {
    this.accountType = args.accountType;
    this.proposal = args.proposal;
    this.instructionIndex = args.instructionIndex;
    this.optionIndex = args.optionIndex;
    this.holdUpTime = args.holdUpTime;
    this.instruction = args.instruction;
    this.executedAt = toBigNumber(args.executedAt);
    this.executionStatus = args.executionStatus;
    this.instructions = args.instructions;
  }

  getSingleInstruction() {
    if (this.accountType === AccountType.ProposalInstructionV1) {
      return this.instruction;
    }

    if (this.instructions.length === 0) {
      throw new Error(`Transaction has no instructions`);
    }
    if (this.instructions.length > 1) {
      throw new Error(`Transaction has multiple instructions`);
    }

    return this.instructions[0];
  }

  getAllInstructions() {
    if (this.accountType === AccountType.ProposalInstructionV1) {
      return [this.instruction];
    }

    return this.instructions;
  }
}
