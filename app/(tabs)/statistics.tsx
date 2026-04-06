import { useAuth } from "@/contexts/authContext";
import { useReferenceDataStore } from "@/stores/referenceDataStore";
import { useUserStatisticsStore } from "@/stores/statisticsStore";
import { handleStatisticsFetch } from "@/utils/handleStatisticsOperations";
import { handleReferenceData } from "@/utils/setReferenceData";
import LoadingView from "@/views/loadingView";
import StatisticsView from "@/views/statisticsView";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Statistics() {
  const { session } = useAuth();
  const { data, setReferenceData } = useReferenceDataStore((state) => state);
  const { hasChanged, userStatistics, setUserStatistics, setHasChanged } = useUserStatisticsStore((state) => state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const tasks = [];

      try {
        if ((!userStatistics || hasChanged) && session) { tasks.push(handleStatisticsFetch(session, setHasChanged, setUserStatistics)); }
        if (!data && session) { tasks.push(handleReferenceData(session, setReferenceData)); }
        await Promise.all(tasks);
      } catch (error) {
        console.error('Error while loading necessary data: ', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [data, hasChanged, session, userStatistics]);

  return (
    <SafeAreaView className="flex-1 bg-dark-background pb-24">
      <View className="flex-row items-center backdrop-blur-md px-4 pb-3.5 pt-[1.125rem] justify-center border-b border-dark-border">
        <Text className="text-white/80 text-3xl font-Lexend font-bold tracking-tight text-center">Meine Statistiken</Text>
      </View>
      {
        loading
          ? <LoadingView />
          : data && userStatistics
            ? <StatisticsView />
            : <Text className="text-red-500 text-lg font-medium text-center">Leider ist es aktuell nicht möglich, die nötigen Daten zu laden. Bitte versuche es später nochmal.</Text>
      }
    </SafeAreaView>
  );
}