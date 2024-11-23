import { measurements } from '@/constants/Measurements';
import React from 'react';

import { Subtitle } from './text';

interface InformationTextProps {
  information: string;
}

const InformationText: React.FC<InformationTextProps> = ({ information }) => {
  return (
    <Subtitle style={{ marginTop: measurements.informationTextFieldMargin }}>
      {information}
    </Subtitle>
  );
};

export default InformationText;
