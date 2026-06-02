import ProfileView from "@/views/profileView";
import { render, screen } from "@testing-library/react-native";
import mockData from "../data.json";

const mockProfile = mockData.profile as unknown as Profile;

jest.mock('@/components/profile/userProfileHeader', () => {
  const { View } = require('react-native');
  return () => <View testID="user_profile_header" />;
});

jest.mock('@/components/profile/userProfileFavoritePicker', () => {
  const { View } = require('react-native');
  return () => <View testID="user_profile_favorite_picker" />;
});

it('renders the profile header and favorite picker', () => {
  render(<ProfileView authLoading={false} profile={mockProfile} shirtAmount={5} signOut={jest.fn()} />);

  expect(screen.getByTestId('user_profile_header')).toBeVisible();
  expect(screen.getByTestId('user_profile_favorite_picker')).toBeVisible();
});
