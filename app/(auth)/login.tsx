import Button from "@/components/button";
import { measurements } from "@/constants/Measurements";
import { View } from "react-native";

export default function LoginScreen() {
  return (
    <View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {/* content goes here */}
      </View>
      <View
        style={{
          paddingHorizontal: measurements.paddingHorizontal,
          paddingBottom: measurements.paddingBottom,
        }}
      >
        <Button text="Test" onPress={() => {}} />
      </View>
    </View>
  );
}
