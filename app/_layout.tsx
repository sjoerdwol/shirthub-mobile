import { AuthContextProvider, useAuth } from "@/contexts/authContext";
import { useFonts } from "expo-font";
import { Stack, router, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import './globals.css';

// Create a global setter for menu visibility
let setMenuVisible: ((visible: boolean) => void) | null = null;

export const setMenuVisibleGlobal = (setter: (visible: boolean) => void) => {
  setMenuVisible = setter;
};

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
      {session ? (
        <>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="shirts/[id]" />
          <Stack.Screen name="shirts/manage" />
        </>
      ) : (
        <Stack.Screen name="(authentication)" />
      )}
    </Stack >
  );
};

export default function RootLayout() {
  const [loaded] = useFonts({
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

  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <StatusBar style="dark" />
        <Root />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}