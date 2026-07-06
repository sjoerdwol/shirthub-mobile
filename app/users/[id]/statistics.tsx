import { useAuth } from "@/contexts/authContext";
import { getPublicUserStatistics } from "@/services/shirthub_public_collection";
import { useReferenceDataStore } from "@/stores/referenceDataStore";
import { handleReferenceData } from "@/utils/setReferenceData";
import LoadingView from "@/views/loadingView";
import OtherUserStatisticsView from "@/views/otherUserStatisticsView";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserStatistics() {
  const { session } = useAuth();
  const { id } = useLocalSearchParams();
  const { data, setReferenceData } = useReferenceDataStore((state) => state);
  const [statistics, setStatistics] = useState<UserStatistics | null>(null);
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
    const fetchStatistics = async () => {
      try {
        const tasks: Promise<unknown>[] = [getPublicUserStatistics(session, userId)];
        if (!data) tasks.push(handleReferenceData(session, setReferenceData));
        const [stats] = await Promise.all(tasks);
        if (active) setStatistics(stats as UserStatistics);
      } catch {
        if (active) setStatistics(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchStatistics();

    return () => { active = false; };
  }, [session, userId, data, setReferenceData]);

  return (
    <SafeAreaView className="flex-1 bg-dark-background pb-24">
      <View className="flex-row items-center backdrop-blur-md px-4 pb-2 pt-3 justify-between border-b border-dark-border">
        <Pressable className="size-12 items-center justify-center" onPress={() => router.back()} testID="back_button">
          <Ionicons name="arrow-back" size={24} color='rgb(141, 157, 180)' />
        </Pressable>
        <Text className="text-white/80 text-3xl font-LexendBold tracking-tight text-center">Statistiken</Text>
        <View className="size-12" />
      </View>
      {
        loading
          ? <LoadingView />
          : statistics && data
            ? <OtherUserStatisticsView userStatistics={statistics} />
            : <Text className="text-red-500 text-lg font-medium text-center mt-8">Leider ist es aktuell nicht möglich, diese Statistiken zu laden. Bitte versuche es später nochmal.</Text>
      }
    </SafeAreaView>
  );
}
