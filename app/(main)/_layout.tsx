import { color } from "@/constants/Colors";
import { useSession } from "@/hooks/ctx";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Redirect, SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { Appearance, Text, View } from "react-native";

export default function AppLayout() {
  const { colors, toggleTheme } = useThemeColor();

  useEffect(() => {
    let listener = Appearance.addChangeListener(onThemeChange);

    return () => listener.remove();
  }, []);

  const onThemeChange = (preferences: Appearance.AppearancePreferences) =>
    toggleTheme(preferences.colorScheme as "light" | "dark");

  setTimeout(() => {
    SplashScreen.hideAsync();
  }, 500);

  return <Redirect href="/login" />;

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        contentStyle: {
          backgroundColor: colors.background,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
