import SinglePersonMarker from "@/components/marker/single-person";
import { measurements } from "@/constants/Measurements";
import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { router } from "expo-router";
import InputField from "@/components/input-field";
import AnimatedWrapper from "@/components/animated-wrapper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
      <AnimatedWrapper
        style={{
          position: "absolute",
          width: "100%",
          marginTop: insets.top + measurements.marginTop,
          zIndex: 100,
          paddingHorizontal: measurements.paddingHorizontal,
        }}
        onPress={() => router.navigate("/(main)/search-address")}
      >
        <InputField
          pointerEvents="none"
          search
          editable={false}
          placeholder="Destination..."
        />
      </AnimatedWrapper>
    </View>
  );
}
