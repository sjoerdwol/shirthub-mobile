import AvatarPicker from "@/components/profile/avatarPicker";
import { fireEvent, render, screen } from "@testing-library/react-native";
import mockData from "../../data.json";

const mockProfile = mockData.profile as unknown as Profile;

it('renders the avatar and the change label', () => {
  render(<AvatarPicker loading={false} profile={mockProfile} showOptions={jest.fn()} />);

  expect(screen.getByTestId('avatar_picker')).toBeVisible();
  expect(screen.getByText('Profilbild ändern')).toBeVisible();
});

it('calls showOptions when the avatar is pressed', () => {
  const showOptions = jest.fn();

  render(<AvatarPicker loading={false} profile={mockProfile} showOptions={showOptions} />);
  fireEvent.press(screen.getByTestId('avatar_picker'));

  expect(showOptions).toHaveBeenCalled();
});

it('shows a loading indicator and blocks interaction while uploading', () => {
  const showOptions = jest.fn();

  render(<AvatarPicker loading={true} profile={mockProfile} showOptions={showOptions} />);

  expect(screen.getByTestId('avatar_picker_loading')).toBeVisible();
  fireEvent.press(screen.getByTestId('avatar_picker'));
  expect(showOptions).not.toHaveBeenCalled();
});
