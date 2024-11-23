import SinglePersonMarker from "@/components/marker/single-person";
import { measurements } from "@/constants/Measurements";
import React, { useState, useEffect } from "react";
import { View, Alert, TextInput, Text } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { router } from "expo-router";
import InputField from "@/components/input-field";
import AnimatedWrapper from "@/components/animated-wrapper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Divider } from "@/components/divider";
import { font } from "@/constants/Font";
import {
  ImportantBody,
  Subtitle,
  Title2,
  Title3,
} from "@/components/text/text";
import { subscribe, useSnapshot } from "valtio";
import { userLocationStore } from "@/store/userLocationStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Button from "@/components/button";
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

  useEffect(() => {
    // Subscribe to all state changes
    const unsubscribe = subscribe(userLocationStore, () =>
      console.log("state has changed to", userLocationStore)
    );
    // Unsubscribe by calling the result
    return () => unsubscribe();
  }, []);

  const requestAndUpdateLocation = async () => {
    try {
      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please allow location access to use this feature.",
          [{ text: "OK" }]
        );
        return;
      }

      // Get current location
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const newRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.01, // Zoomed in view
        longitudeDelta: 0.01,
      };

      setLocation(newRegion);

      // Animate map to user's location
      mapRef?.animateToRegion(newRegion, 1000);
    } catch (error) {
      Alert.alert("Error", "Unable to get your location.", [{ text: "OK" }]);
    }
  };

  // Request location permission and get initial location when component mounts
  useEffect(() => {
    requestAndUpdateLocation();

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
                color:
                  snap.fromText && snap.fromText.length > 0
                    ? colors.text
                    : colors.border,
              }}
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
                color:
                  snap.toText && snap.toText.length > 0
                    ? colors.text
                    : colors.border,
              }}
            />
          </View>
        </View>
      </View>
      <BottomSheet
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={{ backgroundColor: colors.border }}
        enableDynamicSizing
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
          <View
            style={{
              flexDirection: "row",
              gap: 10,
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Title2 style={{ fontWeight: "bold" }}>5 km</Title2>
              <Subtitle>Distance</Subtitle>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Title2 style={{ fontWeight: "bold" }}>20 min</Title2>
              <Subtitle>Duration</Subtitle>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Title2 style={{ fontWeight: "bold" }}>5 €</Title2>
              <Subtitle>Est. Price</Subtitle>
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
            <Button variant="outline" text="Cancel" style={{ flex: 1 }} />
            <Button variant="primary" text="Request ride" style={{ flex: 1 }} />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
