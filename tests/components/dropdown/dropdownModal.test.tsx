import DropdownModal from "@/components/dropdown/dropdownModal";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Modal, TouchableOpacity } from "react-native";

const mockOptions = ['Option A', 'Option B', 'Option C'];
const mockHandleSelect = jest.fn();
const mockSetIsVisible = jest.fn();

const defaultProps = {
  handleSelect: mockHandleSelect,
  isVisible: true,
  options: mockOptions,
  setIsVisible: mockSetIsVisible,
  title: 'Test Title',
  value: '',
};

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders the title when visible', () => {
  render(<DropdownModal {...defaultProps} />);

  expect(screen.getByText('Test Title')).toBeVisible();
});

it('renders all options', () => {
  render(<DropdownModal {...defaultProps} />);

  expect(screen.getByText('Option A')).toBeVisible();
  expect(screen.getByText('Option B')).toBeVisible();
  expect(screen.getByText('Option C')).toBeVisible();
});

it('renders empty state when options list is empty', () => {
  render(<DropdownModal {...defaultProps} options={[]} />);

  expect(screen.getByText('Keine Ergebnisse ...')).toBeVisible();
});

it('calls setIsVisible(false) when the close button is pressed', () => {
  const { UNSAFE_getAllByType } = render(<DropdownModal {...defaultProps} />);

  // The close button is the first TouchableOpacity in the header, before the option items
  fireEvent.press(UNSAFE_getAllByType(TouchableOpacity)[0]);

  expect(mockSetIsVisible).toHaveBeenCalledWith(false);
});

it('calls handleSelect with the option when an option is pressed', () => {
  render(<DropdownModal {...defaultProps} />);

  fireEvent.press(screen.getByText('Option B'));

  expect(mockHandleSelect).toHaveBeenCalledWith('Option B');
});

it('calls setIsVisible(false) via onRequestClose (hardware back button)', () => {
  const { UNSAFE_getByType } = render(<DropdownModal {...defaultProps} />);

  UNSAFE_getByType(Modal).props.onRequestClose();

  expect(mockSetIsVisible).toHaveBeenCalledWith(false);
});

it('does not render when isVisible is false', () => {
  render(<DropdownModal {...defaultProps} isVisible={false} />);

  expect(screen.queryByText('Test Title')).toBeNull();
});
