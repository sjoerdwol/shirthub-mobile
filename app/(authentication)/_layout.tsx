import { Stack } from "expo-router";

export default function AuthenticationLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: '#23272e',
      },
      headerTitleStyle: {
        color: '#e0e5eb',
      },
    }}>
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Sign Up" }} />
    </ Stack>
  );
} 