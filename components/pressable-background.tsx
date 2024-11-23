import React from 'react';
import { Platform, Pressable, View, ViewStyle } from 'react-native';

interface PressableBackgroundProps {
  iosAlert?: boolean;
  borderRadius?: number;
  backgroundColor?: string;
  width?: string;
  disabled?: boolean;
  onLongPress?: () => void;
  onPress?: () => void;
  ripple_props?: any;
  style?: ViewStyle;
  pressableStyle?: ViewStyle;
  children: React.ReactNode;
}

export default function PressableBackground(props: PressableBackgroundProps) {
  return (
    <View
      style={
        {
          borderBottomRightRadius: props.iosAlert ? 20 : null,
          borderBottomLeftRadius: props.iosAlert ? 20 : null,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : 'transparent',
          ...props.style,
        } as ViewStyle
      }>
      <Pressable
        disabled={props.disabled}
        onLongPress={props.onLongPress}
        android_ripple={{ color: '#ACACAC50', ...props.ripple_props }}
        onPress={props.onPress}
        style={({ pressed }) =>
          pressed
            ? {
                backgroundColor: Platform.select({
                  ios: pressed && '#ACACAC50',
                  android: 'transparent',
                }),
                ...props.pressableStyle,
              }
            : { ...props.pressableStyle }
        }>
        {props.children}
      </Pressable>
    </View>
  );
}
