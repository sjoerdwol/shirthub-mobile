import { AuthContextProvider, useAuth } from "@/contexts/authContext";
import '@/nativewind-interop';
import { useFonts } from "expo-font";
import { Stack, router, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import './globals.css';

// Keep the native splash screen visible until the custom fonts have loaded.
SplashScreen.preventAutoHideAsync();

const Root = () => {
  const { loading, session } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (loading) { return; }

    const inAuthGroup = segments[0] === "(authentication)";

    if (!session && !inAuthGroup) {
      router.replace("/(authentication)");
    } else if (session && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [session, segments, loading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="shirts/[id]" />
        <Stack.Screen name="shirts/manage" />
        <Stack.Screen name="settings" />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(authentication)" />
      </Stack.Protected>
    </Stack>
  );
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Lexend": require("../assets/fonts/Lexend-Regular.ttf"),
    "Lexend-Medium": require("../assets/fonts/Lexend-Medium.ttf"),
    "Lexend-SemiBold": require("../assets/fonts/Lexend-SemiBold.ttf"),
    "Lexend-Bold": require("../assets/fonts/Lexend-Bold.ttf"),
    "Lexend-BoldItalic": require("../assets/fonts/Lexend-BoldItalic.ttf"),
    "Lexend-ExtraBold": require("../assets/fonts/Lexend-ExtraBold.ttf"),
    "Lexend-Black": require("../assets/fonts/Lexend-Black.ttf"),
    "Lexend-Light": require("../assets/fonts/Lexend-Light.ttf"),
    "Lexend-ExtraLight": require("../assets/fonts/Lexend-ExtraLight.ttf"),
    "Lexend-Thin": require("../assets/fonts/Lexend-Thin.ttf")
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
    <SafeAreaProvider>
      <AuthContextProvider>
        <StatusBar style="light" />
        <Root />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}