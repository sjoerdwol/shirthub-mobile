import SettingsView from "@/views/settingsView";
import { render, screen } from "@testing-library/react-native";
import mockData from "../data.json";

const mockProfile = mockData.profile as unknown as Profile;

jest.mock('@/components/forms/userSettingsForm', () => {
  const { View } = require('react-native');
  return () => <View testID="user_settings_form" />;
});

jest.mock('@/components/profile/avatarPickerContainer', () => {
  const { View } = require('react-native');
  return () => <View testID="avatar_picker" />;
});

it('renders the avatar picker and the user settings form', () => {
  render(<SettingsView profile={mockProfile} />);

  expect(screen.getByTestId('avatar_picker')).toBeVisible();
  expect(screen.getByTestId('user_settings_form')).toBeVisible();
});
