import { color } from "@/constants/Colors";
import { font } from "@/constants/Font";
import { measurements } from "@/constants/Measurements";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import AnimatedWrapper from "./animated-wrapper";
import IconSpinner from "./spinner";

type ButtonProps = {
  text?: string;
  icon?: any;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  loading?: boolean;
  smallButton?: boolean;
  changeOpacity?: boolean;
  invisible?: boolean;
  variant?: "default" | "outline" | "primary";
  textStyles?: TextStyle;
  innerStyle?: ViewStyle;
};

const Button = ({
  text,
  icon,
  onPress,
  disabled = false,
  style,
  loading = false,
  smallButton = false,
  changeOpacity = true,
  invisible = false,
  variant = "default",
  textStyles,
  innerStyle,
}: ButtonProps) => {
  const { colors } = useThemeColor();

  const outline = variant === "outline";
  const primary = variant === "primary";

  return (
    <View style={{ ...style, opacity: disabled ? 0.4 : 1 }}>
      <AnimatedWrapper
        disabled={disabled}
        onPress={onPress}
        changeOpacity={changeOpacity}
      >
        <View
          style={[
            styles.innerContainer,
            {
              height: smallButton
                ? measurements.button.smallButtonHeight
                : measurements.button.buttonHeight,
              alignSelf:
                smallButton || (icon && text === null) ? "center" : "auto",
              paddingHorizontal: smallButton
                ? 20
                : icon && text === null
                  ? 10
                  : 0,
              backgroundColor:
                invisible || outline ? "transparent" : colors.text,
              borderWidth: outline ? 1 : 0,
              borderColor: colors.border,
            },
            innerStyle,
          ]}
        >
          {icon && !loading && (
            <View
              style={[styles.iconContainer, { marginRight: !text ? 0 : 10 }]}
            >
              {icon}
            </View>
          )}
          {loading && (
            <View style={styles.iconContainer}>
              <IconSpinner color={primary ? colors.background : color.white} />
            </View>
          )}
          <Text
            style={[
              styles.text,
              {
                color: invisible || outline ? colors.text : colors.background,
              },
              textStyles,
            ]}
          >
            {text}
          </Text>
        </View>
      </AnimatedWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    overflow: "hidden",
    minWidth: measurements.button.buttonHeight,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous", // ios only
    borderRadius: measurements.button.buttonHeight / 2,
  },
  iconContainer: { marginRight: 10 },
  text: {
    fontSize: font.bodyImportant,
    fontWeight: Platform.select({ ios: "600", android: "bold" }),
  },
});

export default Button;
