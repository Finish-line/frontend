import { Alert } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
interface LocationData {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
export const requestAndUpdateLocation = async (
  setLocation: (ld: LocationData) => void,
  mapRef: any
) => {
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

    if (mapRef) {
      // Animate map to user's location
      mapRef?.animateToRegion(newRegion, 1000);
    }
  } catch (error) {
    Alert.alert("Error", "Unable to get your location.", [{ text: "OK" }]);
  }
};
