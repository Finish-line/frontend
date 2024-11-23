import Button from "@/components/button";
import { View, Text } from "react-native";
import { SolanaExtension } from "@magic-ext/solana";

import InputField from "@/components/input-field";
import { useState } from "react";
import { Redirect, router } from "expo-router";
import { magicAuth } from "@/auth/auth";
import { measurements } from "@/constants/Measurements";

export default function LoginScreen() {
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
    <View style={{ flex: 2, justifyContent: "center", margin: 8 }}>
      <View
        style={{
          paddingHorizontal: measurements.paddingHorizontal,
          paddingBottom: measurements.paddingBottom,
        }}
      >
        <InputField
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />
        <Button text={"Login"} onPress={login} disabled={loading} />
      </View>
      {/* <Button
        text={"Connect Wallet"}
        onPress={async () => {
          try {
            const result = await magicAuth.wallet.connectWithUI();
            console.log("Wallet connected:", result);
          } catch (error) {
            console.log("Error connecting wallet:", error);
          }
        }}
        disabled={loading}
      /> */}
    </View>
  );
}
