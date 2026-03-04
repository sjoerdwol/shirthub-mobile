import { useAuth } from "@/contexts/authContext";
import { useShirtStore } from "@/stores/shirtStore";
import { handleShirtInitialFetch } from "@/utils/handleShirtOperations";
import HomepageView from "@/views/homepageView";
import LoadingView from "@/views/loadingView";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { session } = useAuth();
  const { setShirts } = useShirtStore(state => state);
  const [loading, setLoading] = useState(true);

  // TODO: Replace this fetch with notification fetch after notifications have been implemented
  useEffect(() => {
    if (!session) { return; }
    const initialShirtFetch = async () => {
      await handleShirtInitialFetch(session, setShirts);
      setLoading(false);
    };

    initialShirtFetch();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-vanillaCream pb-24">
      <View className="flex-row items-center bg-vanillaCream/80 backdrop-blur-md px-4 pb-2 pt-3 justify-between border-b border-ashBrown/15">
        <View className="size-12 items-center justify-center">
          <Ionicons name="menu" size={24} color='#6C584C' />
        </View>
        <Text className="text-ashBrown text-3xl font-Lexend font-bold tracking-tight text-center italic">ShirtHub</Text>
        <View className="items-center justify-center rounded-full size-12 bg-mutedOlive/25">
          <Ionicons name="notifications" size={24} color='#606C38' />
        </View>
      </View>
      <View className="flex-1">
        <View className="px-5 py-5">
          <Text className="text-ashBrown text-2xl font-bold font-Lexend">Activity Feed</Text>
          <Text className="text-ashBrown/80 text-base font-Lexend">Entdecke was deine Freunde so gemacht haben</Text>
        </View>
        {
          loading
            ? <LoadingView />
            : <HomepageView />
        }
      </View>
    </SafeAreaView>
  );
}