import LeagueOverview from "@/components/statistics/leagueOverview";
import StatBox from "@/components/statistics/statBox";
import TeamOverview from "@/components/statistics/teamOverview";
import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function StatisticsView() {
  return (
    <Animated.View
      className="flex-1 p-4 mt-2"
      entering={FadeIn.duration(500)}
    >
      <View className="flex-row gap-4">
        <StatBox
          currencyVisible
          title='Gesamtwert'
          value={100.00}
        />
        <StatBox
          currencyVisible
          title='Durchschn. Wert'
          value={100.00}
        />
      </View>
    </Animated.View>
  );
}