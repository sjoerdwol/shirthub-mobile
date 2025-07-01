import { Stack, router, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import './globals.css';

export default function RootLayout() {
  const authenticated = false;
  const segments = useSegments();

  useEffect(() => {
    if (authenticated && segments[0] === "(authentication)") {
      router.replace("/(tabs)");
    }
    if (!authenticated && segments[0] !== "(authentication)") {
      router.replace("/(authentication)/login");
    }
  }, [authenticated, segments]);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      {authenticated ? (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(authentication)" />
        </Stack>
      )}
    </SafeAreaProvider>
  );
}
