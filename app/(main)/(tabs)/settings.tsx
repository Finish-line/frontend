import SinglePersonMarker from "@/components/marker/single-person";
import React, { useRef } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

export default function SettingsScreen() {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <MapView rotateEnabled={false} style={{ flex: 1 }}>
        <SinglePersonMarker />
      </MapView>
    </View>
  );
}
