interface ReferenceTeam {
  key: string;
  name: string;
  nameShort: string;
  leagueKey: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ReferenceTeamState {
  teams: Array<ReferenceTeam>;
  setTeams: (teams: Array<ReferenceTeam>) => void;
}