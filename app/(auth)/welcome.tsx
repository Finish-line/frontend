import Button from "@/components/button";
import { font } from "@/constants/Font";
import { measurements } from "@/constants/Measurements";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import { Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useThemeColor();

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: font.largeTitle,
            textAlign: "center",
            includeFontPadding: false,
            fontFamily: "Unbounded-Black",
            color: colors.text,
          }}
        >
          Finishline
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}></View>
      <View
        style={{
          paddingHorizontal: measurements.paddingHorizontal,
          paddingBottom: measurements.paddingBottom,
        }}
      >
        <Button text="Test" onPress={() => {}} />
      </View>
    </View>
  );
}
