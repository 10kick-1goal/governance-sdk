import { Schema, BinaryReader, BorshError } from 'borsh';

import { capitalize } from '../capitalize';

import { deserializeStruct } from './deserializeStruct';

export function deserializeField(
  schema: Schema,
  fieldName: string,
  fieldType: any,
  reader: BinaryReader
): any {
  try {
    if (typeof fieldType === 'string') {
      return (reader as any)[`read${capitalize(fieldType)}`]();
    }

    if (fieldType instanceof Array) {
      if (typeof fieldType[0] === 'number') {
        return reader.readFixedArray(fieldType[0]);
      }

      return reader.readArray(() => deserializeField(schema, fieldName, fieldType[0], reader));
    }

    if (fieldType.kind === 'option') {
      const option = reader.readU8();
      if (option) {
        return deserializeField(schema, fieldName, fieldType.type, reader);
      }

      return undefined;
    }

    return deserializeStruct(schema, fieldType, reader);
  } catch (error) {
    if (error instanceof BorshError) {
      error.addToFieldPath(fieldName);
    }
    throw error;
  }
}
