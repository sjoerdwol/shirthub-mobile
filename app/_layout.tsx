import HeaderIcon from "@/components/ui/headerIcon";
import { AuthContextProvider, useAuth } from "@/contexts/authContext";
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
        <Stack screenOptions={{
          headerBackButtonDisplayMode: 'minimal',
          headerStyle: {
            backgroundColor: '#23272e',
          },
          headerTintColor: '#e0e5eb',
          headerTitleStyle: {
            color: '#e0e5eb',
          },
        }}>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="shirts/[id]"
            options={{
              title: '',
              headerLeft: () => <HeaderIcon name='chevron-back' size={28} color='#e0e5eb' onPress={() => router.back()} />,
              headerRight: () => <HeaderIcon name='ellipsis-horizontal' size={28} color='#e0e5eb' onPress={() => setMenuVisible?.(true)} />
            }}
          />
          <Stack.Screen
            name="shirts/manage"
            options={{
              title: '',
              headerLeft: () => <HeaderIcon name='chevron-back' size={28} color='#e0e5eb' onPress={() => router.back()} />
            }} />
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
        <StatusBar style="light" />
        <Root />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}
