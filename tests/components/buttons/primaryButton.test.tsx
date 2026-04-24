import PrimaryButton from "@/components/buttons/primaryButton";
import { fireEvent, render, screen } from "@testing-library/react-native";

it('renders button correctly and fires onPress', () => {
  const mockFunction = jest.fn();

  render(
    <PrimaryButton
      loading={false}
      onPress={mockFunction}
      text="Test Button"
    />
  );

  const testButton = screen.getByTestId('primary_button')
  fireEvent.press(testButton);

  expect(testButton).toBeVisible();
  expect(testButton).toHaveTextContent('Test Button');
  expect(testButton).not.toBeDisabled();
  expect(mockFunction).toHaveBeenCalled();
});

it('renders button in loading and does not fire onPress', () => {
  const mockFunction = jest.fn();

  render(
    <PrimaryButton
      loading={true}
      onPress={mockFunction}
      text="Test Button"
    />
  );

  const testButton = screen.getByTestId('primary_button')
  fireEvent.press(testButton);

  expect(testButton).toBeVisible();
  expect(testButton).not.toHaveTextContent('Test Button');
  expect(testButton).toBeDisabled();
  expect(mockFunction).not.toHaveBeenCalled();
});