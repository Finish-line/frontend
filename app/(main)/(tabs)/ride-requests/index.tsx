import SinglePersonMarker from "@/components/marker/single-person";
import { measurements } from "@/constants/Measurements";
import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { router, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Divider } from "@/components/divider";
import { font } from "@/constants/Font";
import { ImportantBody, Subtitle, Title2 } from "@/components/text/text";
import { subscribe, useSnapshot } from "valtio";
import { userLocationStore } from "@/store/userLocationStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Button from "@/components/button";
import { fetchTripInformation, postRequestRide } from "@/api/map";
import { requestAndUpdateLocation } from "@/utils/requestAndUpdateLocation";
interface LocationData {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const mockData = [
  {
    lon: -73.935242,
    lat: 40.73061,
    distance: 5.2,
    duration: 15,
    price: 12.5,
    distanceFromDriver: 2.3,
    durationToUser: 5,
  },
  {
    lon: -118.243683,
    lat: 34.052235,
    distance: 8.4,
    duration: 25,
    price: 18.75,
    distanceFromDriver: 3.1,
    durationToUser: 8,
  },
  {
    lon: -0.127758,
    lat: 51.507351,
    distance: 3.1,
    duration: 10,
    price: 8.0,
    distanceFromDriver: 1.2,
    durationToUser: 3,
  },
  {
    lon: 139.691711,
    lat: 35.689487,
    distance: 7.6,
    duration: 20,
    price: 15.0,
    distanceFromDriver: 2.8,
    durationToUser: 6,
  },
  {
    lon: 2.352222,
    lat: 48.856613,
    distance: 4.5,
    duration: 12,
    price: 10.25,
    distanceFromDriver: 1.9,
    durationToUser: 4,
  },
];

export default function IndexScreen() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [mapRef, setMapRef] = useState<MapView | null>(null);
  const insets = useSafeAreaInsets();
  const { colors } = useThemeColor();
  const snap = useSnapshot(userLocationStore);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  return (
    <View style={{ marginTop: insets.top, backgroundColor: "red", flex: 1 }}>
      <FlatList
        data={mockData}
        renderItem={({ item }) => (
          <View>
            <Title2>{item.price}</Title2>
            <Subtitle>{item.distance}</Subtitle>
            <Subtitle>{item.duration}</Subtitle>
            <Button text="Request ride" onPress={() => postRequestRide()} />
          </View>
        )}
      />
    </View>
  );
}
