import OtherUserProfileView from "@/views/otherUserProfileView";
import { fireEvent, render, screen } from "@testing-library/react-native";

const mockNavigate = jest.fn();

jest.mock('expo-router', () => ({
  router: { navigate: jest.fn() },
}));

jest.mock('@/components/ui/shirtImage', () => {
  const { View } = require('react-native');
  return () => <View testID="shirt_image" />;
});

// FriendButton owns its own auth/store wiring; here we only assert the view
// renders it and forwards the friend status from the profile.
jest.mock('@/components/friends/friendButton', () => {
  const { Text } = require('react-native');
  return ({ ownerId, initialStatus }: { ownerId: string; initialStatus: string }) => (
    <Text testID="friend_button">{`${ownerId}:${initialStatus}`}</Text>
  );
});

const mockProfilePublic: PublicProfile = {
  ownerId: 'user-1',
  username: 'TestUser',
  avatarUrl: null,
  isPublic: true,
  createdAt: '2024-01-01T00:00:00Z',
  shirtCount: 7,
  friendStatus: 'none',
  distinctTeamsCount: 4,
  totalValue: 250,
};

const mockProfilePrivateFriend: PublicProfile = {
  ownerId: 'user-1',
  username: 'TestUser',
  avatarUrl: null,
  isPublic: false,
  createdAt: '2024-01-01T00:00:00Z',
  shirtCount: 7,
  friendStatus: 'friends',
  distinctTeamsCount: 4,
  totalValue: 250,
};

const mockProfilePrivateStranger: PublicProfile = {
  ownerId: 'user-1',
  username: 'TestUser',
  avatarUrl: null,
  isPublic: false,
  createdAt: '2024-01-01T00:00:00Z',
  shirtCount: 7,
  friendStatus: 'none',
};

beforeEach(() => {
  jest.clearAllMocks();
  const { router } = require('expo-router');
  router.navigate = mockNavigate;
});

it('renders membership line, core stats and jump rows for a public profile', () => {
  render(<OtherUserProfileView profile={mockProfilePublic} />);

  expect(screen.getByTestId('shirt_image')).toBeVisible();
  expect(screen.getByText('TestUser')).toBeVisible();
  expect(screen.getByText(/Mitglied seit 2024/)).toBeVisible();
  expect(screen.getByText('Versch. Vereine')).toBeVisible();
  expect(screen.getByText('Gesamtwert')).toBeVisible();
  expect(screen.getByTestId('jump_collection')).toBeVisible();
  expect(screen.getByTestId('jump_statistics')).toBeVisible();
});

it('renders core stats and jump rows for a private profile of a friend', () => {
  render(<OtherUserProfileView profile={mockProfilePrivateFriend} />);

  expect(screen.getByText(/Mitglied seit 2024/)).toBeVisible();
  expect(screen.getByTestId('jump_collection')).toBeVisible();
  expect(screen.getByTestId('jump_statistics')).toBeVisible();
});

it('hides membership line, core stats and jump rows for a private non-friend profile', () => {
  render(<OtherUserProfileView profile={mockProfilePrivateStranger} />);

  expect(screen.getByTestId('shirt_image')).toBeVisible();
  expect(screen.getByText('TestUser')).toBeVisible();
  expect(screen.queryByText(/Mitglied seit 2024/)).toBeNull();
  expect(screen.queryByText('Vereine')).toBeNull();
  expect(screen.queryByTestId('jump_collection')).toBeNull();
  expect(screen.queryByTestId('jump_statistics')).toBeNull();
});

it('navigates to the collection and statistics sub-pages when the jump rows are pressed', () => {
  render(<OtherUserProfileView profile={mockProfilePublic} />);

  fireEvent.press(screen.getByTestId('jump_collection'));
  expect(mockNavigate).toHaveBeenCalledWith('/users/user-1/collection');

  fireEvent.press(screen.getByTestId('jump_statistics'));
  expect(mockNavigate).toHaveBeenCalledWith('/users/user-1/statistics');
});

it('renders the friend button and forwards the profile id and friend status', () => {
  render(<OtherUserProfileView profile={mockProfilePublic} />);

  expect(screen.getByTestId('friend_button')).toHaveTextContent('user-1:none');
});

it('forwards a different friend status for a friend', () => {
  render(<OtherUserProfileView profile={mockProfilePrivateFriend} />);

  expect(screen.getByTestId('friend_button')).toHaveTextContent('user-1:friends');
});
