import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";


export default function AuthLayout() {
  const { colors } = useThemeColor();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerBackVisible: true,
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{ presentation: "card", headerTitle: "Login" }}
      />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}
