import Dropdown from "@/components/dropdown/index";
import { act, fireEvent, render, screen } from "@testing-library/react-native";

const mockOptions = ['Option A', 'Option B', 'Option C'];
let capturedHandleSelect: ((opt: string) => void) | null = null;
let capturedSetQuery: ((q: string) => void) | null = null;

jest.mock('@/components/dropdown/dropdownModal', () => {
  const { Text, TouchableOpacity, View } = require('react-native');
  return ({ handleSelect, isVisible, options, setIsVisible, title, value }: {
    handleSelect: (opt: string) => void;
    isVisible: boolean;
    options: string[];
    setIsVisible: (v: boolean) => void;
    title: string;
    value: string;
  }) => {
    capturedHandleSelect = handleSelect;
    if (!isVisible) return null;
    return (
      <View testID="dropdown_modal">
        <Text testID="modal_title">{title}</Text>
        {options.map((opt) => (
          <TouchableOpacity key={opt} testID={`modal_option_${opt}`} onPress={() => handleSelect(opt)}>
            <Text>{opt}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity testID="modal_close" onPress={() => setIsVisible(false)}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };
});

jest.mock('@/components/dropdown/dropdownSearchModal', () => {
  const { Text, TouchableOpacity, View } = require('react-native');
  return ({ handleSelect, isVisible, options, setIsVisible, setQuery, title }: {
    handleSelect: (opt: string) => void;
    isVisible: boolean;
    options: string[];
    setIsVisible: (v: boolean) => void;
    setQuery: (q: string) => void;
    title: string;
  }) => {
    capturedSetQuery = setQuery;
    if (!isVisible) return null;
    return (
      <View testID="dropdown_search_modal">
        <Text testID="search_modal_title">{title}</Text>
        <Text testID="search_modal_options_count">{options.length}</Text>
        {options.map((opt) => (
          <TouchableOpacity key={opt} testID={`search_option_${opt}`} onPress={() => handleSelect(opt)}>
            <Text>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
});

const defaultProps = {
  errorMessage: 'This field is required',
  isValid: true,
  onSelection: jest.fn(),
  options: mockOptions,
  placeholder: 'Select an option',
  title: 'Test Dropdown',
  value: '',
  withSearch: false,
};

beforeEach(() => {
  jest.clearAllMocks();
  capturedHandleSelect = null;
  capturedSetQuery = null;
});

it('renders the title and placeholder when no value is selected', () => {
  render(<Dropdown {...defaultProps} />);

  expect(screen.getByText('Test Dropdown')).toBeVisible();
  expect(screen.getByText('Select an option')).toBeVisible();
});

it('renders the selected value instead of placeholder when value is set', () => {
  render(<Dropdown {...defaultProps} value="Option A" />);

  expect(screen.getByText('Option A')).toBeVisible();
  expect(screen.queryByText('Select an option')).toBeNull();
});

it('shows the error message when isValid is false', () => {
  render(<Dropdown {...defaultProps} isValid={false} />);

  expect(screen.getByText('This field is required')).toBeVisible();
});

it('does not show the error message when isValid is true', () => {
  render(<Dropdown {...defaultProps} isValid={true} />);

  expect(screen.queryByText('This field is required')).toBeNull();
});

it('renders DropdownModal when withSearch is false', () => {
  render(<Dropdown {...defaultProps} withSearch={false} />);

  // Open the modal first
  fireEvent.press(screen.getByText('Select an option'));

  expect(screen.getByTestId('dropdown_modal')).toBeVisible();
  expect(screen.queryByTestId('dropdown_search_modal')).toBeNull();
});

it('renders DropdownSearchModal when withSearch is true', () => {
  render(<Dropdown {...defaultProps} withSearch={true} />);

  fireEvent.press(screen.getByText('Select an option'));

  expect(screen.getByTestId('dropdown_search_modal')).toBeVisible();
  expect(screen.queryByTestId('dropdown_modal')).toBeNull();
});

it('opens the modal when the trigger is pressed', () => {
  render(<Dropdown {...defaultProps} />);

  expect(screen.queryByTestId('dropdown_modal')).toBeNull();
  fireEvent.press(screen.getByText('Select an option'));
  expect(screen.getByTestId('dropdown_modal')).toBeVisible();
});

it('calls onSelection and closes the modal when an option is selected', () => {
  const mockOnSelection = jest.fn();
  render(<Dropdown {...defaultProps} onSelection={mockOnSelection} />);

  fireEvent.press(screen.getByText('Select an option'));
  fireEvent.press(screen.getByTestId('modal_option_Option A'));

  expect(mockOnSelection).toHaveBeenCalledWith('Option A');
  expect(screen.queryByTestId('dropdown_modal')).toBeNull();
});

it('filters options in DropdownSearchModal based on query', () => {
  render(<Dropdown {...defaultProps} withSearch={true} />);

  fireEvent.press(screen.getByText('Select an option'));

  expect(screen.getByTestId('search_modal_options_count')).toHaveTextContent('3');

  // Simulate typing a query via the captured setQuery
  act(() => capturedSetQuery!('option a'));

  expect(screen.getByTestId('search_modal_options_count')).toHaveTextContent('1');
});
