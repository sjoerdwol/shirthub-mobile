import { Stack } from "expo-router";

export default function AuthenticationLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      headerBackVisible: false
    }}>
      <Stack.Screen name="index" />
    </Stack>
  );
} 