import SingleIconInput from "@/components/inputs/singleIconInput";
import { fireEvent, render, screen } from "@testing-library/react-native";

it('renders input with placeholder and value', () => {
  render(
    <SingleIconInput
      firstIcon="search"
      keyboardType="default"
      onChangeText={jest.fn()}
      placeholder="Search..."
      value="hello"
    />
  );

  const input = screen.getByDisplayValue('hello');
  expect(input).toBeVisible();
  expect(input.props.placeholder).toBe('Search...');
});

it('calls onChangeText when text changes', () => {
  const mockOnChange = jest.fn();

  render(
    <SingleIconInput
      firstIcon="search"
      keyboardType="default"
      onChangeText={mockOnChange}
      placeholder="Search..."
      value=""
    />
  );

  const input = screen.getByPlaceholderText('Search...');
  fireEvent.changeText(input, 'new value');

  expect(mockOnChange).toHaveBeenCalledWith('new value');
});

it('renders with numeric keyboard type', () => {
  render(
    <SingleIconInput
      firstIcon="calculator"
      keyboardType="numeric"
      onChangeText={jest.fn()}
      placeholder="Enter number"
      value="42"
    />
  );

  const input = screen.getByDisplayValue('42');
  expect(input.props.keyboardType).toBe('numeric');
});
