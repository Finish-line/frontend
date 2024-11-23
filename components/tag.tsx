import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Text, View } from 'react-native';

type TagProps = {
  color?: string;
  style?: object;
  children: React.ReactNode;
};

const Tag = (props: TagProps) => {
  const { colors } = useThemeColor();

  return (
    <View
      style={{
        backgroundColor: !props.color ? colors.primary : props.color,
        alignSelf: 'flex-start',
        borderRadius: 10,
        ...props.style,
      }}>
      <Text
        style={{
          color: colors.text,
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}>
        {props.children}
      </Text>
    </View>
  );
};

export default Tag;
