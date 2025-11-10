import LeagueOverview from "@/components/statistics/leagueOverview";
import StatBox from "@/components/statistics/statBox";
import TeamOverview from "@/components/statistics/teamOverview";
import { useAuth } from "@/contexts/authContext";
import { getUserStatistics } from "@/services/shirthub_statistics";
import { useReferenceDataStore } from "@/stores/referenceDataStore";
import { useUserStatisticsStore } from "@/stores/statisticsStore";
import { handleReferenceData } from "@/utils/setReferenceData";
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Statistics() {
  const { session } = useAuth();
  const { hasChanged, userStatistics, setUserStatistics, setHasChanged } = useUserStatisticsStore((state) => state);
  const [loading, setLoading] = useState(true);
  const { data, setReferenceData } = useReferenceDataStore((state) => state);

  useEffect(() => {
    const fetchUserStatistics = async () => {
      if (userStatistics !== null) {
        if (!hasChanged) {
          setLoading(false);
          return;
        }
      }
      const userStats = await getUserStatistics(session!);
      setUserStatistics(userStats);
      setHasChanged(false);
      setLoading(false);
    }

    const loadReferenceData = async () => {
      if (data) return;
      await handleReferenceData(session!, setReferenceData);
    };

    fetchUserStatistics();
    loadReferenceData();
  }, [session, setUserStatistics, hasChanged]);

  return (
    <ScrollView className="flex-1 bg-dark-background-400 p-4">
      {
        loading ?
          (
            <Text className="text-dark-text-400">Loading...</Text>
          ) : (
            userStatistics === null ?
              (
                <Text className="text-red-500 text-center my-5">Error: Unable to load statistics</Text>
              ) : (
                <>
                  <View className="mb-8" testID="stats-section">
                    <View className="flex-row justify-between mb-4">
                      <StatBox
                        currencyVisible={false}
                        title="Total Shirts"
                        value={userStatistics.general_stats.totalShirtsCount}
                        icon={<Ionicons name="shirt" size={18} color="#ef4444" style={{ margin: 0, padding: 0, marginRight: 8 }} />}
                      />
                      <StatBox
                        currencyVisible={false}
                        title="Average Condition"
                        value={`8.6 / 10`}
                        icon={<Ionicons name="disc" size={18} color="#F59E0B" style={{ margin: 0, padding: 0, marginRight: 8 }} />}
                      />
                    </View>
                    <View className="flex-row justify-between mb-4">
                      <StatBox
                        currencyVisible={false}
                        title="Different Leagues"
                        value={userStatistics.general_stats.distinctLeaguesCount}
                        icon={<Ionicons name="checkmark-circle" size={18} color="#60a5fa" style={{ margin: 0, padding: 0, marginRight: 8 }} />}
                      />
                      <StatBox
                        currencyVisible={false}
                        title="Different Teams"
                        value={userStatistics.general_stats.distinctTeamsCount}
                        icon={<Ionicons name="checkmark-circle" size={18} color="#facc15" style={{ margin: 0, padding: 0, marginRight: 8 }} />}
                      />
                    </View>
                    <View className="flex-row justify-between">
                      <StatBox
                        currencyVisible
                        title="Total Value"
                        value={userStatistics.general_stats.totalValue}
                        icon={<Ionicons name="cash" size={18} color="#16a34a" style={{ margin: 0, padding: 0, marginRight: 8 }} />}
                      />
                      <StatBox
                        currencyVisible
                        title="Average Value"
                        value={userStatistics.general_stats.averageValue}
                        icon={<FontAwesome5 name="money-bill-wave" size={16} color="#16a34a" style={{ margin: 0, padding: 0, marginRight: 8 }} />}
                      />
                    </View>
                  </View>
                  <View className="mb-8" testID="league-stats-section">
                    <Text className="font-bold text-xl text-dark-text-400 mb-5">Top Leagues</Text>
                    <LeagueOverview leagueStats={userStatistics.league_stats} />
                  </View>
                  <View className="mb-8" testID="team-stats-section">
                    <Text className="font-bold text-xl text-dark-text-400 mb-5">Top Teams</Text>
                    <TeamOverview teamStats={userStatistics.team_stats} />
                  </View>
                </>
              )
          )
      }
    </ScrollView>
  );
}