import { color } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View } from "react-native";

import TextIconBackground from "./text-icon-background";

interface TextIconBackgroundRadioProps {
  onPress: () => void;
  onLongPress?: () => void;
  text?: string;
  icon: React.ReactNode;
  rightIcon?: React.ReactNode;
  notification?: boolean;
  notificationCount?: number;
  disabled?: boolean;
  active: boolean;
  component?: React.ReactNode;
}

const Radio = ({ active }: { active: boolean }) => {
  const { colors } = useThemeColor();

  return (
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        bottom: 0,
        top: 0,
        right: 20,
      }}
    >
      <View
        style={{
          height: 20,
          width: 20,
          backgroundColor: active ? color.purple : "transparent",
          borderWidth: active ? 0 : 2,
          borderColor: active ? "transparent" : colors.primary,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 10,
            width: 10,
            backgroundColor: color.white,
            borderRadius: 5,
          }}
        />
      </View>
    </View>
  );
};

export default function TextIconBackgroundRadio({
  onPress,
  text,
  icon = <View />,
  notification = false,
  notificationCount = 1,
  disabled = false,
  onLongPress,
  active,
  component,
}: TextIconBackgroundRadioProps) {
  return (
    <TextIconBackground
      text={text}
      icon={icon}
      onPress={onPress}
      onLongPress={onLongPress}
      notification={notification}
      notificationCount={notificationCount}
      disabled={disabled}
      rightIcon={<Radio active={active} />}
      component={component}
    />
  );
}
