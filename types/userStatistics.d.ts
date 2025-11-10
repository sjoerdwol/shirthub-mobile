interface UserStatistics {
  general_stats: {
    ownerId: string;
    totalShirtsCount: number;
    distinctLeaguesCount: number;
    distinctTeamsCount: number;
    totalValue: number;
    averageValue: number;
  },
  league_stats: Array<
    {
      ownerId: string;
      leagueKey: string;
      distinctTeamsCollected: number;
      collectedTeamsKeys: string[];
      percentageCollected: number;
    }
  >,
  team_stats: Array<
    {
      ownerId: string;
      teamKey: string;
      shirtsCollected: number;
      homeShirtsCollected: number;
      awayShirtsCollected: number;
      thirdShirtsCollected: number;
      keeperShirtsCollected: number;
      specialShirtsCollected: number;
      totalValue: number;
      averageValue: number;
    }
  >
}

interface UserStatisticsStore {
  hasChanged: boolean;
  userStatistics: UserStatistics | null;
  setHasChanged: (hasChanged: boolean) => void;
  setUserStatistics: (userStatistics: UserStatistics) => void;
}