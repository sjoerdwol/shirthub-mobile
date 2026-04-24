import SingleIconInputWithLabel from "@/components/inputs/singleIconInputWithLabel";
import { fireEvent, render, screen } from "@testing-library/react-native";

it('renders label and input correctly', () => {
  render(
    <SingleIconInputWithLabel
      errorMessage="Invalid input"
      firstIcon="person"
      isValid={true}
      keyboardType="default"
      label="Username"
      onChangeText={jest.fn()}
      placeholder="Enter username"
      value="john"
    />
  );

  expect(screen.getByText('Username')).toBeVisible();
  const input = screen.getByDisplayValue('john');
  expect(input).toBeVisible();
  expect(input.props.placeholder).toBe('Enter username');
});

it('shows error message when isValid is false', () => {
  render(
    <SingleIconInputWithLabel
      errorMessage="This field is required"
      firstIcon="person"
      isValid={false}
      keyboardType="default"
      label="Username"
      onChangeText={jest.fn()}
      placeholder="Enter username"
      value=""
    />
  );

  expect(screen.getByText('This field is required')).toBeVisible();
});

it('hides error message when isValid is true', () => {
  render(
    <SingleIconInputWithLabel
      errorMessage="This field is required"
      firstIcon="person"
      isValid={true}
      keyboardType="default"
      label="Username"
      onChangeText={jest.fn()}
      placeholder="Enter username"
      value="john"
    />
  );

  expect(screen.queryByText('This field is required')).toBeNull();
});

it('uses FontAwesome6 icon for hashtag', () => {
  render(
    <SingleIconInputWithLabel
      errorMessage=""
      firstIcon="hashtag"
      isValid={true}
      keyboardType="numeric"
      label="Number"
      onChangeText={jest.fn()}
      placeholder="Enter number"
      value=""
    />
  );

  expect(screen.getByText('Number')).toBeVisible();
});

it('uses FontAwesome6 icon for money-bill', () => {
  render(
    <SingleIconInputWithLabel
      errorMessage=""
      firstIcon="money-bill"
      isValid={true}
      keyboardType="numeric"
      label="Price"
      onChangeText={jest.fn()}
      placeholder="Enter price"
      value=""
    />
  );

  expect(screen.getByText('Price')).toBeVisible();
});

it('calls onChangeText when text changes', () => {
  const mockOnChange = jest.fn();

  render(
    <SingleIconInputWithLabel
      errorMessage=""
      firstIcon="person"
      isValid={true}
      keyboardType="default"
      label="Username"
      onChangeText={mockOnChange}
      placeholder="Enter username"
      value=""
    />
  );

  const input = screen.getByPlaceholderText('Enter username');
  fireEvent.changeText(input, 'jane');

  expect(mockOnChange).toHaveBeenCalledWith('jane');
});

it('respects maxLength prop', () => {
  render(
    <SingleIconInputWithLabel
      errorMessage=""
      firstIcon="person"
      isValid={true}
      keyboardType="default"
      label="Username"
      maxLength={10}
      onChangeText={jest.fn()}
      placeholder="Enter username"
      value=""
    />
  );

  const input = screen.getByPlaceholderText('Enter username');
  expect(input.props.maxLength).toBe(10);
});
