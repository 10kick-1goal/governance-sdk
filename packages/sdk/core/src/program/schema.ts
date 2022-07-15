import { createGovernanceSchema } from './createGovernanceSchema';

export const GOVERNANCE_SCHEMA_V1 = createGovernanceSchema(1);
export const GOVERNANCE_SCHEMA_V2 = createGovernanceSchema(2);

// V3 schema is backward compatible with V2
export const GOVERNANCE_SCHEMA_V3 = GOVERNANCE_SCHEMA_V2;

// The most recent version of spl-gov
export const GOVERNANCE_SCHEMA = GOVERNANCE_SCHEMA_V3;
