import { Schema, BinaryReader } from 'borsh';

import { deserializeStruct } from './deserializeStruct';

export function deserialize(schema: Schema, classType: any, buffer: Buffer): any {
  const reader = new BinaryReader(buffer);
  return deserializeStruct(schema, classType, reader);
}
