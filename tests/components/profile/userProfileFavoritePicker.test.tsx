import UserProfileFavoritePicker from "@/components/profile/userProfileFavoritePicker";
import { useAuth } from "@/contexts/authContext";
import { useShirtStore } from "@/stores/shirtStore";
import { handleDeleteFavorite, handleSetFavorite } from "@/utils/handleShirtOperations";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { Modal } from "react-native";
import mockData from "../../data.json";

const mockSession = mockData.session;
const mockFavoriteShirt = mockData.shirt as unknown as Shirt;        // is_favorite: true
const mockOtherShirt = mockData.shirtWithoutSize as unknown as Shirt; // is_favorite: false
const mockProfile = mockData.profile as unknown as Profile;

const mockUpdateShirt = jest.fn();

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));
jest.mock('@/stores/shirtStore', () => ({ useShirtStore: jest.fn() }));
jest.mock('@/utils/handleShirtOperations', () => ({ handleSetFavorite: jest.fn(), handleDeleteFavorite: jest.fn() }));

jest.mock('@/components/ui/shirtImage', () => {
  const { View } = require('react-native');
  return () => <View testID="shirt_image" />;
});

const setShirts = (shirts: Array<Shirt>) => {
  (useShirtStore as unknown as jest.Mock).mockImplementation((selector: (state: ShirtState) => unknown) =>
    selector({ shirts, setShirts: jest.fn(), addShirt: jest.fn(), updateShirt: mockUpdateShirt, removeShirt: jest.fn() })
  );
};

beforeEach(() => {
  jest.clearAllMocks();
  (handleSetFavorite as jest.Mock).mockResolvedValue(undefined);
  (handleDeleteFavorite as jest.Mock).mockResolvedValue(undefined);
  (useAuth as jest.Mock).mockReturnValue({ session: mockSession });
  setShirts([mockFavoriteShirt, mockOtherShirt]);
});

it('shows the empty add box when there is no favorite', () => {
  setShirts([mockOtherShirt]);

  render(<UserProfileFavoritePicker />);

  expect(screen.getByText('Trikot hinzufügen')).toBeVisible();
});

it('shows the favorite shirt instead of the add box when one is set', () => {
  render(<UserProfileFavoritePicker />);

  expect(screen.queryByText('Trikot hinzufügen')).toBeNull();
  expect(screen.getAllByText('FC Bayern München').length).toBeGreaterThan(0);
});

it('opens the modal via the add box when there is no favorite', () => {
  setShirts([mockOtherShirt]);

  render(<UserProfileFavoritePicker />);

  fireEvent.press(screen.getByTestId('favorite_picker_trigger'));

  expect(screen.getByText('Lieblingstrikot wählen')).toBeVisible();
});

it('opens the modal via the edit button when a favorite is set', () => {
  render(<UserProfileFavoritePicker />);

  fireEvent.press(screen.getByTestId('icon_button_normal'));

  expect(screen.getByText('Lieblingstrikot wählen')).toBeVisible();
});

it('lists the shirts of the collection in the modal', () => {
  render(<UserProfileFavoritePicker />);

  fireEvent.press(screen.getByTestId('icon_button_normal'));

  expect(screen.getByTestId(`favorite_option_${mockFavoriteShirt.id}`)).toBeTruthy();
  expect(screen.getByTestId(`favorite_option_${mockOtherShirt.id}`)).toBeTruthy();
});

it('shows an empty hint in the modal when the collection is empty', () => {
  setShirts([]);

  render(<UserProfileFavoritePicker />);

  fireEvent.press(screen.getByTestId('favorite_picker_trigger'));

  expect(screen.getByText('Du hast noch keine Trikots in deiner Sammlung.')).toBeVisible();
});

it('closes the modal via the close button', () => {
  render(<UserProfileFavoritePicker />);

  fireEvent.press(screen.getByTestId('icon_button_normal'));
  expect(screen.getByText('Lieblingstrikot wählen')).toBeVisible();

  fireEvent.press(screen.getByTestId('favorite_modal_close'));

  expect(screen.queryByText('Lieblingstrikot wählen')).toBeNull();
});

it('closes the modal on a hardware back request', () => {
  render(<UserProfileFavoritePicker />);

  fireEvent.press(screen.getByTestId('icon_button_normal'));
  expect(screen.getByText('Lieblingstrikot wählen')).toBeVisible();

  fireEvent(screen.UNSAFE_getByType(Modal), 'requestClose');

  expect(screen.queryByText('Lieblingstrikot wählen')).toBeNull();
});

it('calls handleSetFavorite with the selected and previous favorite ids', async () => {
  render(<UserProfileFavoritePicker />);

  fireEvent.press(screen.getByTestId('icon_button_normal'));
  await act(async () => {
    fireEvent.press(screen.getByTestId(`favorite_option_${mockOtherShirt.id}`));
  });

  expect(handleSetFavorite).toHaveBeenCalledWith(mockSession, mockOtherShirt.id, mockFavoriteShirt.id, mockUpdateShirt);
});

it('passes null as previous favorite when none is set', async () => {
  setShirts([mockOtherShirt]);

  render(<UserProfileFavoritePicker />);

  fireEvent.press(screen.getByTestId('favorite_picker_trigger'));
  await act(async () => {
    fireEvent.press(screen.getByTestId(`favorite_option_${mockOtherShirt.id}`));
  });

  expect(handleSetFavorite).toHaveBeenCalledWith(mockSession, mockOtherShirt.id, null, mockUpdateShirt);
});

it('closes the modal after a shirt is selected', async () => {
  render(<UserProfileFavoritePicker />);

  fireEvent.press(screen.getByTestId('icon_button_normal'));
  await act(async () => {
    fireEvent.press(screen.getByTestId(`favorite_option_${mockOtherShirt.id}`));
  });

  expect(screen.queryByText('Lieblingstrikot wählen')).toBeNull();
});

it('does not call handleSetFavorite when there is no session', async () => {
  (useAuth as jest.Mock).mockReturnValue({ session: null });

  render(<UserProfileFavoritePicker />);

  fireEvent.press(screen.getByTestId('icon_button_normal'));
  await act(async () => {
    fireEvent.press(screen.getByTestId(`favorite_option_${mockOtherShirt.id}`));
  });

  expect(handleSetFavorite).not.toHaveBeenCalled();
});

it('calls handleDeleteFavorite when the delete button is pressed', async () => {
  render(<UserProfileFavoritePicker />);

  await act(async () => {
    fireEvent.press(screen.getByTestId('icon_button_delete'));
  });

  expect(handleDeleteFavorite).toHaveBeenCalledWith(mockSession, mockFavoriteShirt.id, mockUpdateShirt);
});

it('does not call handleDeleteFavorite when there is no session', async () => {
  (useAuth as jest.Mock).mockReturnValue({ session: null });

  render(<UserProfileFavoritePicker />);

  await act(async () => {
    fireEvent.press(screen.getByTestId('icon_button_delete'));
  });

  expect(handleDeleteFavorite).not.toHaveBeenCalled();
});
