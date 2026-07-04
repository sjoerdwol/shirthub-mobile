import UserCollection from "@/app/users/[id]/collection";
import { useAuth } from "@/contexts/authContext";
import { getPublicUserShirts } from "@/services/shirthub_public_collection";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../../data.json";

const mockSession = mockData.session;
const mockShirt = mockData.shirt as unknown as Shirt;
const mockBack = jest.fn();

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/services/shirthub_public_collection', () => ({
  getPublicUserShirts: jest.fn(),
  getPublicUserStatistics: jest.fn(),
}));
jest.mock('expo-router', () => ({
  router: { back: jest.fn() },
  useLocalSearchParams: jest.fn(),
}));

jest.mock('@/views/loadingView', () => {
  const { View } = require('react-native');
  return () => <View testID="loading_view" />;
});

jest.mock('@/views/otherUserCollectionView', () => {
  const { Text } = require('react-native');
  return ({ shirts }: { shirts: Shirt[] }) => <Text testID="collection_view">{shirts.length}</Text>;
});

beforeEach(() => {
  jest.clearAllMocks();

  const { router, useLocalSearchParams } = require('expo-router');
  router.back = mockBack;
  (useLocalSearchParams as jest.Mock).mockReturnValue({ id: 'user-1' });

  (useAuth as jest.Mock).mockReturnValue({ session: mockSession });
  (getPublicUserShirts as jest.Mock).mockResolvedValue([mockShirt]);
});

it('shows the loading view before the collection resolves', () => {
  (getPublicUserShirts as jest.Mock).mockReturnValue(new Promise(() => {}));

  render(<UserCollection />);

  expect(screen.getByTestId('loading_view')).toBeVisible();
});

it('fetches and renders the collection', async () => {
  render(<UserCollection />);
  await act(async () => {});

  expect(getPublicUserShirts).toHaveBeenCalledWith(mockSession, 'user-1');
  expect(screen.getByTestId('collection_view')).toHaveTextContent('1');
});

it('handles an array id param by using the first element', async () => {
  const { useLocalSearchParams } = require('expo-router');
  (useLocalSearchParams as jest.Mock).mockReturnValue({ id: ['user-1', 'other'] });

  render(<UserCollection />);
  await act(async () => {});

  expect(getPublicUserShirts).toHaveBeenCalledWith(mockSession, 'user-1');
});

it('shows an error message when the fetch fails', async () => {
  (getPublicUserShirts as jest.Mock).mockRejectedValue(new Error('forbidden'));

  render(<UserCollection />);
  await act(async () => {});

  expect(screen.getByText(/nicht möglich/)).toBeVisible();
});

it('navigates back when the back button is pressed', async () => {
  render(<UserCollection />);
  await act(async () => {});

  fireEvent.press(screen.getByTestId('back_button'));

  expect(mockBack).toHaveBeenCalled();
});
