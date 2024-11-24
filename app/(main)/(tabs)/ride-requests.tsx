import { measurements } from "@/constants/Measurements";
import React, { useEffect } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Linking,
  RefreshControl,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ImportantBody, Subtitle, Title3 } from "@/components/text/text";
import Button from "@/components/button";
import { postRequestRide } from "@/api/map";
import { fetchRideRequests } from "@/api/rideRequests";

const openAppleMaps = (
  fromLat: number,
  fromLon: number,
  toLat: number,
  toLon: number
): Promise<void> => {
  const url = `http://maps.apple.com/?saddr=${fromLat},${fromLon}&daddr=${toLat},${toLon}&dirflg=d`;

  return Linking.openURL(url).catch((err) => {
    console.error("An error occurred while opening Apple Maps:", err);
    throw err;
  });
};

type DataInterface = {
  id: number;
  price: number;
  duration: number;
  distance: number;
  start: string;
  destination: string;
  startLat: number;
  startLong: number;
  destLat: number;
  destLong: number;
};

export default function IndexScreen() {
  const { colors } = useThemeColor();

  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState<DataInterface[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setRefreshing(true);
    const fetchedData = await fetchRideRequests();
    setData(fetchedData);
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
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
              Route: {item.start} → {item.destination}
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
                  {new Intl.NumberFormat("de-DE", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(item.duration / 60)}{" "}
                  min
                </Title3>
                <Subtitle>Duration</Subtitle>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Title3 style={{ fontWeight: "bold" }}>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "SOL",
                  }).format(item.price ?? 0)}
                </Title3>
                <Subtitle>Revenue</Subtitle>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Button
                text="Open maps"
                smallButton
                variant="outline"
                onPress={() =>
                  openAppleMaps(
                    item.startLat,
                    item.startLong,
                    item.destLat,
                    item.destLong
                  )
                }
              />
              <Button
                text="Accept ride"
                smallButton
                onPress={() => postRequestRide()}
              />
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: measurements.marginBetween }} />
        )}
      />
    </View>
  );
}
