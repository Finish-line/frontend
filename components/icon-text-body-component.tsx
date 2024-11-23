import { ImportantBody, Title2 } from "@/components/text/text";
import React from "react";
import { View, ViewStyle } from "react-native";

export default function IconTextBodyComponent({
  icon,
  title,
  body,
  style,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  style?: ViewStyle;
}) {
  // Icon has to have a size of 72 pixels
  return (
    <View style={{ alignItems: "center", ...style }}>
      {icon}
      <Title2 style={{ marginTop: 10, fontWeight: "bold" }}>{title}</Title2>
      <ImportantBody style={{ textAlign: "center" }}>{body}</ImportantBody>
    </View>
  );
}
