import { measurements } from "@/constants/Measurements";
import React from "react";
import { View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Subtitle, Title1 } from "@/components/text/text";
import Button from "@/components/button";
import { postRequestRide } from "@/api/map";
import { font } from "@/constants/Font";
import InputField from "@/components/input-field";
import { color } from "@/constants/Colors";
import { Divider } from "@/components/divider";

export default function WalletScreen() {
  const { colors } = useThemeColor();

  const numSol = 30;

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
        <Title1
          style={{
            fontWeight: "bold",
            fontSize: font.largestTitle,
            color: color.purple,
          }}
        >
          {numSol} SOL
        </Title1>
        <Subtitle>≈ {(numSol * 100) / 2} km of rides</Subtitle>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 10,
          marginHorizontal: measurements.paddingHorizontal,
          padding: measurements.paddingHorizontal,
          marginTop: measurements.marginBetween,
        }}
      >
        <InputField placeholder="1234 1234 1234 1234" />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-evenly",
            gap: 10,
            marginTop: 10,
          }}
        >
          <InputField placeholder="382" containerStyle={{ flex: 1 }} />
          <InputField placeholder="12/28" containerStyle={{ flex: 1 }} />
        </View>
        <Divider style={{ marginVertical: measurements.marginBetween }} />
        <InputField placeholder="Amount" keyboardType="number-pad" />
        <Button
          style={{ marginTop: measurements.marginBetween }}
          text="Top up wallet"
          disabled
          onPress={() => postRequestRide()}
        />
      </View>
    </View>
  );
}
