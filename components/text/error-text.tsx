import { color } from '@/constants/Colors';
import React from 'react';

import { Subtitle } from './text';

const ErrorText = ({ error }: { error: string }) => {
  return (
    error &&
    error.length > 0 && (
      <Subtitle style={{ color: color.red }}>{error}</Subtitle>
    )
  );
};

export default ErrorText;
