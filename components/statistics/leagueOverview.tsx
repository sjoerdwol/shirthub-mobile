import { useReferenceDataStore } from "@/stores/referenceDataStore";
import { Text, View } from "react-native";

export default function LeagueOverview({ leagueStats }: { leagueStats: UserStatistics['league_stats'] }) {
  const { data } = useReferenceDataStore((state) => state);
  const sortedAndLimited = [...leagueStats]
    .sort((a, b) => b.percentageCollected - a.percentageCollected)
    .slice(0, 5);

  const RenderItem = ({ item, isLast }: { item: UserStatistics['league_stats'][0]; isLast: boolean }) => {
    const league = data?.leagues.find(league => league.key === item.leagueKey);

    if (!league) return null;

    return (
      <View className={isLast ? "mb-0" : "mb-4"}>
        <View className="flex-row justify-between items-center">
          <Text className="text-dark-text-400 text-base font-medium">{league.name}</Text>
          <Text className="text-gray-300 text-sm font-medium">{item.distinctTeamsCollected} / {league.teamCount} Teams</Text>
        </View>
        <View className="h-2 rounded overflow-hidden mt-2 bg-dark-background-200">
          <View
            className="h-full bg-green-600 rounded"
            style={{ width: `${item.percentageCollected * 100}%` }}
          />
        </View>
      </View>
    );
  };

  return (
    <View className="p-5 rounded-2xl bg-dark-background-300">
      {sortedAndLimited.map((item, index) => (
        <RenderItem
          key={sortedAndLimited.indexOf(item)}
          item={item}
          isLast={index === sortedAndLimited.length - 1}
        />
      ))}
    </View>
  );
}