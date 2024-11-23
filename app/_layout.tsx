import { SessionProvider } from "@/hooks/ctx";
import {_useThemeColor, ThemeProvider } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";




import { Magic } from '@magic-sdk/react-native-expo'

import { Themes } from "@/constants/Colors";


const magic = new Magic('pk_live_847C5550E8FD0C27')

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
    return null;
  }
  return (
  <ThemeProvider >
   <SessionProvider>
        <magic.Relayer />
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
