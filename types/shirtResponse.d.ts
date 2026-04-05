interface ShirtResponse {
  id: string;
  ownerId: string;
  team: string;
  teamKey: string;
  leagueKey: string;
  season: string;
  type: string;
  condition: number;
  printName: string | null;
  printNumber: number | null;
  size: string | null;
  value: number | null;
  createdAt: Date;
  updatedAt: Date;
}