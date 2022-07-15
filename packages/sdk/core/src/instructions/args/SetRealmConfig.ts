import type { Realm } from '../configs/Realm';
import { InstructionType } from '../InstructionType';

export class SetRealmConfig {
  instruction = InstructionType.SetRealmConfig;
  configArgs: Realm;

  constructor(args: { configArgs: Realm }) {
    this.configArgs = args.configArgs;
  }
}
