import AvatarPickerContainer from "@/components/profile/avatarPickerContainer";
import { useAuth } from "@/contexts/authContext";
import { useProfileStore } from "@/stores/profileStore";
import { handleAvatarRemove, handleAvatarUpload } from "@/utils/handleProfileOperations";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import mockData from "../../data.json";

const mockSession = mockData.session;
const mockProfile = mockData.profile as unknown as Profile;
const mockProfileWithAvatar = { ...mockProfile, avatar_url: 'https://example.com/avatar.jpg?v=1' } as Profile;

const mockUpdateProfile = jest.fn();

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/stores/profileStore', () => ({ useProfileStore: jest.fn() }));
jest.mock('@/utils/handleProfileOperations', () => ({
  handleAvatarUpload: jest.fn(),
  handleAvatarRemove: jest.fn(),
}));
jest.mock('expo-image-picker', () => ({
  requestCameraPermissionsAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));

const getAlertButton = (label: string) => {
  const buttons = (Alert.alert as jest.Mock).mock.calls[0][2] as { text: string; onPress?: () => void }[];
  const button = buttons.find((b) => b.text === label);
  if (!button) throw new Error(`Alert button "${label}" not found`);
  return button;
};

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(Alert, 'alert').mockImplementation(() => {});

  (handleAvatarUpload as jest.Mock).mockResolvedValue(undefined);
  (handleAvatarRemove as jest.Mock).mockResolvedValue(undefined);

  (useAuth as jest.Mock).mockReturnValue({ session: mockSession, user: null, loading: false });
  (useProfileStore as unknown as jest.Mock).mockImplementation((selector: (state: ProfileState) => unknown) =>
    selector({ profile: mockProfile, setProfile: jest.fn(), updateProfile: mockUpdateProfile })
  );

  (ImagePicker.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({ granted: true });
  (ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({ granted: true });
  (ImagePicker.launchCameraAsync as jest.Mock).mockResolvedValue({ canceled: false, assets: [{ base64: 'CAM_BASE64' }] });
  (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({ canceled: false, assets: [{ base64: 'LIB_BASE64' }] });
});

it('renders the avatar and the change label', () => {
  render(<AvatarPickerContainer profile={mockProfile} />);

  expect(screen.getByTestId('avatar_picker')).toBeVisible();
  expect(screen.getByText('Profilbild ändern')).toBeVisible();
});

it('offers camera and library options, but no remove option without an avatar', () => {
  render(<AvatarPickerContainer profile={mockProfile} />);

  fireEvent.press(screen.getByTestId('avatar_picker'));

  const buttons = (Alert.alert as jest.Mock).mock.calls[0][2] as { text: string }[];
  const labels = buttons.map((b) => b.text);
  expect(labels).toEqual(['Kamera', 'Aus Galerie wählen', 'Abbrechen']);
});

it('offers a remove option when an avatar already exists', () => {
  render(<AvatarPickerContainer profile={mockProfileWithAvatar} />);

  fireEvent.press(screen.getByTestId('avatar_picker'));

  const buttons = (Alert.alert as jest.Mock).mock.calls[0][2] as { text: string }[];
  expect(buttons.map((b) => b.text)).toContain('Bild entfernen');
});

it('uploads the image taken with the camera', async () => {
  render(<AvatarPickerContainer profile={mockProfile} />);
  fireEvent.press(screen.getByTestId('avatar_picker'));

  await act(async () => {
    await getAlertButton('Kamera').onPress!();
  });

  expect(ImagePicker.launchCameraAsync).toHaveBeenCalled();
  expect(handleAvatarUpload).toHaveBeenCalledWith(mockSession, mockUpdateProfile, 'CAM_BASE64');
});

it('uploads the image chosen from the library', async () => {
  render(<AvatarPickerContainer profile={mockProfile} />);
  fireEvent.press(screen.getByTestId('avatar_picker'));

  await act(async () => {
    await getAlertButton('Aus Galerie wählen').onPress!();
  });

  expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled();
  expect(handleAvatarUpload).toHaveBeenCalledWith(mockSession, mockUpdateProfile, 'LIB_BASE64');
});

it('removes the avatar when the remove option is chosen', async () => {
  render(<AvatarPickerContainer profile={mockProfileWithAvatar} />);
  fireEvent.press(screen.getByTestId('avatar_picker'));

  await act(async () => {
    await getAlertButton('Bild entfernen').onPress!();
  });

  expect(handleAvatarRemove).toHaveBeenCalledWith(mockSession, mockUpdateProfile);
});

it('does nothing when the permission is denied', async () => {
  (ImagePicker.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({ granted: false });

  render(<AvatarPickerContainer profile={mockProfile} />);
  fireEvent.press(screen.getByTestId('avatar_picker'));

  await act(async () => {
    await getAlertButton('Kamera').onPress!();
  });

  expect(ImagePicker.launchCameraAsync).not.toHaveBeenCalled();
  expect(handleAvatarUpload).not.toHaveBeenCalled();
});

it('does nothing when the picker is canceled', async () => {
  (ImagePicker.launchCameraAsync as jest.Mock).mockResolvedValue({ canceled: true });

  render(<AvatarPickerContainer profile={mockProfile} />);
  fireEvent.press(screen.getByTestId('avatar_picker'));

  await act(async () => {
    await getAlertButton('Kamera').onPress!();
  });

  expect(handleAvatarUpload).not.toHaveBeenCalled();
});

it('shows an error alert when the upload fails', async () => {
  (handleAvatarUpload as jest.Mock).mockRejectedValue(new Error('boom'));

  render(<AvatarPickerContainer profile={mockProfile} />);
  fireEvent.press(screen.getByTestId('avatar_picker'));

  await act(async () => {
    await getAlertButton('Kamera').onPress!();
  });

  expect(Alert.alert).toHaveBeenCalledWith('Fehler', 'Das Profilbild konnte nicht hochgeladen werden.');
});
