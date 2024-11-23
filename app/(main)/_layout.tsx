import { color } from "@/constants/Colors";
import { useSession } from "@/hooks/ctx";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Redirect, SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { Appearance, Text, View } from "react-native";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const { colors, toggleTheme } = useThemeColor();

  useEffect(() => {
    let listener = Appearance.addChangeListener(onThemeChange);

    return () => listener.remove();
  }, []);

  const onThemeChange = (preferences: Appearance.AppearancePreferences) =>
    toggleTheme(preferences.colorScheme as "light" | "dark");

  if (isLoading) {
    return <Text>Loading…</Text>;
  }

  setTimeout(() => {
    SplashScreen.hideAsync();
  }, 500);

  // if (!session) {
  if (session) {
    return <Redirect href="/welcome" />;
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
