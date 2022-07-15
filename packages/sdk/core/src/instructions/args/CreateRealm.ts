import { Realm } from '../configs/Realm';
import { InstructionType } from '../InstructionType';

export class CreateRealm {
  instruction = InstructionType.CreateRealm;
  configArgs: Realm;
  name: string;

  constructor(args: { name: string; configArgs: Realm }) {
    this.name = args.name;
    this.configArgs = args.configArgs;
  }
}
