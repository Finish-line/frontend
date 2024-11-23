import PressableBackground from "@/components/pressable-background";
import { color } from "@/constants/Colors";
import { font } from "@/constants/Font";
import { measurements } from "@/constants/Measurements";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SearchIcon } from "lucide-react-native";
import React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

const InputField = (
  props: TextInputProps & {
    search?: boolean;
    icon?: React.ReactNode;
    onPressRight?: () => void;
    _ref?: React.RefObject<any>;
    containerStyle?: ViewStyle;
    inputStyle?: ViewStyle;
    isTextInput?: boolean;
  }
) => {
  const { colors } = useThemeColor();

  return (
    <View
      style={{
        ...styles.container,
        ...props.containerStyle,
        backgroundColor: colors.primary,
      }}
    >
      {props.search && (
        <View style={styles.searchIconContainer}>
          <SearchIcon color={color.gray} size={16} />
        </View>
      )}
      <TextInput
        ref={props._ref}
        selectionColor={"#0E70FF99"}
        underlineColorAndroid="transparent"
        style={{
          ...styles.textInput,
          color: colors.text,
          height: !props.isTextInput
            ? props.search
              ? measurements.searchBarHeight
              : measurements.inputFieldHeight
            : "auto",
          paddingVertical: props.isTextInput ? 12 : 0,
          textAlignVertical: props.isTextInput ? "top" : "auto",
        }}
        {...props}
      />
      {props.icon && (
        <PressableBackground
          disabled={!props.onPressRight}
          onPress={props.onPressRight}
          style={styles.iconRightContainer}
          pressableStyle={styles.iconRightContainer}
        >
          <View style={styles.iconStyle}>{props.icon}</View>
        </PressableBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10,
  },
  searchIconContainer: {
    justifyContent: "center",
    marginLeft: 15,
    marginRight: -10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: font.subtitle,
  },
  iconRightContainer: {
    height: measurements.inputFieldHeight,
    width: measurements.inputFieldHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    justifyContent: "center",
  },
});

export default InputField;
