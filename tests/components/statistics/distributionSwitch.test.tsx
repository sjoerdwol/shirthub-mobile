import DistributionSwitch from "@/components/statistics/distributionSwitch";
import { fireEvent, render, screen } from "@testing-library/react-native";
import mockData from '../../data.json';

const mockUserStatistics = mockData.userStatistics;

jest.mock('@/components/statistics/leagueOverview', () => {
  const { View, Text } = require('react-native');
  return () => <View><Text testID="league_overview">LeagueOverview</Text></View>;
});

jest.mock('@/components/statistics/teamOverview', () => {
  const { View, Text } = require('react-native');
  return () => <View><Text testID="team_overview">TeamOverview</Text></View>;
});

it('renders the league title and LeagueOverview by default', () => {
  render(<DistributionSwitch userStatistics={mockUserStatistics} />);

  expect(screen.getByText('Top Ligen')).toBeVisible();
  expect(screen.getByTestId('league_overview')).toBeVisible();
  expect(screen.queryByTestId('team_overview')).toBeNull();
});

it('renders the team title and TeamOverview after pressing the Teams switch button', () => {
  render(<DistributionSwitch userStatistics={mockUserStatistics} />);

  fireEvent.press(screen.getByText('Teams'));

  expect(screen.getByText('Top Teams')).toBeVisible();
  expect(screen.getByTestId('team_overview')).toBeVisible();
  expect(screen.queryByTestId('league_overview')).toBeNull();
});

it('switches back to LeagueOverview after pressing Ligen', () => {
  render(<DistributionSwitch userStatistics={mockUserStatistics} />);

  fireEvent.press(screen.getByText('Teams'));
  fireEvent.press(screen.getByText('Ligen'));

  expect(screen.getByText('Top Ligen')).toBeVisible();
  expect(screen.getByTestId('league_overview')).toBeVisible();
  expect(screen.queryByTestId('team_overview')).toBeNull();
});
