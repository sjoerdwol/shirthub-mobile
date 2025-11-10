interface ReferenceData {
  teams: Array<{
    key: string;
    leagueKey: string;
    name: string;
    nameShort: string;
    createdAt: Date;
    updatedAt: Date
  }>,
  leagues: Array<{
    key: string;
    name: string;
    teamCount: number;
    teams: Array<string>;
    createdAt: Date;
    updatedAt: Date
  }>
}

interface ReferenceDataState {
  data: ReferenceData | null;
  setReferenceData: (data: ReferenceData) => void;
}