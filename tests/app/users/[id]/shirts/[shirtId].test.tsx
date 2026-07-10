import FriendShirtDetails from "@/app/users/[id]/shirts/[shirtId]";
import { useAuth } from "@/contexts/authContext";
import { setShirtLike } from "@/services/shirthub_likes";
import { getFriendShirt } from "@/services/shirthub_public_collection";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../../../data.json";

const mockSession = mockData.session;
const mockBack = jest.fn();

const baseShirt = {
  id: 'shirt-1',
  ownerId: 'user-1',
  team: 'FC Bayern München',
  teamKey: 'fcbayern',
  leagueKey: 'bundesliga',
  season: '2023/24',
  type: 'Home',
  condition: 9,
  printName: 'Müller',
  printNumber: 25,
  size: 'L',
  value: 90,
  isFavorite: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  likeCount: 0,
  likedByMe: false,
} as unknown as FriendShirtDetail;

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/services/shirthub_public_collection', () => ({ getFriendShirt: jest.fn() }));
jest.mock('@/services/shirthub_likes', () => ({ setShirtLike: jest.fn() }));
jest.mock('expo-router', () => ({
  router: { back: jest.fn() },
  useLocalSearchParams: jest.fn(),
}));

jest.mock('@/views/loadingView', () => {
  const { View } = require('react-native');
  return () => <View testID="loading_view" />;
});

jest.mock('@/views/otherUserShirtDetailView', () => {
  const { Text } = require('react-native');
  return ({ shirt }: { shirt: FriendShirtDetail }) => (
    <Text testID="detail_view">{shirt.likeCount}-{String(shirt.likedByMe)}</Text>
  );
});

beforeEach(() => {
  jest.clearAllMocks();

  const { router, useLocalSearchParams } = require('expo-router');
  router.back = mockBack;
  (useLocalSearchParams as jest.Mock).mockReturnValue({ id: 'user-1', shirtId: 'shirt-1' });

  (useAuth as jest.Mock).mockReturnValue({ session: mockSession });
  (getFriendShirt as jest.Mock).mockResolvedValue(baseShirt);
  (setShirtLike as jest.Mock).mockResolvedValue({ likeCount: 1, likedByMe: true });
});

it('shows the loading view before the shirt resolves', () => {
  (getFriendShirt as jest.Mock).mockReturnValue(new Promise(() => {}));

  render(<FriendShirtDetails />);

  expect(screen.getByTestId('loading_view')).toBeVisible();
});

it('fetches and renders the shirt detail view', async () => {
  render(<FriendShirtDetails />);
  await act(async () => {});

  expect(getFriendShirt).toHaveBeenCalledWith(mockSession, 'user-1', 'shirt-1');
  expect(screen.getByTestId('detail_view')).toHaveTextContent('0-false');
});

it('handles array id/shirtId params by using the first element', async () => {
  const { useLocalSearchParams } = require('expo-router');
  (useLocalSearchParams as jest.Mock).mockReturnValue({ id: ['user-1', 'x'], shirtId: ['shirt-1', 'y'] });

  render(<FriendShirtDetails />);
  await act(async () => {});

  expect(getFriendShirt).toHaveBeenCalledWith(mockSession, 'user-1', 'shirt-1');
});

it('toggles the like and reflects the new state', async () => {
  render(<FriendShirtDetails />);
  await act(async () => {});

  await act(async () => {
    fireEvent.press(screen.getByTestId('like_button'));
  });

  expect(setShirtLike).toHaveBeenCalledWith(mockSession, 'shirt-1', true);
  expect(screen.getByTestId('detail_view')).toHaveTextContent('1-true');
});

it('keeps the previous state when the like request fails', async () => {
  (setShirtLike as jest.Mock).mockRejectedValue(new Error('network'));

  render(<FriendShirtDetails />);
  await act(async () => {});

  await act(async () => {
    fireEvent.press(screen.getByTestId('like_button'));
  });

  expect(screen.getByTestId('detail_view')).toHaveTextContent('0-false');
});

it('shows an error message when the fetch fails', async () => {
  (getFriendShirt as jest.Mock).mockRejectedValue(new Error('forbidden'));

  render(<FriendShirtDetails />);
  await act(async () => {});

  expect(screen.getByText(/nicht möglich/)).toBeVisible();
});

it('navigates back when the back button is pressed', async () => {
  render(<FriendShirtDetails />);
  await act(async () => {});

  fireEvent.press(screen.getByTestId('back_button'));

  expect(mockBack).toHaveBeenCalled();
});
