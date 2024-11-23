import { Caption } from "@/components/text/text";
import { color } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { BlurView } from "expo-blur";
import React from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";

export default function SinglePersonMarker() {
  const { colors } = useThemeColor();
  return (
    <Marker
      key={3}
      anchor={{ x: 0.5, y: 1 }}
      coordinate={{
        latitude: Number(0),
        longitude: Number(0),
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: colors.background,
          }}
        />
        <BlurView
          intensity={60}
          tint="dark"
          experimentalBlurMethod="dimezisBlurView"
          style={{
            height: 10,
            width: 10,
            borderRadius: 5,
            marginTop: 5,
            overflow: "hidden",
          }}
        />
      </View>
    </Marker>
  );
}
