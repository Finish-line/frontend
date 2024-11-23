import { measurements } from "@/constants/Measurements";
import React from "react";
import { TextStyle, View } from "react-native";

import PressableBackground from "./pressable-background";
import { Body } from "./text/text";
import { ArrowRightIcon } from "lucide-react-native";
import { color } from "@/constants/Colors";

interface TextIconBackgroundProps {
  onPress: () => void;
  onLongPress?: () => void;
  text?: string;
  icon: React.ReactNode;
  rightIcon?: React.ReactNode;
  notification?: boolean;
  notificationCount?: number;
  disabled?: boolean;
  component?: React.ReactNode;
  textStyle?: TextStyle;
}

export default function TextIconBackground({
  onPress,
  text,
  icon = <View />,
  rightIcon = <ArrowRightIcon color={color.black} />,
  disabled = false,
  onLongPress,
  component,
  textStyle,
}: TextIconBackgroundProps) {
  return (
    <PressableBackground
      disabled={disabled}
      onLongPress={onLongPress}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: measurements.paddingHorizontal,
        }}
      >
        {icon}
        {component ? (
          component
        ) : (
          <Body
            style={{
              paddingHorizontal: 10,
              flexShrink: 1,
              flexGrow: 1,
              ...textStyle,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {text}
          </Body>
        )}
        {rightIcon}
      </View>
    </PressableBackground>
  );
}
