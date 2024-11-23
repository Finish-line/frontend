import { color } from "@/constants/Colors";
import { font } from "@/constants/Font";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

const spreadStyle = (style: StyleProp<TextStyle>) => (style ?? {}) as object;

export const TextBase = (props: TextProps) => {
  const { colors } = useThemeColor();

  return (
    <Text
      {...props}
      style={{ color: colors.text, ...spreadStyle(props.style) }}
    >
      {props.children}
    </Text>
  );
};

export const Title3 = (props: TextProps) => (
  <TextBase
    {...props}
    style={{ fontSize: font.title3, ...spreadStyle(props.style) }}
  >
    {props.children}
  </TextBase>
);

export const Title2 = (props: TextProps) => (
  <TextBase
    {...props}
    style={{ fontSize: font.title2, ...spreadStyle(props.style) }}
  >
    {props.children}
  </TextBase>
);

export const Title1 = (props: TextProps) => (
  <TextBase
    {...props}
    style={{ fontSize: font.title1, ...spreadStyle(props.style) }}
  >
    {props.children}
  </TextBase>
);

export const Body = (props: TextProps) => (
  <TextBase
    {...props}
    style={{ fontSize: font.body, ...spreadStyle(props.style) }}
  >
    {props.children}
  </TextBase>
);

export const ImportantBody = (props: TextProps) => (
  <Body {...props} style={{ fontSize: 16, ...spreadStyle(props.style) }}>
    {props.children}
  </Body>
);

export const Subtitle = (props: TextProps) => (
  <TextBase
    {...props}
    style={{
      fontSize: font.subtitle,
      color: color.gray,
      ...spreadStyle(props.style),
    }}
  >
    {props.children}
  </TextBase>
);

export const Caption = (props: TextProps) => (
  <TextBase
    {...props}
    style={{
      fontSize: font.caption,
      color: color.gray,
      fontWeight: "bold",
      ...spreadStyle(props.style),
    }}
  >
    {props.children}
  </TextBase>
);
