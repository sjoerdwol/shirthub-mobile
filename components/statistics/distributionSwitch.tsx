import SwitchButton from "@/components/buttons/switchButton";
import { useState } from "react";
import { Text, View } from "react-native";
import LeagueOverview from "./leagueOverview";
import TeamOverview from "./teamOverview";

export default function DistributionSwitch({ userStatistics }: { userStatistics: UserStatistics }) {
  const [activePage, setActivePage] = useState<0 | 1>(0);

  return (
    <View className="my-8 px-1">
      <View className="flex-row items-center justify-between">
        <Text className="font-LexendBold text-white/80 text-2xl">{activePage === 0 ? `Top Ligen` : 'Top Teams'}</Text>
        <SwitchButton activeIndex={activePage} options={['Ligen', 'Teams']} setActiveIndex={setActivePage} />
      </View>
      {
        activePage === 0
          ? <LeagueOverview leagueStats={userStatistics.league_stats} />
          : <TeamOverview teamStats={userStatistics.team_stats} />
      }
    </View>
  );
}