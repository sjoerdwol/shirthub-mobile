import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import './globals.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  );
}
