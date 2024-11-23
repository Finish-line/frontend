import { Tabs } from "expo-router";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MapIcon, SettingsIcon } from "lucide-react-native";

export default function TabLayout() {
  const { colors } = useThemeColor();
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Maps",
          tabBarIcon: ({ focused }) => (
            <MapIcon strokeWidth={focused ? 4 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <SettingsIcon strokeWidth={focused ? 4 : 2} />
          ),
        }}
      />
    </Tabs>
  );
}
