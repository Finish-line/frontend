import "react-native-get-random-values";
import { SessionProvider } from "@/hooks/ctx";
import {_useThemeColor, ThemeProvider } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { magicAuth } from "@/auth/auth";
import { View, Text } from "react-native";

import "expo-crypto";



SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Unbounded-Black": require("@/assets/fonts/Unbounded_900Black.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const magic = magicAuth;

  if(!magic) {
    return <View><Text>Loading...</Text></View>
  }
  
  return (
  <ThemeProvider >
    <magic.Relayer />
   <SessionProvider>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen
              name="(main)"
              options={{
                title: "Home",
                headerBackVisible: false,
                headerShown: false,
              }}
              />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
        </SessionProvider>
   
      </ThemeProvider>
  );


  
}
