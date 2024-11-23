import { debounce } from "lodash";
import React, { useState } from "react";
import { useMemo } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import IconSpinner from "@/components/spinner";
import { ArrowUpFromDotIcon, HouseIcon, MapPinIcon } from "lucide-react-native";
import TextIconBackground from "@/components/text-icon-background";
import InputField from "@/components/input-field";
import { useThemeColor } from "@/hooks/useThemeColor";
import { measurements } from "@/constants/Measurements";
import Button from "@/components/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { userLocationStore } from "@/store/userLocationStore";
import { useSnapshot } from "valtio";
import { router, useLocalSearchParams } from "expo-router";

export default function SearchPlaceAutocompleteScreen() {
  const { colors } = useThemeColor();
  const insets = useSafeAreaInsets();
  const snap = useSnapshot(userLocationStore);
  const local = useLocalSearchParams();

  const [generalState, setGeneralState] = useState({
    results: [],
    searchFor: null,
    fetching: false,
  });

  const changeTextDebounced = (text: string) => {
    setGeneralState((prevState) => ({
      ...prevState,
      fetching: true,
    }));
    fetch(
      `https://photon.komoot.io/api?q=${text}&lat=${48.26284365040816}
      &lon=${11.668135345320982}
      &limit=5&osm_tag=building&osm_tag=highway&osm_tag=amenity&osm_tag=place:house&osm_tag=place:city&osm_tag=place:town&osm_tag=place:village&osm_tag=place:hamlet&osm_tag=place:suburb&lang=en`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGeneralState((prevState) => ({
          ...prevState,
          results: data.features,
          fetching: false,
        }));
      })
      .catch((error) => {
        setGeneralState((prevState) => ({
          ...prevState,
          fetching: false,
        }));
      });
  };

  const debouncedResults = useMemo(() => {
    return debounce(changeTextDebounced, 150);
  }, []);

  return (
    <>
      <View
        style={{
          paddingHorizontal: measurements.paddingHorizontal,
          marginTop: 10,
        }}
      >
        <InputField
          placeholder={"Where do you want to go?"}
          onChangeText={(t) => {
            debouncedResults(t);
            setGeneralState((prevState: any) => ({
              ...prevState,
              searchFor: t,
            }));
          }}
          defaultValue={generalState.searchFor || ""}
          autoFocus
          icon={
            !generalState.fetching ? (
              <View style={{ height: 24, width: 24 }} />
            ) : (
              <IconSpinner color={colors.text} />
            )
          }
        />
      </View>
      <FlatList
        keyboardShouldPersistTaps="always"
        style={{ backgroundColor: colors.background }}
        data={generalState.results}
        renderItem={({ item }: { item: any }) => {
          let text =
            (item.properties.street || item.properties.name) +
            (item.properties.housenumber
              ? " " + item.properties.housenumber
              : "") +
            (", " +
              (item.properties.city ||
                item.properties.county ||
                item.properties.state ||
                item.properties.country)) +
            (" " + (item.properties.district || ""));
          return (
            <View>
              <TextIconBackground
                icon={
                  item.properties.housenumber ? (
                    <HouseIcon color={colors.text} />
                  ) : item.properties.osm_key == "highway" ? (
                    <ArrowUpFromDotIcon color={colors.text} />
                  ) : (
                    <MapPinIcon color={colors.text} />
                  )
                }
                rightIcon={null}
                text={text}
                onPress={() => {
                  switch (local.search) {
                    case "from":
                      snap.setFromLat(item.geometry.coordinates[1]);
                      snap.setFromLon(item.geometry.coordinates[0]);
                      snap.setFromText(text);
                      break;
                    case "to":
                      snap.setToLat(item.geometry.coordinates[1]);
                      snap.setToLon(item.geometry.coordinates[0]);
                      snap.setToText(text);
                      break;
                    default:
                      alert("Something went wrong.");
                      break;
                  }
                  router.back();
                }}
              />
            </View>
          );
        }}
      />
      <View
        style={{
          bottom: insets.bottom,
          paddingHorizontal: measurements.paddingHorizontal,
        }}
      >
        <Button text="Continue" onPress={() => {}} />
      </View>
    </>
  );
}
