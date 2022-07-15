import { createTailwindMerge } from 'tailwind-merge';

type ClassValue = string | null | false | undefined;

export const merge = createTailwindMerge(() => ({
  cacheSize: 500,
  prefix: 'rui-',
  theme: {},
  classGroups: {},
  conflictingClassGroups: {},
}));

/**
 * Converts a variadic list of tailwind classes into a flat
 */
export function cx(...classes: ClassValue[]) {
  return merge(...classes);
}
