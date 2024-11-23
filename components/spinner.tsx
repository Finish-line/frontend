import { color as _color } from '@/constants/Colors';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const IconSpinner = ({ color = _color.black }) => {
  return (
    <View
      style={{
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={'small'} color={color} />
    </View>
  );
};

export default IconSpinner;
