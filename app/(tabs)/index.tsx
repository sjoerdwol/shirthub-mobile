import { useAuth } from "@/contexts/authContext";
import { useShirtStore } from "@/stores/shirtStore";
import { handleShirtInitialFetch } from "@/utils/handleShirtOperations";
import HomepageView from "@/views/homepageView";
import LoadingView from "@/views/loadingView";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const { session } = useAuth();
  const { setShirts } = useShirtStore(state => state);
  const [loading, setLoading] = useState(true);

  if (!session) {
    /* session cannot be null since root _layout.tsx would redirect to login / signup */
    return;
  }

  // TODO: Replace this fetch with notification fetch after notifications have been implemented
  useEffect(() => {
    const initialShirtFetch = async () => {
      await handleShirtInitialFetch(session, setShirts);
      setLoading(false);
    };

    initialShirtFetch();
  }, [session, setShirts]);

  return (
    <View className="flex-1 bg-vanillaCream pb-24">
      <View className="px-5 pt-6 pb-4">
        <Text className="text-ashBrown text-2xl font-bold font-Lexend">Activity Feed</Text>
        <Text className="text-ashBrown/80 text-base font-Lexend">Entdecke was deine Freunde so gemacht haben</Text>
      </View>
      {
        loading
          ? <LoadingView />
          : <HomepageView />
      }
    </View>
  );
}