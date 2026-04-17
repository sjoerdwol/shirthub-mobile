import StatisticsView from "@/views/statisticsView";
import { render, screen } from "@testing-library/react-native";
import mockData from "../data.json";

const mockShirt = mockData.shirt as unknown as Shirt;
const mockShirtWithoutSize = mockData.shirtWithoutSize as unknown as Shirt;
const mockUserStatistics = mockData.userStatistics as unknown as UserStatistics;

jest.mock('@/components/statistics/distributionSwitch', () => {
  const { View } = require('react-native');
  return () => <View testID="distribution_switch" />;
});

jest.mock('@/utils/handleStatisticsOperations', () => ({
  calculateAverageCondition: jest.fn(() => 8),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders stat box titles', () => {
  render(<StatisticsView shirts={[mockShirt]} userStatistics={mockUserStatistics} />);

  expect(screen.getByText('Gesamtwert')).toBeVisible();
  expect(screen.getByText('Durchschn. Wert')).toBeVisible();
  expect(screen.getByText('Anzahl Likes')).toBeVisible();
  expect(screen.getByText('Durchsch. Zustand')).toBeVisible();
});

it('renders the correct total shirt count in subtitle', () => {
  render(<StatisticsView shirts={[mockShirt]} userStatistics={mockUserStatistics} />);

  expect(screen.getByText('10 Trikots insgesamt')).toBeVisible();
});

it('renders the correct number of shirts with a value in subtitle', () => {
  render(<StatisticsView shirts={[mockShirt, mockShirtWithoutSize]} userStatistics={mockUserStatistics} />);

  // mockShirt has value=90, mockShirtWithoutSize has value=null
  expect(screen.getByText('1 Trikots mit Wert')).toBeVisible();
});

it('renders the distribution switch', () => {
  render(<StatisticsView shirts={[mockShirt]} userStatistics={mockUserStatistics} />);

  expect(screen.getByTestId('distribution_switch')).toBeVisible();
});

it('renders condition stat box with average condition value', () => {
  render(<StatisticsView shirts={[mockShirt]} userStatistics={mockUserStatistics} />);

  expect(screen.getByText('8 / 10')).toBeVisible();
});
