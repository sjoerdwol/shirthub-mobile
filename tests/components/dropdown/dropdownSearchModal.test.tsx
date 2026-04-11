import DropdownSearchModal from "@/components/dropdown/dropdownSearchModal";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Modal, TouchableOpacity } from "react-native";

jest.mock('@/components/inputs/singleIconInputWithButton', () => {
  const { TextInput, TouchableOpacity, View } = require('react-native');
  return ({ onChangeText, value, setButtonState, secondIcon }: {
    onChangeText: (text: string) => void;
    value: string;
    setButtonState: () => void;
    secondIcon: string | null;
  }) => (
    <View>
      <TextInput testID="search_input" onChangeText={onChangeText} value={value} />
      {secondIcon && (
        <TouchableOpacity testID="clear_button" onPress={setButtonState}>
        </TouchableOpacity>
      )}
    </View>
  );
});

const mockOptions = ['Option A', 'Option B', 'Option C'];
const mockHandleSelect = jest.fn();
const mockSetIsVisible = jest.fn();
const mockSetQuery = jest.fn();

const defaultProps = {
  handleSelect: mockHandleSelect,
  isVisible: true,
  options: mockOptions,
  query: '',
  setIsVisible: mockSetIsVisible,
  setQuery: mockSetQuery,
  title: 'Test Title',
  value: '',
};

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders the title when visible', () => {
  render(<DropdownSearchModal {...defaultProps} />);

  expect(screen.getByText('Test Title')).toBeVisible();
});

it('renders all options', () => {
  render(<DropdownSearchModal {...defaultProps} />);

  expect(screen.getByText('Option A')).toBeVisible();
  expect(screen.getByText('Option B')).toBeVisible();
  expect(screen.getByText('Option C')).toBeVisible();
});

it('renders empty state when options list is empty', () => {
  render(<DropdownSearchModal {...defaultProps} options={[]} />);

  expect(screen.getByText('Keine Ergebnisse ...')).toBeVisible();
});

it('calls setIsVisible(false) when the close button is pressed', () => {
  const { UNSAFE_getAllByType } = render(<DropdownSearchModal {...defaultProps} />);

  // The close button is the first TouchableOpacity in the header
  fireEvent.press(UNSAFE_getAllByType(TouchableOpacity)[0]);

  expect(mockSetIsVisible).toHaveBeenCalledWith(false);
});

it('calls setIsVisible(false) via onRequestClose (hardware back button)', () => {
  const { UNSAFE_getByType } = render(<DropdownSearchModal {...defaultProps} />);

  UNSAFE_getByType(Modal).props.onRequestClose();

  expect(mockSetIsVisible).toHaveBeenCalledWith(false);
});

it('calls setQuery when the search input text changes', () => {
  render(<DropdownSearchModal {...defaultProps} />);

  fireEvent.changeText(screen.getByTestId('search_input'), 'Bayern');

  expect(mockSetQuery).toHaveBeenCalledWith('Bayern');
});

it('renders the clear button and calls setQuery("") when query is non-empty', () => {
  render(<DropdownSearchModal {...defaultProps} query="Bayern" />);

  expect(screen.getByTestId('clear_button')).toBeVisible();
  fireEvent.press(screen.getByTestId('clear_button'));

  expect(mockSetQuery).toHaveBeenCalledWith('');
});

it('does not render the clear button when query is empty', () => {
  render(<DropdownSearchModal {...defaultProps} query="" />);

  expect(screen.queryByTestId('clear_button')).toBeNull();
});

it('calls handleSelect with the option when an option is pressed', () => {
  render(<DropdownSearchModal {...defaultProps} />);

  fireEvent.press(screen.getByText('Option C'));

  expect(mockHandleSelect).toHaveBeenCalledWith('Option C');
});

it('does not render when isVisible is false', () => {
  render(<DropdownSearchModal {...defaultProps} isVisible={false} />);

  expect(screen.queryByText('Test Title')).toBeNull();
});
