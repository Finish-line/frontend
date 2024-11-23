import { measurements } from "@/constants/Measurements";
import React from "react";
import { View, FlatList, Dimensions } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ImportantBody, Subtitle, Title3 } from "@/components/text/text";
import Button from "@/components/button";
import { postRequestRide } from "@/api/map";

const mockData = [
  {
    lon: -73.935242,
    lat: 40.73061,
    distance: 5.2,
    duration: 15,
    price: 12.5,
    distanceFromDriver: 2.3,
    durationToUser: 5,
    from: "New York, NY",
    to: "Brooklyn, NY",
  },
  {
    lon: -118.243683,
    lat: 34.052235,
    distance: 8.4,
    duration: 25,
    price: 18.75,
    distanceFromDriver: 3.1,
    durationToUser: 8,
    from: "Los Angeles, CA",
    to: "Santa Monica, CA",
  },
  {
    lon: -0.127758,
    lat: 51.507351,
    distance: 3.1,
    duration: 10,
    price: 8.0,
    distanceFromDriver: 1.2,
    durationToUser: 3,
    from: "London, UK",
    to: "Greenwich, UK",
  },
  {
    lon: 139.691711,
    lat: 35.689487,
    distance: 7.6,
    duration: 20,
    price: 15.0,
    distanceFromDriver: 2.8,
    durationToUser: 6,
    from: "Tokyo, Japan",
    to: "Shibuya, Japan",
  },
  {
    lon: 2.352222,
    lat: 48.856613,
    distance: 4.5,
    duration: 12,
    price: 10.25,
    distanceFromDriver: 1.9,
    durationToUser: 4,
    from: "Paris, France",
    to: "Versailles, France",
  },
];

export default function IndexScreen() {
  const { colors } = useThemeColor();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={mockData}
        renderItem={({ item }) => (
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
            <ImportantBody
              style={{
                textAlign: "center",
                paddingBottom: measurements.marginBetween,
              }}
            >
              Route: {item.from} → {item.to}
            </ImportantBody>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                width: Dimensions.get("screen").width - 100,
                paddingBottom: measurements.marginBetween,
              }}
            >
              <View style={{ flex: 1, alignItems: "center" }}>
                <Title3 style={{ fontWeight: "bold" }}>
                  {new Intl.NumberFormat("de-DE", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(item.distance / 1000)}
                  km
                </Title3>
                <Subtitle>Distance</Subtitle>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Title3 style={{ fontWeight: "bold" }}>
                  {item.duration} min
                </Title3>
                <Subtitle>Duration</Subtitle>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Title3 style={{ fontWeight: "bold" }}>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(item.price / 100 ?? 0)}
                </Title3>
                <Subtitle>Revenue</Subtitle>
              </View>
            </View>
            <Button
              text="Accept ride"
              smallButton
              onPress={() => postRequestRide()}
            />
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: measurements.marginBetween }} />
        )}
      />
    </View>
  );
}
