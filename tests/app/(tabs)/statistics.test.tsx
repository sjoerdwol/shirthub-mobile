import Statistics from "@/app/(tabs)/statistics";
import { useAuth } from "@/contexts/authContext";
import { useReferenceDataStore } from "@/stores/referenceDataStore";
import { useShirtStore } from "@/stores/shirtStore";
import { useUserStatisticsStore } from "@/stores/statisticsStore";
import { handleStatisticsFetch } from "@/utils/handleStatisticsOperations";
import { handleReferenceData } from "@/utils/setReferenceData";
import { act, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockSession = mockData.session;
const mockShirt = mockData.shirt as unknown as Shirt;
const mockUserStatistics = mockData.userStatistics as unknown as UserStatistics;

const mockReferenceData: ReferenceData = { leagues: [], teams: [] };

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/stores/shirtStore', () => ({ useShirtStore: jest.fn() }));
jest.mock('@/stores/referenceDataStore', () => ({ useReferenceDataStore: jest.fn() }));
jest.mock('@/stores/statisticsStore', () => ({ useUserStatisticsStore: jest.fn() }));
jest.mock('@/utils/handleStatisticsOperations', () => ({ handleStatisticsFetch: jest.fn() }));
jest.mock('@/utils/setReferenceData', () => ({ handleReferenceData: jest.fn() }));

jest.mock('@/views/loadingView', () => {
  const { View } = require('react-native');
  return () => <View testID="loading_view" />;
});

jest.mock('@/views/statisticsView', () => {
  const { View } = require('react-native');
  return () => <View testID="statistics_view" />;
});

beforeEach(() => {
  jest.clearAllMocks();
  (handleStatisticsFetch as jest.Mock).mockResolvedValue(undefined);
  (handleReferenceData as jest.Mock).mockResolvedValue(undefined);

  (useAuth as jest.Mock).mockReturnValue({ session: mockSession });
  (useShirtStore as unknown as jest.Mock).mockImplementation((selector: (state: ShirtState) => unknown) =>
    selector({ shirts: [mockShirt], setShirts: jest.fn(), addShirt: jest.fn(), updateShirt: jest.fn(), removeShirt: jest.fn() })
  );
  (useReferenceDataStore as unknown as jest.Mock).mockImplementation((selector: (state: ReferenceDataState) => unknown) =>
    selector({ data: mockReferenceData, setReferenceData: jest.fn() })
  );
  (useUserStatisticsStore as unknown as jest.Mock).mockImplementation((selector: (state: UserStatisticsStore) => unknown) =>
    selector({ hasChanged: false, userStatistics: mockUserStatistics, setHasChanged: jest.fn(), setUserStatistics: jest.fn() })
  );
});

it('renders header with statistics title', async () => {
  render(<Statistics />);
  await act(async () => { });

  expect(screen.getByText('Meine Statistiken')).toBeVisible();
});

it('shows loading view before data is fetched', () => {
  (handleStatisticsFetch as jest.Mock).mockReturnValue(new Promise(() => { }));

  render(<Statistics />);

  expect(screen.getByTestId('loading_view')).toBeVisible();
});

it('shows statistics view after data is loaded', async () => {
  render(<Statistics />);
  await act(async () => { });

  expect(screen.getByTestId('statistics_view')).toBeVisible();
  expect(screen.queryByTestId('loading_view')).toBeNull();
});

it('shows error message when data is missing after loading', async () => {
  (useReferenceDataStore as unknown as jest.Mock).mockImplementation((selector: (state: ReferenceDataState) => unknown) =>
    selector({ data: null, setReferenceData: jest.fn() })
  );
  (useUserStatisticsStore as unknown as jest.Mock).mockImplementation((selector: (state: UserStatisticsStore) => unknown) =>
    selector({ hasChanged: false, userStatistics: null, setHasChanged: jest.fn(), setUserStatistics: jest.fn() })
  );

  render(<Statistics />);
  await act(async () => { });

  expect(screen.getByText('Leider ist es aktuell nicht möglich, die nötigen Daten zu laden. Bitte versuche es später nochmal.')).toBeVisible();
});

it('fetches statistics when userStatistics is null and session exists', async () => {
  (useUserStatisticsStore as unknown as jest.Mock).mockImplementation((selector: (state: UserStatisticsStore) => unknown) =>
    selector({ hasChanged: false, userStatistics: null, setHasChanged: jest.fn(), setUserStatistics: jest.fn() })
  );

  render(<Statistics />);
  await act(async () => { });

  expect(handleStatisticsFetch).toHaveBeenCalled();
});

it('fetches statistics when hasChanged is true and session exists', async () => {
  (useUserStatisticsStore as unknown as jest.Mock).mockImplementation((selector: (state: UserStatisticsStore) => unknown) =>
    selector({ hasChanged: true, userStatistics: mockUserStatistics, setHasChanged: jest.fn(), setUserStatistics: jest.fn() })
  );

  render(<Statistics />);
  await act(async () => { });

  expect(handleStatisticsFetch).toHaveBeenCalled();
});

it('fetches reference data when data is null and session exists', async () => {
  (useReferenceDataStore as unknown as jest.Mock).mockImplementation((selector: (state: ReferenceDataState) => unknown) =>
    selector({ data: null, setReferenceData: jest.fn() })
  );

  render(<Statistics />);
  await act(async () => { });

  expect(handleReferenceData).toHaveBeenCalled();
});

it('does not fetch when session is null', async () => {
  (useAuth as jest.Mock).mockReturnValue({ session: null });

  render(<Statistics />);
  await act(async () => { });

  expect(handleStatisticsFetch).not.toHaveBeenCalled();
  expect(handleReferenceData).not.toHaveBeenCalled();
});
