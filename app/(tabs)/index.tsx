import { useAuth } from "@/contexts/authContext";
import { useShirtStore } from "@/stores/shirtStore";
import { handleShirtInitialFetch } from "@/utils/handleShirtOperations";
import HomepageView from "@/views/homepageView";
import LoadingView from "@/views/loadingView";
import Ionicons from "@react-native-vector-icons/ionicons";
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
  }, [session, setShirts]);

  return (
    <SafeAreaView className="flex-1 bg-dark-background pb-24">
      <View className="flex-row items-center backdrop-blur-md px-4 pb-2 pt-3 justify-between border-b border-dark-border">
        <View className="size-12 items-center justify-center">
          <Ionicons name="menu" size={24} color='rgb(141, 157, 180)' />
        </View>
        <Text className="text-white/80 text-3xl font-LexendBold tracking-tight text-center italic">ShirtHub</Text>
        <View className="items-center justify-center size-12">
          <Ionicons name="notifications" size={24} color='rgb(141, 157, 180)' />
        </View>
      </View>
      <View className="flex-1">
        <View className="px-5 py-5">
          <Text className="text-white/80 text-2xl font-LexendBold">Activity Feed</Text>
          <Text className="text-white/70 text-base font-Lexend">Entdecke was deine Freunde so gemacht haben</Text>
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