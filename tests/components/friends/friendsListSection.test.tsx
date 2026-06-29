import FriendsListSection from "@/components/friends/friendsListSection";
import { useAuth } from "@/contexts/authContext";
import { useFriendsStore } from "@/stores/friendsStore";
import { handleRemoveFriend } from "@/utils/handleFriendOperations";
import { fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockSession = mockData.session;
const mockFriend: FriendUser = mockData.friend;

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/stores/friendsStore', () => ({ useFriendsStore: jest.fn() }));
jest.mock('@/utils/handleFriendOperations', () => ({ handleRemoveFriend: jest.fn() }));

jest.mock('@/components/ui/shirtImage', () => {
  const { View } = require('react-native');
  return () => <View testID="shirt_image" />;
});

jest.mock('expo-router', () => ({ router: { navigate: jest.fn() } }));

const storeState = { friends: [] as FriendUser[], removeFriend: jest.fn() };

const mockStore = (friends: FriendUser[]) => {
  storeState.friends = friends;
  (useFriendsStore as unknown as jest.Mock).mockImplementation((selector: (state: typeof storeState) => unknown) =>
    selector(storeState)
  );
};

beforeEach(() => {
  jest.clearAllMocks();
  (useAuth as jest.Mock).mockReturnValue({ session: mockSession });
});

it('renders the heading and an empty state when there are no friends', () => {
  mockStore([]);

  render(<FriendsListSection />);

  expect(screen.getByText('Freundesliste')).toBeVisible();
  expect(screen.getByText('Noch keine Freunde')).toBeVisible();
});

it('renders friends and wires remove to the handler', () => {
  mockStore([mockFriend]);

  render(<FriendsListSection />);

  expect(screen.getByText('Alice')).toBeVisible();
  expect(screen.queryByText('Noch keine Freunde')).toBeNull();

  fireEvent.press(screen.getByTestId('remove_friend_friend-1'));

  expect(handleRemoveFriend).toHaveBeenCalledWith(mockSession, 'friend-1', storeState.removeFriend);
});

it('does not call the handler when there is no session', () => {
  (useAuth as jest.Mock).mockReturnValue({ session: null });
  mockStore([mockFriend]);

  render(<FriendsListSection />);

  fireEvent.press(screen.getByTestId('remove_friend_friend-1'));

  expect(handleRemoveFriend).not.toHaveBeenCalled();
});
