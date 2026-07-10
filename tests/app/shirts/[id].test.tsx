import ShirtDetails from "@/app/shirts/[id]";
import { useAuth } from "@/contexts/authContext";
import { getOwnShirtDetail } from "@/services/shirthub_crud";
import { useShirtStore } from "@/stores/shirtStore";
import { useUserStatisticsStore } from "@/stores/statisticsStore";
import { handleShirtDeletion } from "@/utils/handleShirtOperations";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockSession = mockData.session;
const mockShirt = mockData.shirt as unknown as Shirt;

const mockRemoveShirt = jest.fn();
const mockSetHasChanged = jest.fn();
const mockBack = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/services/shirthub_crud', () => ({ getOwnShirtDetail: jest.fn() }));
jest.mock('@/stores/shirtStore', () => ({ useShirtStore: jest.fn() }));
jest.mock('@/stores/statisticsStore', () => ({ useUserStatisticsStore: jest.fn() }));
jest.mock('@/utils/handleShirtOperations', () => ({ handleShirtDeletion: jest.fn() }));
jest.mock('expo-router', () => ({
  router: { back: jest.fn(), navigate: jest.fn() },
  useLocalSearchParams: jest.fn(),
}));

jest.mock('@/views/shirtDetailView', () => {
  const { TouchableOpacity, View } = require('react-native');
  const ShirtDetailView = ({ handleDelete, handleEdit }: { handleDelete: () => void; handleEdit: () => void }) => (
    <View testID="shirt_detail_view">
      <TouchableOpacity testID="trigger_edit" onPress={handleEdit} />
      <TouchableOpacity testID="trigger_delete" onPress={handleDelete} />
    </View>
  );
  return ShirtDetailView;
});

beforeEach(() => {
  jest.clearAllMocks();
  (handleShirtDeletion as jest.Mock).mockResolvedValue(undefined);
  (getOwnShirtDetail as jest.Mock).mockResolvedValue({ likeCount: 0, likers: [] });

  const { router, useLocalSearchParams } = require('expo-router');
  router.back = mockBack;
  router.navigate = mockNavigate;
  (useLocalSearchParams as jest.Mock).mockReturnValue({ id: mockShirt.id });

  (useAuth as jest.Mock).mockReturnValue({ session: mockSession });
  (useShirtStore as unknown as jest.Mock).mockImplementation((selector: (state: ShirtState) => unknown) =>
    selector({ shirts: [mockShirt], setShirts: jest.fn(), addShirt: jest.fn(), updateShirt: jest.fn(), removeShirt: mockRemoveShirt })
  );
  (useUserStatisticsStore as unknown as jest.Mock).mockImplementation((selector: (state: UserStatisticsStore) => unknown) =>
    selector({ hasChanged: false, userStatistics: null, setHasChanged: mockSetHasChanged, setUserStatistics: jest.fn() })
  );
});

it('renders header with Shirt Details title', () => {
  render(<ShirtDetails />);

  expect(screen.getByText('Shirt Details')).toBeVisible();
});

it('renders shirt detail view when shirt is found', () => {
  render(<ShirtDetails />);

  expect(screen.getByTestId('shirt_detail_view')).toBeVisible();
});

it('renders nothing when shirt is not found', () => {
  const { useLocalSearchParams } = require('expo-router');
  (useLocalSearchParams as jest.Mock).mockReturnValue({ id: 'non-existent-id' });

  render(<ShirtDetails />);

  expect(screen.queryByTestId('shirt_detail_view')).toBeNull();
});

it('handles array id param by using first element', () => {
  const { useLocalSearchParams } = require('expo-router');
  (useLocalSearchParams as jest.Mock).mockReturnValue({ id: [mockShirt.id, 'other-id'] });

  render(<ShirtDetails />);

  expect(screen.getByTestId('shirt_detail_view')).toBeVisible();
});

it('navigates to manage screen with shirt data when edit is triggered', () => {
  render(<ShirtDetails />);

  fireEvent.press(screen.getByTestId('trigger_edit'));

  expect(mockNavigate).toHaveBeenCalledWith({
    pathname: '/shirts/manage',
    params: { mode: 'edit', shirt: JSON.stringify(mockShirt) },
  });
});

it('calls handleShirtDeletion and navigates back when delete is triggered', async () => {
  render(<ShirtDetails />);

  await act(async () => {
    fireEvent.press(screen.getByTestId('trigger_delete'));
  });

  expect(handleShirtDeletion).toHaveBeenCalledWith(mockSession, mockShirt.id, mockRemoveShirt, mockSetHasChanged);
  expect(mockBack).toHaveBeenCalled();
});

it('does not call handleShirtDeletion when session is null', async () => {
  (useAuth as jest.Mock).mockReturnValue({ session: null });

  render(<ShirtDetails />);

  await act(async () => {
    fireEvent.press(screen.getByTestId('trigger_delete'));
  });

  expect(handleShirtDeletion).not.toHaveBeenCalled();
});
;
