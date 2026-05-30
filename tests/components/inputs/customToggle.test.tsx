import CustomToggle from "@/components/inputs/customToggle";
import { fireEvent, render, screen } from "@testing-library/react-native";

it('renders label and description', () => {
  render(
    <CustomToggle
      description="Andere Nutzer können dein Profil sehen."
      label="Profil öffentlich"
      onValueChange={jest.fn()}
      value={true}
    />
  );

  expect(screen.getByText('Profil öffentlich')).toBeVisible();
  expect(screen.getByText('Andere Nutzer können dein Profil sehen.')).toBeVisible();
});

it('does not render a description when none is provided', () => {
  render(
    <CustomToggle
      label="Profil öffentlich"
      onValueChange={jest.fn()}
      value={false}
    />
  );

  expect(screen.getByText('Profil öffentlich')).toBeVisible();
  expect(screen.queryByText('Andere Nutzer können dein Profil sehen.')).toBeNull();
});

it('calls onValueChange with true when toggled from off', () => {
  const mockOnValueChange = jest.fn();

  render(
    <CustomToggle
      label="Profil öffentlich"
      onValueChange={mockOnValueChange}
      value={false}
    />
  );

  fireEvent.press(screen.getByTestId('custom_toggle'));

  expect(mockOnValueChange).toHaveBeenCalledWith(true);
});

it('calls onValueChange with false when toggled from on', () => {
  const mockOnValueChange = jest.fn();

  render(
    <CustomToggle
      label="Profil öffentlich"
      onValueChange={mockOnValueChange}
      value={true}
    />
  );

  fireEvent.press(screen.getByTestId('custom_toggle'));

  expect(mockOnValueChange).toHaveBeenCalledWith(false);
});
