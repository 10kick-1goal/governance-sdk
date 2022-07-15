import React, { forwardRef } from 'react';

import { TERTIARY_WRAPPER_UNPADDED, TERTIARY } from '../utils/styles/common/button';

import { createButton } from './createButton';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const TertiaryWrapperUnpadded = createButton(TERTIARY_WRAPPER_UNPADDED);

export const TertiaryUnpadded = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <TertiaryWrapperUnpadded className={className} {...rest} ref={ref}>
      <div className={TERTIARY}>{children}</div>
    </TertiaryWrapperUnpadded>
  );
});
