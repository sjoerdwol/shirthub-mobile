import { AuthContextProvider, useAuth } from "@/contexts/authContext";
import { Stack, router, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import './globals.css';

const Root = () => {
  const { session } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (session && segments[0] === "(authentication)") {
      router.replace("/(tabs)");
    }
    if (!session && segments[0] !== "(authentication)") {
      router.replace("/(authentication)");
    }
  }, [session, segments]);

  return (
    <>
      {session ? (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(authentication)" />
        </Stack>
      )}
    </>
  );
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <StatusBar style="auto" />
        <Root />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}
