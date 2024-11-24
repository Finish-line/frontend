import { magicAuth } from "@/auth/auth";
import Button from "@/components/button";
import InputField from "@/components/input-field";
import { color } from "@/constants/Colors";
import { font } from "@/constants/Font";
import { measurements } from "@/constants/Measurements";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router, Stack } from "expo-router";
import { CarIcon } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";
import { measure } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NotSignedInScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useThemeColor();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      await magicAuth.auth.loginWithEmailOTP({ email: email });
      router.push("/(main)/(tabs)");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await magicAuth.user.logout();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
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
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingBottom: 20,
            flexDirection: "row",
            gap: 15,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <CarIcon size={96} color={colors.text} />
          <CarIcon size={96} color={colors.text} />
          <CarIcon size={96} color={colors.text} />
        </View>
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
              color: color.purple,
            }}
          >
            CHAINRIDE
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingHorizontal: measurements.paddingHorizontal,
            gap: 10,
          }}
        >
          <InputField
            placeholder="Email"
            value={email}
            onChange={(e: any) => setEmail(e.nativeEvent.text)}
          />
          <Button text={"Login"} onPress={login} disabled={loading} />
        </View>
      </View>
    </>
  );
}
