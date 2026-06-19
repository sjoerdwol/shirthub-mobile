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
      <View className={isLast ? "mb-8" : "mb-4"}>
        <View className="flex-row justify-between items-center">
          <Text className="font-LexendMedium text-white/70">{league.name}</Text>
          <Text className="font-LexendMedium text-white/50 text-sm">{item.distinctTeamsCollected} / {league.teamCount} Teams</Text>
        </View>
        <View className="bg-dark-secondaryBackground h-2 mt-2 overflow-hidden rounded">
          <View
            className="bg-dark-highlight h-full rounded"
            style={{ width: `${item.percentageCollected * 100}%` }}
          />
        </View>
      </View>
    );
  };

  return (
    <View className="border border-dark-border mt-4 p-5 rounded-2xl">
      {sortedAndLimited.map((item, index) => (
        <RenderItem
          key={sortedAndLimited.indexOf(item)}
          item={item}
          isLast={index === sortedAndLimited.length - 1}
        />
      ))}
      <Text className="font-LexendMedium ml-1 text-white/50 text-sm">{leagueStats.length} Ligen insgesamt</Text>
    </View>
  );
}