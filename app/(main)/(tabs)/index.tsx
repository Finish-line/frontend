import SinglePersonMarker from "@/components/marker/single-person";
import { measurements } from "@/constants/Measurements";
import React, { useState, useEffect } from "react";
import { View, TextInput } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { router } from "expo-router";
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
import { color } from "@/constants/Colors";
interface LocationData {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const INITIAL_REGION = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function IndexScreen() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [mapRef, setMapRef] = useState<MapView | null>(null);
  const insets = useSafeAreaInsets();
  const { colors } = useThemeColor();
  const snap = useSnapshot(userLocationStore);
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const [details, setDetails] = useState<{
    distance: number;
    duration: number;
    price: number;
  }>({
    distance: 0,
    duration: 0,
    price: 0,
  });

  useEffect(() => {
    const unsubscribe = subscribe(userLocationStore, () => {
      console.log("state has changed to", userLocationStore);
      console.log("fromText", userLocationStore.fromText);
      console.log("toText", userLocationStore.toText);
      console.log("fromText length", userLocationStore.fromText?.length);
      console.log("toText length", userLocationStore.toText?.length);
      if (
        userLocationStore.fromText &&
        userLocationStore.toText &&
        userLocationStore.fromText.length > 0 &&
        userLocationStore.toText.length > 0
      ) {
        console.log("fetching trip information");
        updateInformation();
      }
    });
    return () => unsubscribe();
  }, []);

  async function updateInformation() {
    let fetchedDetails = await fetchTripInformation();
    setDetails(fetchedDetails);
    bottomSheetRef.current?.snapToIndex(0);
  }

  useEffect(() => {
    requestAndUpdateLocation(setLocation, mapRef);

    // Set up location watching
    let locationSubscription: Location.LocationSubscription;

    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === "granted") {
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 10000,
            distanceInterval: 10,
          },
          (position) => {
            const newRegion = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
            setLocation(newRegion);
          }
        );
      }
    })();

    // Cleanup subscription on unmount
    return () => {
      locationSubscription?.remove();
    };
  }, []);

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <MapView
        ref={(ref) => setMapRef(ref)}
        rotateEnabled={false}
        style={{ flex: 1, zIndex: -1 }}
        initialRegion={INITIAL_REGION}
        region={location || undefined}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {location && (
          <SinglePersonMarker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        )}
      </MapView>
      <View
        style={{
          position: "absolute",
          width: "100%",
          marginTop: insets.top + measurements.marginTop,
          zIndex: 100,
          paddingHorizontal: measurements.paddingHorizontal,
        }}
      >
        <View style={{ backgroundColor: colors.background, borderRadius: 12 }}>
          <View style={{ height: measurements.searchBarHeight + 10 }}>
            <TextInput
              placeholder="Where from?"
              editable={false}
              onPress={() =>
                router.navigate("/(main)/search-address?search=from")
              }
              value={snap.fromText}
              style={{
                paddingHorizontal: 15,
                textAlignVertical: "center",
                height: "100%",
                fontSize: font.bodyImportant,
                color: colors.text,
              }}
              placeholderTextColor={color.gray}
            />
          </View>
          <Divider />
          <View style={{ height: measurements.searchBarHeight + 10 }}>
            <TextInput
              placeholder="Where to?"
              editable={false}
              onPress={() =>
                router.navigate("/(main)/search-address?search=to")
              }
              value={snap.toText}
              style={{
                paddingHorizontal: 15,
                textAlignVertical: "center",
                height: "100%",
                fontSize: font.bodyImportant,
                color: colors.text,
              }}
              placeholderTextColor={color.gray}
            />
          </View>
        </View>
      </View>
      <BottomSheet
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={{ backgroundColor: colors.border }}
        enableDynamicSizing
        index={-1}
        ref={bottomSheetRef}
      >
        <BottomSheetView
          style={{ paddingHorizontal: measurements.paddingHorizontal }}
        >
          <ImportantBody style={{ fontWeight: "bold" }}>Overview</ImportantBody>
          <Subtitle>
            The following values are estimates. They may vary for various
            reasons (weather, traffic, etc.).
          </Subtitle>
          <Divider style={{ marginVertical: measurements.marginBetween }} />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Title2 style={{ fontWeight: "bold" }}>
                {new Intl.NumberFormat("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(details?.distance / 1000)}
                km
              </Title2>
              <Subtitle>Distance</Subtitle>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Title2 style={{ fontWeight: "bold" }}>
                {details?.duration} min
              </Title2>
              <Subtitle>Duration</Subtitle>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Title2 style={{ fontWeight: "bold" }}>
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format((2 * details?.distance) / 1000 ?? 0)}
              </Title2>
              <Subtitle>Rec. Price</Subtitle>
            </View>
          </View>
          <Divider style={{ marginVertical: measurements.marginBetween }} />

          <View
            style={{
              gap: 10,
              flexDirection: "row",
              marginBottom: measurements.paddingBottom,
            }}
          >
            <Button
              variant="outline"
              text="Cancel"
              onPress={() => {
                snap.reset();
                bottomSheetRef.current?.close();
              }}
              style={{ flex: 1 }}
            />
            <Button
              variant="primary"
              text="Request ride"
              onPress={() => {
                postRequestRide();
              }}
              style={{ flex: 1 }}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
