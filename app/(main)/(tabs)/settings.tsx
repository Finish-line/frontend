import LoginScreen from "@/app/(auth)/login";
import { magicAuth } from "@/auth/auth";
import Button from "@/components/button";
import SinglePersonMarker from "@/components/marker/single-person";
import { Redirect, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView from "react-native-maps";
import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com");
export default function SettingsScreen() {
  const [userInfo, setUserInfo] = useState<string | null>(null);

  const logout = async () => {
    try {
      await magicAuth.user.logout();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  

  const showInfo = async () => {
    console.log("showing info");
    try {
      const pk = await (await magicAuth.user.getInfo()).publicAddress;
      const publicKey = new PublicKey(pk || "");
      const info = await connection.getAccountInfo(publicKey);
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Button text="Show Info" onPress={showInfo}/>
      <Button text={"Logout"} onPress={async() => await logout()} />
    
    </View>
  );
}