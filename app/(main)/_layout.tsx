import { color } from "@/constants/Colors";
import { useSession } from "@/hooks/ctx";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Redirect, SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { Appearance, Text, View } from "react-native";
import { Magic } from "@magic-sdk/react-native-expo";
import { magicAuth } from "@/auth/auth";

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

  if (!magicAuth.user.isLoggedIn()) {
    return <Redirect href="/login" />;
  }

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
      <Stack.Screen
        name="search-address"
        options={{
          headerTitle: "Destination",
          headerBackTitle: "Map",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
