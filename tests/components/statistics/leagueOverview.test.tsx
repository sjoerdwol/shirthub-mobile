import LeagueOverview from "@/components/statistics/leagueOverview";
import { useReferenceDataStore } from "@/stores/referenceDataStore";
import { render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockLeagueStatistics = mockData.userStatistics.league_stats;
const mockReferenceData: ReferenceData = {
  leagues: [
    {
      key: 'bundesliga',
      name: 'Bundesliga',
      teamCount: 18,
      teams: ['team-1', 'team-2'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  teams: [],
};

jest.mock('@/stores/referenceDataStore', () => ({
  useReferenceDataStore: jest.fn(),
}));

beforeEach(() => {
  (useReferenceDataStore as unknown as jest.Mock).mockImplementation((selector: (state: ReferenceDataState) => unknown) =>
    selector({ data: mockReferenceData, setReferenceData: jest.fn() })
  );
});

it('renders league name and team count when league key matches reference data', () => {
  render(<LeagueOverview leagueStats={mockLeagueStatistics} />);

  expect(screen.getByText('Bundesliga')).toBeVisible();
  expect(screen.getByText('4 / 18 Teams')).toBeVisible();
});

it('renders the total league count footer', () => {
  render(<LeagueOverview leagueStats={mockLeagueStatistics} />);

  expect(screen.getByText(`${mockLeagueStatistics.length} Ligen insgesamt`)).toBeVisible();
});

it('renders nothing for a league stat when the league key is not in reference data', () => {
  const unknownLeagueStat = [
    {
      ownerId: 'user-1',
      leagueKey: 'unknown-league',
      distinctTeamsCollected: 2,
      collectedTeamsKeys: ['team-x'],
      percentageCollected: 0.1,
    },
  ];

  render(<LeagueOverview leagueStats={unknownLeagueStat} />);

  expect(screen.queryByText('Bundesliga')).toBeNull();
  expect(screen.getByText('1 Ligen insgesamt')).toBeVisible();
});

it('renders multiple leagues and applies isLast styling to the last item', () => {
  const referenceDataWithTwo: ReferenceData = {
    ...mockReferenceData,
    leagues: [
      ...mockReferenceData.leagues,
      {
        key: 'premier-league',
        name: 'Premier League',
        teamCount: 20,
        teams: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };

  (useReferenceDataStore as unknown as jest.Mock).mockImplementation((selector: (state: ReferenceDataState) => unknown) =>
    selector({ data: referenceDataWithTwo, setReferenceData: jest.fn() })
  );

  render(<LeagueOverview leagueStats={mockLeagueStatistics} />);

  expect(screen.getByText('Bundesliga')).toBeVisible();
  expect(screen.getByText('Premier League')).toBeVisible();
  expect(screen.getByText('2 Ligen insgesamt')).toBeVisible();
});
