import { useAuth } from "@/contexts/authContext";
import { getPublicUserShirts } from "@/services/shirthub_public_collection";
import LoadingView from "@/views/loadingView";
import OtherUserCollectionView from "@/views/otherUserCollectionView";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserCollection() {
  const { session } = useAuth();
  const { id } = useLocalSearchParams();
  const [shirts, setShirts] = useState<Shirt[] | null>(null);
  const [loading, setLoading] = useState(true);

  let userId: string | null = null;
  if (typeof id === 'string') userId = id;
  else if (Array.isArray(id) && id.length > 0) userId = id[0];

  useEffect(() => {
    if (!session || !userId) {
      if (!userId) {
        const setLoadingFalse = async () => setLoading(false);
        setLoadingFalse();
      }
      return;
    }

    let active = true;
    const fetchShirts = async () => {
      try {
        const collection = await getPublicUserShirts(session, userId);
        if (active) setShirts(collection);
      } catch {
        if (active) setShirts(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchShirts();

    return () => { active = false; };
  }, [session, userId]);

  return (
    <SafeAreaView className="flex-1 bg-dark-background pb-24">
      <View className="flex-row items-center backdrop-blur-md px-4 pb-2 pt-3 justify-between border-b border-dark-border">
        <Pressable className="size-12 items-center justify-center" onPress={() => router.back()} testID="back_button">
          <Ionicons name="arrow-back" size={24} color='rgb(141, 157, 180)' />
        </Pressable>
        <Text className="text-white/80 text-3xl font-LexendBold tracking-tight text-center">Trikotsammlung</Text>
        <View className="size-12" />
      </View>
      {
        loading
          ? <LoadingView />
          : shirts
            ? <OtherUserCollectionView shirts={shirts} />
            : <Text className="text-red-500 text-lg font-medium text-center mt-8">Leider ist es aktuell nicht möglich, diese Sammlung zu laden. Bitte versuche es später nochmal.</Text>
      }
    </SafeAreaView>
  );
}
