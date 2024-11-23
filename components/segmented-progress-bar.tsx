import { color as _color } from "@/constants/Colors";
import { measurements } from "@/constants/Measurements";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Dimensions, View } from "react-native";

export default function SegmentedProgressBar(props: {
  active: number;
  number: number;
  color?: string;
}) {
  const { colors } = useThemeColor();

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      {Array.from(Array(props.number).keys()).map((item) => {
        return (
          <View
            key={item}
            style={{
              width:
                (Dimensions.get("screen").width -
                  measurements.paddingHorizontal * 2) /
                  props.number -
                5,
              height: 8,
              borderRadius: 4,
              overflow: "hidden",
              backgroundColor:
                item + 1 <= props.active
                  ? props.color
                    ? props.color
                    : _color.purple
                  : colors.primary,
            }}
          />
        );
      })}
    </View>
  );
}
