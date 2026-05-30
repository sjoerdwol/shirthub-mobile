import UserProfileHeader from "@/components/profile/userProfileHeader";
import { fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockProfile = mockData.profile as unknown as Profile;

jest.mock('expo-router', () => ({ router: { navigate: jest.fn() } }));

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders username, membership year and shirt amount', () => {
  render(<UserProfileHeader authLoading={false} profile={mockProfile} shirtAmount={5} signOut={jest.fn()} />);

  expect(screen.getByText('TestUser')).toBeVisible();
  expect(screen.getByText(/Mitglied seit 2024/)).toBeVisible();
  expect(screen.getByText(/5 Trikots/)).toBeVisible();
});

it('renders settings and sign out buttons', () => {
  render(<UserProfileHeader authLoading={false} profile={mockProfile} shirtAmount={5} signOut={jest.fn()} />);

  expect(screen.getByText('Einstellungen')).toBeVisible();
  expect(screen.getByText('Abmelden')).toBeVisible();
});

it('navigates to settings when the settings button is pressed', () => {
  const { router } = require('expo-router');

  render(<UserProfileHeader authLoading={false} profile={mockProfile} shirtAmount={5} signOut={jest.fn()} />);

  fireEvent.press(screen.getByTestId('secondary_button'));

  expect(router.navigate).toHaveBeenCalledWith('/settings');
});

it('calls signOut when the sign out button is pressed', () => {
  const mockSignOut = jest.fn();

  render(<UserProfileHeader authLoading={false} profile={mockProfile} shirtAmount={5} signOut={mockSignOut} />);

  fireEvent.press(screen.getByTestId('primary_button'));

  expect(mockSignOut).toHaveBeenCalled();
});

it('disables the sign out button while auth is loading', () => {
  render(<UserProfileHeader authLoading={true} profile={mockProfile} shirtAmount={5} signOut={jest.fn()} />);

  expect(screen.getByTestId('primary_button')).toBeDisabled();
});
