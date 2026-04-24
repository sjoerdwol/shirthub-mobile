import IconButton from "@/components/buttons/iconButton";
import { fireEvent, render, screen } from "@testing-library/react-native";

it('renders delete button and fires onPress', () => {
  const mockFunction = jest.fn();

  render(
    <IconButton
      deleteButton
      icon='trash'
      onPress={mockFunction}
    />
  );

  const iconButton = screen.getByTestId('icon_button_delete');
  fireEvent.press(iconButton);

  expect(iconButton.props.className).toContain('bg-red-600');
  expect(mockFunction).toHaveBeenCalled();
});

it('renders normal button and fires onPress', () => {
  const mockFunction = jest.fn();

  render(
    <IconButton
      icon='pen'
      onPress={mockFunction}
    />
  );

  const iconButton = screen.getByTestId('icon_button_normal');
  fireEvent.press(iconButton);

  expect(iconButton.props.className).toContain('bg-dark-highlight');
  expect(mockFunction).toHaveBeenCalled();
});