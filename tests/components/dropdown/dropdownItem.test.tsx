import DropdownItem from "@/components/dropdown/dropdownItem";
import { fireEvent, render, screen } from "@testing-library/react-native";

const mockFunction = jest.fn();

it('renders active dropdown item correctly', () => {
  render(
    <DropdownItem
      isActive
      option="Active Item"
      onSelection={mockFunction}
    />
  );

  const item = screen.getByText('Active Item');
  fireEvent.press(item);
  expect(item.props.className).toContain('text-white/70');
  expect(mockFunction).toHaveBeenCalled();
});

it('renders inactive dropdown item correctly', () => {
  render(
    <DropdownItem
      isActive={false}
      option="Inactive Item"
      onSelection={mockFunction}
    />
  );

  const item = screen.getByText('Inactive Item');
  expect(item.props.className).toContain('text-white/40');
});