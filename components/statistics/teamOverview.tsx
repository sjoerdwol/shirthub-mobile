import { useReferenceDataStore } from "@/stores/referenceDataStore";
import { Text, View } from "react-native";

export default function TeamOverview({ teamStats }: { teamStats: UserStatistics['team_stats'] }) {
  const { data } = useReferenceDataStore((state) => state);
  const sortedAndLimited = [...teamStats]
    .sort((a, b) => b.shirtsCollected - a.shirtsCollected)
    .slice(0, 5);

  const RenderItem = ({ item, isLast }: { item: UserStatistics['team_stats'][0]; isLast: boolean }) => {
    const team = data?.teams.find(team => team.key === item.teamKey);
    if (!team) return null;

    return (
      <View className={isLast ? "mb-8" : "border-b border-dark-border mb-4 pb-4"}>
        <View className="flex-row justify-between items-center">
          <Text className="font-LexendMedium text-white/70">{team.name}</Text>
          <Text className="font-LexendMedium text-white/50 text-sm">{item.shirtsCollected} {item.shirtsCollected === 1 ? 'Trikot' : 'Trikots'}</Text>
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
      <Text className="font-LexendMedium ml-1 text-white/50 text-sm">{teamStats.length} Teams insgesamt</Text>
    </View>
  );
}