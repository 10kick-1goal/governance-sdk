import React from 'react';

import { createFactory } from '../utils/styles/elementFactory';

export const createButton = createFactory<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>('button');
