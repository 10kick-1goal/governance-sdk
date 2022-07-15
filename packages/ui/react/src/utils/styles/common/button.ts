import { cx } from '../cx';

export const BASE_STYLES = cx(
  'rui-cursor-pointer',
  'rui-duration-300',
  'rui-font-serif',
  'rui-group',
  'rui-inline-flex',
  'rui-items-center',
  'rui-justify-center',
  'rui-outline-0',
  'rui-relative',
  'rui-rounded-full',
  'rui-text-base',
  'rui-transition-all',
  'disabled:rui-cursor-not-allowed'
);

export const GRADIENT_UNPADDED = cx(
  BASE_STYLES,
  'rui-border-none',
  'rui-bg-gradient-to-r',
  'rui-from-[#00C2FF]',
  'rui-opacity-[.84]',
  'rui-text-black',
  'rui-to-[#87F2FF]',
  'rui-transition-to-white-background',
  'rui-via-[#00E4FF]',
  'active:rui-opacity-70',
  'disabled:active:rui-bg-white/10',
  'disabled:focus:border-transparent',
  'disabled:hover:rui-opacity-[.84]',
  'disabled:rui-bg-none',
  'disabled:rui-bg-white/10',
  'hover:rui-opacity-100'
);

export const GRADIENT = cx(GRADIENT_UNPADDED, 'rui-px-11', 'rui-py-5');

export const DARK_UNPADDED = cx(
  BASE_STYLES,
  'rui-bg-black',
  'rui-opacity-[.84]',
  'rui-text-white',
  'active:rui-opacity-70',
  'disabled:active:rui-bg-white/10',
  'disabled:focus:border-transparent',
  'disabled:rui-bg-white/10',
  'disabled:rui-text-black',
  'focus:rui-bg-white',
  'focus:rui-text-black',
  'hover:rui-bg-white',
  'hover:rui-text-black'
);

export const DARK = cx(DARK_UNPADDED, 'rui-px-11', 'rui-py-5');

export const PRIMARY_UNPADDED = cx(
  BASE_STYLES,
  'rui-bg-white',
  'rui-border-2',
  'rui-border-transparent',
  'rui-text-black',
  'active:rui-bg-white/50',
  'disabled:active:rui-bg-white/10',
  'disabled:focus:border-transparent',
  'disabled:rui-bg-white/10',
  'focus:rui-border-[#00C2FF]',
  'hover:rui-bg-white/70'
);

export const PRIMARY = cx(PRIMARY_UNPADDED, 'rui-px-11', 'rui-py-5');

export const SECONDARY_UNPADDED = cx(
  BASE_STYLES,
  'rui-border-white/30',
  'rui-border',
  'rui-text-white',
  'active:rui-bg-white/70',
  'active:rui-text-black',
  'disabled:active:rui-bg-transparent',
  'disabled:active:rui-text-white',
  'disabled:focus:rui-border-transparent',
  'disabled:hover:rui-bg-white/10',
  'disabled:hover:rui-text-black',
  'disabled:rui-bg-white/10',
  'disabled:rui-border-transparent',
  'disabled:rui-cursor-not-allowed',
  'disabled:rui-text-black',
  'focus:rui-border-white',
  'hover:rui-bg-white',
  'hover:rui-text-black'
);

export const SECONDARY = cx(SECONDARY_UNPADDED, 'rui-px-11', 'rui-py-5');

export const TERTIARY_WRAPPER_UNPADDED = cx(
  BASE_STYLES,
  'rui-group',
  'rui-text-white',
  'active:rui-opacity-50',
  'disabled:active:rui-opacity-30',
  'disabled:focus:rui-opacity-30',
  'disabled:hover:rui-opacity-30',
  'disabled:rui-opacity-30',
  'focus:rui-opacity-[.70]',
  'hover:rui-opacity-[.70]'
);

export const TERTIARY_WRAPPER = cx(TERTIARY_WRAPPER_UNPADDED, 'rui-px-11', 'rui-py-5');

export const TERTIARY = cx(
  'rui-border-b',
  'rui-border-transparent',
  'rui-flex',
  'rui-items-center',
  'rui-justify-center',
  'rui-transition',
  'group-disabled:group-focus:rui-border-transparent',
  'group-disabled:group-hover:rui-border-transparent',
  'group-focus:rui-border-white/70',
  'group-hover:rui-border-white/70'
);
