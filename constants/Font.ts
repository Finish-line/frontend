import { Platform } from "react-native";

export const font = {
  largestTitle: 42,
  largeTitle: Platform.select({ ios: 34, android: 41 }),
  title1: Platform.select({ ios: 28, android: 29 }),
  title2: 24,
  title3: 20,
  headline: 17,
  body: Platform.select({ ios: 17, android: 14 }),
  bodyImportant: Platform.select({ ios: 17, android: 16 }),
  subtitle: Platform.select({ ios: 15, android: 14 }),
  caption: 12,
};
