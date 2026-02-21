import HeaderIcon from "@/components/ui/headerIcon";
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
              headerLeft: () => <HeaderIcon name='chevron-back' size={28} color='#e0e5eb' className='mr-10' onPress={() => router.back()} />,
              headerRight: () => <HeaderIcon name='ellipsis-horizontal' size={28} color='#e0e5eb' className="mr-2" onPress={() => setMenuVisible?.(true)} />
            }}
          />
          <Stack.Screen
            name="shirts/manage"
            options={{
              title: '',
              headerLeft: () => <HeaderIcon name='chevron-back' size={28} color='#e0e5eb' className='mr-10' onPress={() => router.back()} />
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
