import OtherUserStatisticsView from "@/views/otherUserStatisticsView";
import { render, screen } from "@testing-library/react-native";
import mockData from "../data.json";

const mockUserStatistics = mockData.userStatistics as unknown as UserStatistics;

jest.mock('@/components/statistics/distributionSwitch', () => {
  const { View } = require('react-native');
  return () => <View testID="distribution_switch" />;
});

it('renders the total value stat box', () => {
  render(<OtherUserStatisticsView userStatistics={mockUserStatistics} />);

  expect(screen.getByText('500,00 €')).toBeVisible();
  expect(screen.getByText('10 Trikots insgesamt')).toBeVisible();
  expect(screen.getByText('Gesamtwert')).toBeVisible();
});

it('renders the average value stat box', () => {
  render(<OtherUserStatisticsView userStatistics={mockUserStatistics} />);

  expect(screen.getByText('50,00 €')).toBeVisible();
  expect(screen.getByText('Durchschn. Wert')).toBeVisible();
});

it('renders the distribution switch', () => {
  render(<OtherUserStatisticsView userStatistics={mockUserStatistics} />);

  expect(screen.getByTestId('distribution_switch')).toBeVisible();
});
