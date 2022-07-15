export const GOVERNANCE_PROGRAM_SEED = 'governance' as const;

export const PROGRAM_VERSION_V1 = 1 as const;
export const PROGRAM_VERSION_V2 = 2 as const;
export const PROGRAM_VERSION_V3 = 3 as const;

// The most up to date program version
export const PROGRAM_VERSION = PROGRAM_VERSION_V3;

export type ProgramVersion =
  | typeof PROGRAM_VERSION_V1
  | typeof PROGRAM_VERSION_V2
  | typeof PROGRAM_VERSION_V3
  | typeof PROGRAM_VERSION;
