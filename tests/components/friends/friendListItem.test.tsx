import FriendListItem from "@/components/friends/friendListItem";
import { fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockNavigate = jest.fn();

jest.mock('expo-router', () => ({
  router: { navigate: jest.fn() },
}));

jest.mock('@/components/ui/shirtImage', () => {
  const { View } = require('react-native');
  return () => <View testID="shirt_image" />;
});

const mockFriend: FriendUser = mockData.friend;

beforeEach(() => {
  jest.clearAllMocks();
  const { router } = require('expo-router');
  router.navigate = mockNavigate;
});

it('renders the username, avatar and remove action', () => {
  render(<FriendListItem friend={mockFriend} onRemove={jest.fn()} />);

  expect(screen.getByText('Alice')).toBeVisible();
  expect(screen.getByTestId('shirt_image')).toBeVisible();
  expect(screen.getByTestId('remove_friend_friend-1')).toBeVisible();
});

it('navigates to the friend profile and calls onNavigate when the row is pressed', () => {
  const onNavigate = jest.fn();

  render(<FriendListItem friend={mockFriend} onNavigate={onNavigate} onRemove={jest.fn()} />);

  fireEvent.press(screen.getByTestId('friend_friend-1'));

  expect(onNavigate).toHaveBeenCalled();
  expect(mockNavigate).toHaveBeenCalledWith('/users/friend-1');
});

it('navigates even when no onNavigate handler is provided', () => {
  render(<FriendListItem friend={mockFriend} onRemove={jest.fn()} />);

  fireEvent.press(screen.getByTestId('friend_friend-1'));

  expect(mockNavigate).toHaveBeenCalledWith('/users/friend-1');
});

it('calls onRemove when the remove action is pressed', () => {
  const onRemove = jest.fn();

  render(<FriendListItem friend={mockFriend} onRemove={onRemove} />);

  fireEvent.press(screen.getByTestId('remove_friend_friend-1'));

  expect(onRemove).toHaveBeenCalledTimes(1);
});
