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
  ImportantBody,
  Subtitle,
  Title1,
  Title2,
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

  useEffect(() => {
    const requestRide = async () => {
      const requestedRide = await postRequestRide(
        Number(local.price || 0),
        snap.fromText,
        snap.fromLat,
        snap.fromLon,
        snap.toText,
        snap.toLat,
        snap.toLon
      );
      requestedRide && (idRef.current = requestedRide.id);
      startPolling();
    };
    requestRide();
  }, []);

  const startPolling = () => {
    setInterval(() => {
      poll();
    }, 3000);
  };

  const poll = () => {
    fetch("http://localhost:3000/api/trip/" + idRef)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        setTripExists(false);
      });
  };

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Title1 style={{ fontWeight: "bold" }}>Your trip</Title1>
      <Title2 style={{ fontWeight: "bold" }}>From: {snap.fromText}</Title2>
      <Title2 style={{ fontWeight: "bold" }}>To: {snap.toText}</Title2>

      <Divider />
      {tripExists ? (
        <View>
          <Title2>Waiting...</Title2>
          <Subtitle>
            We'll let you know when there is a driver open to take the ride.
          </Subtitle>
        </View>
      ) : (
        <View>
          <Title2>Ride is active</Title2>
          <Subtitle>
            A driver wants to drive you from {snap.fromText} to {snap.toText}{" "}
            for{" "}
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "SOL",
            }).format(Number(local.price ?? 0))}
          </Subtitle>
        </View>
      )}
    </View>
  );
}
