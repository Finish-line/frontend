import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View } from "react-native";

import Button from "./button";
import { Body } from "./text/text";
import { RefreshCwIcon } from "lucide-react-native";

export default function ReloadComponent({
  body,
  onReload,
  reloadText = "Reload",
}: {
  body: string;
  onReload: () => void;
  reloadText?: string;
}) {
  const { colors } = useThemeColor();
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Body
        style={{
          color: colors.border,
          textAlign: "center",
          marginBottom: 5,
        }}
      >
        {body}
      </Body>
      <Button
        smallButton
        variant="outline"
        icon={<RefreshCwIcon color={colors.text} />}
        text={reloadText}
        onPress={onReload}
      />
    </View>
  );
}
