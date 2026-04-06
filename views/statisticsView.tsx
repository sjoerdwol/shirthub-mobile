import DistributionSwitch from "@/components/statistics/distributionSwitch";
import StatBox from "@/components/statistics/statBox";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function StatisticsView({ shirts, userStatistics }: { shirts: Array<Shirt>, userStatistics: UserStatistics }) {
  return (
    <Animated.View
      className="flex-1 p-4 mt-2"
      entering={FadeIn.duration(500)}
    >
      <View className="flex-row gap-4">
        <StatBox
          currencyVisible
          icon={<MaterialIcons name="inventory-2" size={16} color='rgb(141, 157, 180)' />}
          subtitle={`${userStatistics.general_stats.totalShirtsCount} Trikots insgesamt`}
          title='Gesamtwert'
          value={userStatistics.general_stats.totalValue}
        />
        <StatBox
          currencyVisible
          icon={<MaterialIcons name="inventory-2" size={16} color='rgb(141, 157, 180)' />}
          subtitle={`${shirts.filter((shirt) => shirt.value).length} Trikots mit Wert`}
          title='Durchschn. Wert'
          value={userStatistics.general_stats.averageValue}
        />
      </View>
      <DistributionSwitch userStatistics={userStatistics} />
    </Animated.View>
  );
}