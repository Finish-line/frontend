import { measurements } from "@/constants/Measurements";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Divider } from "@/components/divider";
import {
  ImportantBody,
  Subtitle,
  Title1,
  Title2,
} from "@/components/text/text";
import { useSnapshot } from "valtio";
import { userLocationStore } from "@/store/userLocationStore";
import Button from "@/components/button";
import { postRequestRide } from "@/api/map";

let interval: NodeJS.Timeout;

export default function RequestedDriveScreen() {
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
    return () => {
      clearInterval(interval);
    };
  }, []);

  const startPolling = () => {
    interval = setInterval(() => {
      poll();
    }, 3000);
  };

  const poll = () => {
    fetch("http://167.71.53.45/api/ride/" + idRef.current)
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
    <View
      style={{
        height: "100%",
        width: "100%",
        paddingHorizontal: measurements.paddingHorizontal,
      }}
    >
      <Title1 style={{ fontWeight: "bold" }}>Your trip:</Title1>
      <ImportantBody>
        {snap.fromText} → {snap.toText}
      </ImportantBody>
      <Divider style={{ marginVertical: measurements.marginBetween }} />
      {tripExists ? (
        <View>
          <Title2>Waiting...</Title2>
          <Subtitle>
            We'll let you know when there is a driver open to take the ride.
          </Subtitle>
        </View>
      ) : (
        <View style={{}}>
          <View>
            <Title2 style={{ fontWeight: "bold" }}>Ride is active</Title2>
            <Subtitle style={{ marginTop: measurements.marginBetween }}>
              A driver wants to drive you from "{snap.fromText}"" to "
              {snap.toText}" for{" "}
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "SOL",
              }).format(Number(local.price ?? 0))}
              . Please wait for a few more minutes.
            </Subtitle>
          </View>
          <Button
            text="I am in the car"
            style={{ marginTop: measurements.marginBetween }}
            onPress={() => {
              alert("Confirmed!");
            }}
          />
        </View>
      )}
    </View>
  );
}
