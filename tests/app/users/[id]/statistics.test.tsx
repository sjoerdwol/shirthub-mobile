import UserStatistics from "@/app/users/[id]/statistics";
import { useAuth } from "@/contexts/authContext";
import { getPublicUserStatistics } from "@/services/shirthub_public_collection";
import { handleReferenceData } from "@/utils/setReferenceData";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../../data.json";

const mockSession = mockData.session;
const mockStatistics = mockData.userStatistics as unknown as UserStatistics;
const mockBack = jest.fn();
const mockSetReferenceData = jest.fn();

// Configurable reference data returned by the store mock.
let mockReferenceData: unknown = { leagues: [], teams: [], sizes: [] };

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/services/shirthub_public_collection', () => ({
  getPublicUserShirts: jest.fn(),
  getPublicUserStatistics: jest.fn(),
}));
jest.mock('@/utils/setReferenceData', () => ({ handleReferenceData: jest.fn() }));
jest.mock('@/stores/referenceDataStore', () => ({
  useReferenceDataStore: (selector: (state: unknown) => unknown) =>
    selector({ data: mockReferenceData, setReferenceData: mockSetReferenceData }),
}));
jest.mock('expo-router', () => ({
  router: { back: jest.fn() },
  useLocalSearchParams: jest.fn(),
}));

jest.mock('@/views/loadingView', () => {
  const { View } = require('react-native');
  return () => <View testID="loading_view" />;
});

jest.mock('@/views/otherUserStatisticsView', () => {
  const { Text } = require('react-native');
  return ({ userStatistics }: { userStatistics: UserStatistics }) => (
    <Text testID="statistics_view">{userStatistics.general_stats.totalShirtsCount}</Text>
  );
});

beforeEach(() => {
  jest.clearAllMocks();
  mockReferenceData = { leagues: [], teams: [], sizes: [] };

  const { router, useLocalSearchParams } = require('expo-router');
  router.back = mockBack;
  (useLocalSearchParams as jest.Mock).mockReturnValue({ id: 'user-1' });

  (useAuth as jest.Mock).mockReturnValue({ session: mockSession });
  (getPublicUserStatistics as jest.Mock).mockResolvedValue(mockStatistics);
  (handleReferenceData as jest.Mock).mockResolvedValue(undefined);
});

it('shows the loading view before the statistics resolve', () => {
  (getPublicUserStatistics as jest.Mock).mockReturnValue(new Promise(() => {}));

  render(<UserStatistics />);

  expect(screen.getByTestId('loading_view')).toBeVisible();
});

it('fetches and renders the statistics', async () => {
  render(<UserStatistics />);
  await act(async () => {});

  expect(getPublicUserStatistics).toHaveBeenCalledWith(mockSession, 'user-1');
  expect(screen.getByTestId('statistics_view')).toHaveTextContent('10');
});

it('loads reference data when it is not present yet', async () => {
  mockReferenceData = null;

  render(<UserStatistics />);
  await act(async () => {});

  expect(handleReferenceData).toHaveBeenCalledWith(mockSession, mockSetReferenceData);
});

it('does not reload reference data when it is already present', async () => {
  render(<UserStatistics />);
  await act(async () => {});

  expect(handleReferenceData).not.toHaveBeenCalled();
});

it('shows an error message when the fetch fails', async () => {
  (getPublicUserStatistics as jest.Mock).mockRejectedValue(new Error('forbidden'));

  render(<UserStatistics />);
  await act(async () => {});

  expect(screen.getByText(/nicht möglich/)).toBeVisible();
});

it('navigates back when the back button is pressed', async () => {
  render(<UserStatistics />);
  await act(async () => {});

  fireEvent.press(screen.getByTestId('back_button'));

  expect(mockBack).toHaveBeenCalled();
});
