import OtherUserProfileView from "@/views/otherUserProfileView";
import { render, screen } from "@testing-library/react-native";

jest.mock('@/components/ui/shirtImage', () => {
  const { View } = require('react-native');
  return () => <View testID="shirt_image" />;
});

const mockProfilePublic: PublicProfile = {
  ownerId: 'user-1',
  username: 'TestUser',
  avatarUrl: null,
  isPublic: true,
  createdAt: '2024-01-01T00:00:00Z',
  shirtCount: 7,
};

const mockProfilePrivate: PublicProfile = {
  ownerId: 'user-1',
  username: 'TestUser',
  avatarUrl: null,
  isPublic: false,
  createdAt: '2024-01-01T00:00:00Z',
  shirtCount: 7,
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
