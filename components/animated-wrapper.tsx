import React from 'react';
import {
  Animated,
  Pressable,
  PressableProps,
  View,
  ViewStyle,
} from 'react-native';

type AnimatedWrapperProps = {
  minScale?: number;
  changeOpacity?: boolean;
  style?: ViewStyle;
  children: React.ReactNode;
};

type CombinedProps = PressableProps & AnimatedWrapperProps;

const AnimatedWrapper = (props: CombinedProps) => {
  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, props.minScale ? props.minScale : 0.99];
  const scale = animation.interpolate({ inputRange, outputRange });

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  return (
    <View style={[props.style, { overflow: 'hidden' }]} {...props}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={props.onPress}
        onLongPress={props.onLongPress}
        hitSlop={props.hitSlop ? props.hitSlop : 0}
        disabled={props.disabled ? props.disabled : false}
        style={({ pressed }) => [
          {
            opacity: props.changeOpacity ? (pressed ? 0.8 : 1) : 1,
          },
        ]}>
        <Animated.View
          style={[
            {
              transform: [{ scale }],
            },
          ]}>
          {props.children}
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default AnimatedWrapper;
