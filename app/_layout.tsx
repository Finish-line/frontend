import { SessionProvider } from "@/hooks/ctx";
import { ThemeProvider, _useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";

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

  return (
    <ThemeProvider>
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
