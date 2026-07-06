import UserProfile from "@/app/users/[id]/index";
import { useAuth } from "@/contexts/authContext";
import { getPublicProfile } from "@/services/shirthub_user_profile";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../../data.json";

const mockSession = mockData.session;
const mockBack = jest.fn();

const mockProfile: PublicProfile = {
  ownerId: 'user-1',
  username: 'TestUser',
  avatarUrl: null,
  isPublic: true,
  createdAt: '2024-01-01T00:00:00Z',
  shirtCount: 3,
  friendStatus: 'none',
};

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/services/shirthub_user_profile', () => ({ getPublicProfile: jest.fn() }));
jest.mock('expo-router', () => ({
  router: { back: jest.fn() },
  useLocalSearchParams: jest.fn(),
}));

jest.mock('@/views/loadingView', () => {
  const { View } = require('react-native');
  return () => <View testID="loading_view" />;
});

jest.mock('@/views/otherUserProfileView', () => {
  const { Text } = require('react-native');
  return ({ profile }: { profile: PublicProfile }) => <Text>{profile.username}</Text>;
});

beforeEach(() => {
  jest.clearAllMocks();

  const { router, useLocalSearchParams } = require('expo-router');
  router.back = mockBack;
  (useLocalSearchParams as jest.Mock).mockReturnValue({ id: 'user-1' });

  (useAuth as jest.Mock).mockReturnValue({ session: mockSession });
  (getPublicProfile as jest.Mock).mockResolvedValue(mockProfile);
});

it('shows the loading view before the profile resolves', () => {
  (getPublicProfile as jest.Mock).mockReturnValue(new Promise(() => {}));

  render(<UserProfile />);

  expect(screen.getByTestId('loading_view')).toBeVisible();
});

it('fetches and renders the user profile', async () => {
  render(<UserProfile />);
  await act(async () => {});

  expect(getPublicProfile).toHaveBeenCalledWith(mockSession, 'user-1');
  expect(screen.getByText('TestUser')).toBeVisible();
});

it('handles an array id param by using the first element', async () => {
  const { useLocalSearchParams } = require('expo-router');
  (useLocalSearchParams as jest.Mock).mockReturnValue({ id: ['user-1', 'other'] });

  render(<UserProfile />);
  await act(async () => {});

  expect(getPublicProfile).toHaveBeenCalledWith(mockSession, 'user-1');
});

it('shows an error message when the fetch fails', async () => {
  (getPublicProfile as jest.Mock).mockRejectedValue(new Error('not found'));

  render(<UserProfile />);
  await act(async () => {});

  expect(screen.getByText(/nicht möglich/)).toBeVisible();
});

it('navigates back when the back button is pressed', async () => {
  render(<UserProfile />);
  await act(async () => {});

  fireEvent.press(screen.getByTestId('back_button'));

  expect(mockBack).toHaveBeenCalled();
});
