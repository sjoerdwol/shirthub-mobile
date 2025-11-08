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
      <View className={isLast ? "mb-0" : "mb-4 border-b border-dark-background-200 pb-4"}>
        <View className="flex-row justify-between items-center">
          <Text className="text-dark-text-400 text-base font-medium">{team.name}</Text>
          <Text className="text-green-600 text-sm font-bold">{item.shirtsCollected} {item.shirtsCollected === 1 ? 'shirt' : 'shirts'}</Text>
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