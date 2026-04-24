import TeamOverview from "@/components/statistics/teamOverview";
import { useReferenceDataStore } from "@/stores/referenceDataStore";
import { render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockTeamStatistics = mockData.userStatistics.team_stats;
const mockReferenceData: ReferenceData = {
  leagues: [],
  teams: [
    {
      key: 'fcbayern',
      name: 'FC Bayern München',
      nameShort: 'FCB',
      leagueKey: 'bundesliga',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

jest.mock('@/stores/referenceDataStore', () => ({
  useReferenceDataStore: jest.fn(),
}));

beforeEach(() => {
  (useReferenceDataStore as unknown as jest.Mock).mockImplementation((selector: (state: ReferenceDataState) => unknown) =>
    selector({ data: mockReferenceData, setReferenceData: jest.fn() })
  );
});

it('renders team name and shirt count when team key matches reference data', () => {
  render(<TeamOverview teamStats={mockTeamStatistics} />);

  expect(screen.getByText('FC Bayern München')).toBeVisible();
  expect(screen.getByText('3 Trikots')).toBeVisible();
});

it('renders the total team count footer', () => {
  render(<TeamOverview teamStats={mockTeamStatistics} />);

  expect(screen.getByText(`${mockTeamStatistics.length} Teams insgesamt`)).toBeVisible();
});

it('renders "Trikot" (singular) when shirtsCollected is 1', () => {
  const singleShirtStat = [
    {
      ...mockTeamStatistics[0],
      shirtsCollected: 1,
    },
  ];

  render(<TeamOverview teamStats={singleShirtStat} />);

  expect(screen.getByText('1 Trikot')).toBeVisible();
});

it('renders nothing for a team stat when the team key is not in reference data', () => {
  const unknownTeamStat = [
    {
      ...mockTeamStatistics[0],
      teamKey: 'unknown-team',
    },
  ];

  render(<TeamOverview teamStats={unknownTeamStat} />);

  expect(screen.queryByText('FC Bayern München')).toBeNull();
  expect(screen.getByText('1 Teams insgesamt')).toBeVisible();
});

it('renders multiple teams and applies isLast styling to the last item', () => {
  const multipleTeamStats = [
    ...mockTeamStatistics,
    {
      ...mockTeamStatistics[0],
      teamKey: 'bvb',
      shirtsCollected: 2,
    },
  ];

  const referenceDataWithTwo: ReferenceData = {
    ...mockReferenceData,
    teams: [
      ...mockReferenceData.teams,
      {
        key: 'bvb',
        name: 'Borussia Dortmund',
        nameShort: 'BVB',
        leagueKey: 'bundesliga',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };

  (useReferenceDataStore as unknown as jest.Mock).mockImplementation((selector: (state: ReferenceDataState) => unknown) =>
    selector({ data: referenceDataWithTwo, setReferenceData: jest.fn() })
  );

  render(<TeamOverview teamStats={multipleTeamStats} />);

  expect(screen.getByText('FC Bayern München')).toBeVisible();
  expect(screen.getByText('Borussia Dortmund')).toBeVisible();
  expect(screen.getByText('2 Teams insgesamt')).toBeVisible();
});
