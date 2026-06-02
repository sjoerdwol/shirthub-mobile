import UserSettingsForm from "@/components/forms/userSettingsForm";
import { useAuth } from "@/contexts/authContext";
import { useProfileStore } from "@/stores/profileStore";
import { handleProfileUpdate } from "@/utils/handleProfileOperations";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockSession = mockData.session;
const mockProfile = mockData.profile as unknown as Profile;

const mockUpdateProfile = jest.fn();
const mockBack = jest.fn();

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/stores/profileStore', () => ({ useProfileStore: jest.fn() }));
jest.mock('@/utils/handleProfileOperations', () => ({ handleProfileUpdate: jest.fn() }));
jest.mock('expo-router', () => ({ router: { back: jest.fn() } }));

beforeEach(() => {
  jest.clearAllMocks();
  (handleProfileUpdate as jest.Mock).mockResolvedValue(undefined);

  (useAuth as jest.Mock).mockReturnValue({
    session: mockSession,
    user: null,
    signIn: jest.fn(),
    signOut: jest.fn(),
    signUp: jest.fn(),
    loading: false,
  });

  (useProfileStore as unknown as jest.Mock).mockImplementation((selector: (state: ProfileState) => unknown) =>
    selector({ profile: mockProfile, setProfile: jest.fn(), updateProfile: mockUpdateProfile })
  );

  const { router } = require('expo-router');
  router.back = mockBack;
});

it('renders the form with prefilled username, toggle and save button', () => {
  render(<UserSettingsForm profile={mockProfile} />);

  expect(screen.getByDisplayValue('TestUser')).toBeVisible();
  expect(screen.getByText('Profil öffentlich')).toBeVisible();
  expect(screen.getByTestId('custom_toggle')).toBeVisible();
  expect(screen.getByTestId('primary_button')).toHaveTextContent('Speichern');
});

it('updates the profile when the username changed', async () => {
  render(<UserSettingsForm profile={mockProfile} />);

  fireEvent.changeText(screen.getByDisplayValue('TestUser'), 'NewUser');

  await act(async () => {
    fireEvent.press(screen.getByTestId('primary_button'));
  });

  expect(handleProfileUpdate).toHaveBeenCalledWith(
    mockSession,
    mockUpdateProfile,
    { username: 'NewUser', is_public: true }
  );
  expect(mockBack).toHaveBeenCalled();
});

it('updates the profile when only the visibility toggle changed', async () => {
  render(<UserSettingsForm profile={mockProfile} />);

  fireEvent.press(screen.getByTestId('custom_toggle'));

  await act(async () => {
    fireEvent.press(screen.getByTestId('primary_button'));
  });

  expect(handleProfileUpdate).toHaveBeenCalledWith(
    mockSession,
    mockUpdateProfile,
    { username: 'TestUser', is_public: false }
  );
  expect(mockBack).toHaveBeenCalled();
});

it('does not update when nothing changed', async () => {
  render(<UserSettingsForm profile={mockProfile} />);

  await act(async () => {
    fireEvent.press(screen.getByTestId('primary_button'));
  });

  expect(handleProfileUpdate).not.toHaveBeenCalled();
  expect(mockBack).not.toHaveBeenCalled();
});

it('does not update when there is no session', async () => {
  (useAuth as jest.Mock).mockReturnValue({
    session: null,
    user: null,
    signIn: jest.fn(),
    signOut: jest.fn(),
    signUp: jest.fn(),
    loading: false,
  });

  render(<UserSettingsForm profile={mockProfile} />);

  fireEvent.changeText(screen.getByDisplayValue('TestUser'), 'NewUser');

  await act(async () => {
    fireEvent.press(screen.getByTestId('primary_button'));
  });

  expect(handleProfileUpdate).not.toHaveBeenCalled();
});
