import { Stack } from "expo-router";

export default function AuthenticationLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      headerBackVisible: false,
      headerStyle: {
        backgroundColor: '#23272e',
      },
      headerTitleStyle: {
        color: '#e0e5eb',
      },
    }}>
      <Stack.Screen name="index" options={{ title: "Authentication" }} />
    </Stack>
  );
} 