import Settings from "@/app/settings";
import { useProfileStore } from "@/stores/profileStore";
import { fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockProfile = mockData.profile as unknown as Profile;

const mockBack = jest.fn();

jest.mock('@/stores/profileStore', () => ({ useProfileStore: jest.fn() }));
jest.mock('expo-router', () => ({ router: { back: jest.fn() } }));

jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return { Ionicons: ({ name }: { name: string }) => <Text testID={`icon_${name}`}>{name}</Text> };
});

jest.mock('@/views/settingsView', () => {
  const { View } = require('react-native');
  return () => <View testID="settings_view" />;
});

beforeEach(() => {
  jest.clearAllMocks();

  (useProfileStore as unknown as jest.Mock).mockImplementation((selector: (state: ProfileState) => unknown) =>
    selector({ profile: mockProfile, setProfile: jest.fn(), updateProfile: jest.fn() })
  );

  const { router } = require('expo-router');
  router.back = mockBack;
});

it('renders the settings title and view when a profile exists', () => {
  render(<Settings />);

  expect(screen.getByText('Einstellungen')).toBeVisible();
  expect(screen.getByTestId('settings_view')).toBeVisible();
});

it('navigates back when the back button is pressed', () => {
  render(<Settings />);

  fireEvent.press(screen.getByTestId('icon_arrow-back'));

  expect(mockBack).toHaveBeenCalled();
});

it('does not render the settings view when no profile exists', () => {
  (useProfileStore as unknown as jest.Mock).mockImplementation((selector: (state: ProfileState) => unknown) =>
    selector({ profile: null, setProfile: jest.fn(), updateProfile: jest.fn() })
  );

  render(<Settings />);

  expect(screen.queryByTestId('settings_view')).toBeNull();
});
