import SinglePersonMarker from "@/components/marker/single-person";
import { measurements } from "@/constants/Measurements";
import React, { useState, useEffect } from "react";
import { View, TextInput } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Divider } from "@/components/divider";
import { font } from "@/constants/Font";
import {
  Body,
  ImportantBody,
  Subtitle,
  Title1,
  Title2,
  Title3,
} from "@/components/text/text";
import { subscribe, useSnapshot } from "valtio";
import { userLocationStore } from "@/store/userLocationStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Button from "@/components/button";
import { fetchTripInformation, postRequestRide } from "@/api/map";
import { requestAndUpdateLocation } from "@/utils/requestAndUpdateLocation";
import { color } from "@/constants/Colors";
import Slider from "@react-native-community/slider";

export default function RequestedDriveScreen() {
  const { colors } = useThemeColor();
  const snap = useSnapshot(userLocationStore);

  const idRef = React.useRef<number | null>(null);

  const [tripExists, setTripExists] = useState(true);

  const local = useLocalSearchParams();

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        paddingHorizontal: measurements.paddingHorizontal,
      }}
    >
      <Title1 style={{ fontWeight: "bold" }}>You accepted:</Title1>
      <ImportantBody>
        {local.fromText} → {local.toText}
      </ImportantBody>
      <Divider style={{ marginVertical: measurements.marginBetween }} />
      <View>
        <Subtitle>Drive to: {local.fromText}</Subtitle>
      </View>
      <Button
        text="The customer is in the car"
        style={{ marginTop: measurements.marginBetween }}
        onPress={() => {
          alert("Confirmed!");
        }}
      />
    </View>
  );
}
