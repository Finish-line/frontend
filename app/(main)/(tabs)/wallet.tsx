import { measurements } from "@/constants/Measurements";
import React from "react";
import { View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Subtitle, Title1 } from "@/components/text/text";
import Button from "@/components/button";
import { postRequestRide } from "@/api/map";
import { font } from "@/constants/Font";
import InputField from "@/components/input-field";

export default function WalletScreen() {
  const { colors } = useThemeColor();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 10,
          marginHorizontal: measurements.paddingHorizontal,
          justifyContent: "space-between",
          alignItems: "center",
          padding: measurements.paddingHorizontal,
        }}
      >
        <Title1 style={{ fontWeight: "bold", fontSize: font.largestTitle }}>
          30 SOL
        </Title1>
        <Subtitle>≈ {30 / 2} km of rides</Subtitle>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 10,
          marginHorizontal: measurements.paddingHorizontal,
          padding: measurements.paddingHorizontal,
        }}
      >
        <InputField>
          <InputField placeholder="Credit/Debit card number" />
        </InputField>
        <Button text="Accept ride" onPress={() => postRequestRide()} />
      </View>
    </View>
  );
}
