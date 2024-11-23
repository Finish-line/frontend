import Button from "@/components/button";
import { measurements } from "@/constants/Measurements";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function IndexScreen() {
  const { colors } = useThemeColor();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: measurements.paddingHorizontal,
      }}
    ></View>
  );
}
