import { Tabs } from "expo-router";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  BitcoinIcon,
  CarIcon,
  CoinsIcon,
  LucideWallet,
  MapIcon,
  SettingsIcon,
  WalletCards,
  WalletIcon,
  WalletMinimalIcon,
} from "lucide-react-native";

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
          headerTitle: "",
          headerTransparent: true,
          tabBarIcon: ({ focused }) => (
            <MapIcon color={colors.text} strokeWidth={focused ? 3 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="ride-requests"
        options={{
          title: "Ride Requests",
          tabBarIcon: ({ focused }) => (
            <CarIcon color={colors.text} strokeWidth={focused ? 3 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Your wallet",
          tabBarIcon: ({ focused }) => (
            <WalletIcon color={colors.text} strokeWidth={focused ? 3 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <SettingsIcon color={colors.text} strokeWidth={focused ? 3 : 2} />
          ),
        }}
      />
    </Tabs>
  );
}
