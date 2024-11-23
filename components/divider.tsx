import { Body } from '@/components/text/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Dimensions, View, ViewStyle } from 'react-native';

const Divider = (props: { style?: ViewStyle }) => {
  const { colors } = useThemeColor();

  return (
    <View
      style={{
        height: 0.5,
        width: Dimensions.get('screen').width - 100,
        justifyContent: 'center',
        backgroundColor: colors.border,
        alignSelf: 'center',
        ...props.style,
      }}
    />
  );
};

const TitleDivider = (props: { title: string; style?: ViewStyle }) => {
  return (
    <View {...props.style}>
      <Divider />
      <Body
        style={{
          marginTop: 10,
          fontWeight: 'bold',
        }}>
        {props.title}
      </Body>
    </View>
  );
};

export { Divider, TitleDivider };
