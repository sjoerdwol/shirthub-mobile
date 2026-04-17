import SingleIconInputWithButton from "@/components/inputs/singleIconInputWithButton";
import { fireEvent, render, screen } from "@testing-library/react-native";

it('renders input without second icon button', () => {
  render(
    <SingleIconInputWithButton
      firstIcon="lock-closed"
      keyboardType="default"
      onChangeText={jest.fn()}
      placeholder="Enter password"
      secureTextEntry={true}
      value=""
    />
  );

  const input = screen.getByPlaceholderText('Enter password');
  expect(input).toBeVisible();
  expect(input.props.secureTextEntry).toBe(true);
});

it('calls onChangeText when text changes', () => {
  const mockOnChange = jest.fn();

  render(
    <SingleIconInputWithButton
      firstIcon="lock-closed"
      keyboardType="default"
      onChangeText={mockOnChange}
      placeholder="Enter password"
      value=""
    />
  );

  const input = screen.getByPlaceholderText('Enter password');
  fireEvent.changeText(input, 'secret');

  expect(mockOnChange).toHaveBeenCalledWith('secret');
});

it('renders second icon button and calls setButtonState on press', () => {
  const mockSetButtonState = jest.fn();

  render(
    <SingleIconInputWithButton
      buttonState={false}
      firstIcon="lock-closed"
      keyboardType="default"
      onChangeText={jest.fn()}
      placeholder="Enter password"
      secureTextEntry={true}
      secondIcon="eye"
      setButtonState={mockSetButtonState}
      value=""
    />
  );

  const input = screen.getByPlaceholderText('Enter password');
  expect(input).toBeVisible();

  const pressable = screen.getByTestId('input_toggle_button');
  fireEvent.press(pressable);

  expect(mockSetButtonState).toHaveBeenCalledWith(true);
});

it('toggles buttonState from true to false when pressed', () => {
  const mockSetButtonState = jest.fn();

  render(
    <SingleIconInputWithButton
      buttonState={true}
      firstIcon="lock-closed"
      keyboardType="default"
      onChangeText={jest.fn()}
      placeholder="Enter password"
      secondIcon="eye-off"
      setButtonState={mockSetButtonState}
      value=""
    />
  );

  const pressable = screen.getByTestId('input_toggle_button');
  fireEvent.press(pressable);

  expect(mockSetButtonState).toHaveBeenCalledWith(false);
});
