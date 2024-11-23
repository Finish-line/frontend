import React from "react";
import { Marker } from "react-native-maps";

interface SinglePersonMarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

const SinglePersonMarker: React.FC<SinglePersonMarkerProps> = ({
  coordinate,
}) => {
  return (
    <Marker
      coordinate={coordinate}
      pinColor="#2196F3" // You can customize this color
      title="Your Location"
    />
  );
};

export default SinglePersonMarker;
