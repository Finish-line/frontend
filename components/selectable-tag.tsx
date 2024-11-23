import { color } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { percentToHex } from "@/utils/percent-to-hex";
import React from "react";
import { View } from "react-native";

import { ImportantBody } from "./text/text";
import AnimatedWrapper from "./animated-wrapper";

const SelectableTag = React.memo(
  (props: { onPress: () => void; text: string; selected: boolean }) => {
    const { colors } = useThemeColor();

    return (
      <AnimatedWrapper onPress={props.onPress}>
        <View
          style={{
            backgroundColor: props.selected
              ? color.purple + percentToHex(30)
              : colors.primary,
            borderRadius: 20,
            paddingVertical: 4,
            paddingHorizontal: 10,
            margin: 2.5,
          }}
        >
          <ImportantBody
            style={{ color: props.selected ? color.purple : colors.text }}
          >
            {props.text}
          </ImportantBody>
        </View>
      </AnimatedWrapper>
    );
  }
);

export default SelectableTag;
