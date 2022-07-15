import { createElement, forwardRef } from 'react';

import { cx } from './cx';

export function createFactory<P extends { className?: string }, R extends HTMLElement>(
  tag: string
) {
  return (customStyles: string) => {
    return forwardRef<R, P>((props, ref) => {
      const { className, ...rest } = props;

      return createElement(tag, {
        ref,
        className: cx(customStyles, className),
        ...rest,
      });
    });
  };
}
