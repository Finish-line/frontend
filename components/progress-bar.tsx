import { color as _color } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { DimensionValue, View, ViewStyle } from "react-native";

const displayPercent = (percent: number): DimensionValue =>
  `${(percent * 100).toFixed(2)}%` as DimensionValue;

export default function ProgressBar({
  percentage = 0,
  style,
}: {
  percentage: number;
  style?: ViewStyle;
}) {
  const { colors } = useThemeColor();

  return (
    <View
      style={{
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
        overflow: "hidden",
        ...style,
      }}
    >
      <View
        style={{
          backgroundColor: _color.purple,
          width: displayPercent(percentage),
          height: "100%",
        }}
      />
    </View>
  );
}
