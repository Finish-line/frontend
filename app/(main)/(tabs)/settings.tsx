import LoginScreen from "@/app/(auth)/login";
import { magicAuth } from "@/auth/auth";
import Button from "@/components/button";
import SinglePersonMarker from "@/components/marker/single-person";
import { Redirect, router } from "expo-router";
import React, { useRef } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

export default function SettingsScreen() {
  const logout = async () => {
    try {
      await magicAuth.user.logout();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Button text="Show Info" onPress={async () => magicAuth.wallet.showBalances()}/>
        <Button text={"Logout"} onPress={async() => await logout()} />
    </View>
  );
}