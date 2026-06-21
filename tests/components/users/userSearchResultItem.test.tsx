import UserSearchResultItem from "@/components/users/userSearchResultItem";
import { fireEvent, render, screen } from "@testing-library/react-native";

const mockNavigate = jest.fn();

jest.mock('expo-router', () => ({
  router: { navigate: jest.fn() },
}));

jest.mock('@/components/ui/shirtImage', () => {
  const { View } = require('react-native');
  return () => <View testID="shirt_image" />;
});

const mockUser: UserSearchResult = {
  ownerId: 'user-123',
  username: 'JohnDoe',
  avatarUrl: null,
};

beforeEach(() => {
  jest.clearAllMocks();
  const { router } = require('expo-router');
  router.navigate = mockNavigate;
});

it('renders the username and avatar', () => {
  render(<UserSearchResultItem user={mockUser} />);

  expect(screen.getByText('JohnDoe')).toBeVisible();
  expect(screen.getByTestId('shirt_image')).toBeVisible();
});

it('navigates to the user profile and closes the drawer on press', () => {
  const onResultPress = jest.fn();

  render(<UserSearchResultItem onResultPress={onResultPress} user={mockUser} />);

  fireEvent.press(screen.getByText('JohnDoe'));

  expect(onResultPress).toHaveBeenCalled();
  expect(mockNavigate).toHaveBeenCalledWith('/users/user-123');
});

it('navigates even when no onResultPress handler is provided', () => {
  render(<UserSearchResultItem user={mockUser} />);

  fireEvent.press(screen.getByText('JohnDoe'));

  expect(mockNavigate).toHaveBeenCalledWith('/users/user-123');
});
