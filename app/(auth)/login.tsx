import Button from "@/components/button";
import { measurements } from "@/constants/Measurements";
import { Magic } from "@magic-sdk/react-native-expo";
import { View, Text } from "react-native";
import { SolanaExtension } from "@magic-ext/solana";
import InputField from "@/components/input-field";
import { useState } from "react";
import { Redirect } from "expo-router";
import { magicAuth } from "@/auth/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (email: string) => {
    setLoading(true);
    try {
      await magicAuth.auth.loginWithEmailOTP({ email: email });
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
    <View style={{ flex: 1, justifyContent: "center", margin: 8 }}>
      {/* <View style={{ flex: 1, justifyContent: "center" }}>
       
      </View>
      <View
        style={{
          paddingHorizontal: measurements.paddingHorizontal,
          paddingBottom: measurements.paddingBottom,
        }}
      >
        <InputField placeholder="Email" value={email} onChange={(e) => setEmail(e.nativeEvent.text)}/>
        <Button text={"Login"} onPress={async () => await login(email)} disabled={loading}/>
          <Button text={"Logout"} onPress={async() => await logout()} disabled={loading}/> 

      </View> */}
      <Button
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
      />
    </View>
  );
}
