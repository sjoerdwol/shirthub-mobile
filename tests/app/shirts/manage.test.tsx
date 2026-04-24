import ManageShirt from "@/app/shirts/manage";
import { useAuth } from "@/contexts/authContext";
import { useReferenceDataStore } from "@/stores/referenceDataStore";
import { handleReferenceData } from "@/utils/setReferenceData";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockSession = mockData.session;
const mockShirt = mockData.shirt as unknown as Shirt;
const mockReferenceData: ReferenceData = { leagues: [], teams: [] };
const mockBack = jest.fn();

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/stores/referenceDataStore', () => ({ useReferenceDataStore: jest.fn() }));
jest.mock('@/utils/setReferenceData', () => ({ handleReferenceData: jest.fn() }));
jest.mock('expo-router', () => ({
  router: { back: jest.fn() },
  useLocalSearchParams: jest.fn(),
}));

jest.mock('@/views/loadingView', () => {
  const { View } = require('react-native');
  const LoadingView = () => <View testID="loading_view" />;
  return LoadingView;
});

jest.mock('@/views/shirtManageView', () => {
  const { View } = require('react-native');
  const ShirtManageView = () => <View testID="shirt_manage_view" />;
  return ShirtManageView;
});

beforeEach(() => {
  jest.clearAllMocks();
  (handleReferenceData as jest.Mock).mockResolvedValue(undefined);

  const { router, useLocalSearchParams } = require('expo-router');
  router.back = mockBack;
  (useLocalSearchParams as jest.Mock).mockReturnValue({ mode: 'add', shirt: undefined });

  (useAuth as jest.Mock).mockReturnValue({ session: mockSession });
  (useReferenceDataStore as unknown as jest.Mock).mockImplementation((selector: (state: ReferenceDataState) => unknown) =>
    selector({ data: mockReferenceData, setReferenceData: jest.fn() })
  );
});

it('renders header with add mode title', async () => {
  render(<ManageShirt />);
  await act(async () => {});

  expect(screen.getByText('Füge ein Trikot hinzu')).toBeVisible();
});

it('renders header with edit mode title', async () => {
  const { useLocalSearchParams } = require('expo-router');
  (useLocalSearchParams as jest.Mock).mockReturnValue({ mode: 'edit', shirt: JSON.stringify(mockShirt) });

  render(<ManageShirt />);
  await act(async () => {});

  expect(screen.getByText('Bearbeite dein Trikot')).toBeVisible();
});

it('shows manage view when data is available', async () => {
  render(<ManageShirt />);
  await act(async () => {});

  expect(screen.getByTestId('shirt_manage_view')).toBeVisible();
  expect(screen.queryByTestId('loading_view')).toBeNull();
});

it('shows loading view while fetching reference data', () => {
  (handleReferenceData as jest.Mock).mockReturnValue(new Promise(() => {}));
  (useReferenceDataStore as unknown as jest.Mock).mockImplementation((selector: (state: ReferenceDataState) => unknown) =>
    selector({ data: null, setReferenceData: jest.fn() })
  );

  render(<ManageShirt />);

  expect(screen.getByTestId('loading_view')).toBeVisible();
});

it('shows error message when reference data is missing after loading', async () => {
  (useReferenceDataStore as unknown as jest.Mock).mockImplementation((selector: (state: ReferenceDataState) => unknown) =>
    selector({ data: null, setReferenceData: jest.fn() })
  );

  render(<ManageShirt />);
  await act(async () => {});

  expect(screen.getByText('Leider ist es aktuell nicht möglich, die nötigen Daten zu laden. Bitte versuche es später nochmal.')).toBeVisible();
});

it('skips fetching reference data when data is already available', async () => {
  render(<ManageShirt />);
  await act(async () => {});

  expect(handleReferenceData).not.toHaveBeenCalled();
});

it('fetches reference data when session exists and data is null', async () => {
  (useReferenceDataStore as unknown as jest.Mock).mockImplementation((selector: (state: ReferenceDataState) => unknown) =>
    selector({ data: null, setReferenceData: jest.fn() })
  );

  render(<ManageShirt />);
  await act(async () => {});

  expect(handleReferenceData).toHaveBeenCalledWith(mockSession, expect.any(Function));
});

it('returns null when mode is invalid', () => {
  const { useLocalSearchParams } = require('expo-router');
  (useLocalSearchParams as jest.Mock).mockReturnValue({ mode: 'invalid', shirt: undefined });

  const { toJSON } = render(<ManageShirt />);

  expect(toJSON()).toBeNull();
});
;
