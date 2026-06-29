import OtherUserProfileView from "@/views/otherUserProfileView";
import { render, screen } from "@testing-library/react-native";

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
};

const mockProfilePrivate: PublicProfile = {
  ownerId: 'user-1',
  username: 'TestUser',
  avatarUrl: null,
  isPublic: false,
  createdAt: '2024-01-01T00:00:00Z',
  shirtCount: 7,
  friendStatus: 'friends',
};

it('renders the avatar, username, membership year and shirt count if profile is public', () => {
  render(<OtherUserProfileView profile={mockProfilePublic} />);

  expect(screen.getByTestId('shirt_image')).toBeVisible();
  expect(screen.getByText('TestUser')).toBeVisible();
  expect(screen.getByText(/Mitglied seit 2024/)).toBeVisible();
  expect(screen.getByText(/7 Trikots/)).toBeVisible();
});

it('renders only the avatar and username if profile is private', () => {
  render(<OtherUserProfileView profile={mockProfilePrivate} />);

  expect(screen.getByTestId('shirt_image')).toBeVisible();
  expect(screen.getByText('TestUser')).toBeVisible();
  expect(screen.queryByText(/Mitglied seit 2024/)).toBeNull();
  expect(screen.queryByText(/7 Trikots/)).toBeNull();
});

it('renders the friend button and forwards the profile id and friend status', () => {
  render(<OtherUserProfileView profile={mockProfilePublic} />);

  expect(screen.getByTestId('friend_button')).toHaveTextContent('user-1:none');
});

it('forwards a different friend status for a friend', () => {
  render(<OtherUserProfileView profile={mockProfilePrivate} />);

  expect(screen.getByTestId('friend_button')).toHaveTextContent('user-1:friends');
});
