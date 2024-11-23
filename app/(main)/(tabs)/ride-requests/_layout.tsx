import { Stack } from "expo-router";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const { colors } = useThemeColor();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerLargeTitle: true,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="ride-requests"
        options={{
          title: "Ride Requests",
          headerTitle: "Ride Requests",
        }}
      />
    </Stack>
  );
}
