import Button from "@/components/button";
import { measurements } from "@/constants/Measurements";
import { Magic } from "@magic-sdk/react-native-expo";
import { View } from "react-native";

const magic = new Magic('pk_live_847C5550E8FD0C27')
export default async function LoginScreen() {

  const login = async () => {
    try {
      await magic.auth.loginWithEmailOTP({ email: "niklasd.burghardt@gmail.com" });
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    
    <View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {magic.wallet && await magic.wallet.showAddress()}
      </View>
      <View
        style={{
          paddingHorizontal: measurements.paddingHorizontal,
          paddingBottom: measurements.paddingBottom,
        }}
      >
        <Button text="Test" onPress={login}/>
      </View>
    </View>
  );
}
