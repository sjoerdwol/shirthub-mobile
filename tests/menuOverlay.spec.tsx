import MenuOverlay from "@/components/menuOverlay/menuOverlay";
import MenuOverlayEntry from "@/components/menuOverlay/menuOverlayEntry";
import { fireEvent, render, screen } from "@testing-library/react-native";

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('Menu Overlay Entry', () => {
  const defaultProps = {
    color: '#e0e5eb',
    iconName: 'create-outline' as const,
    size: 20,
    onPress: jest.fn(),
    text: 'Edit'
  };

  it('renders MenuOverlayEntry correctly with all props', () => {
    render(<MenuOverlayEntry {...defaultProps} />);

    screen.getByText('Edit');
  });

  it('renders with custom text and color', () => {
    const customProps = {
      ...defaultProps,
      text: 'Custom Text',
      color: '#ff0000'
    };

    render(<MenuOverlayEntry {...customProps} />);

    const textElement = screen.getByText('Custom Text');
    expect(textElement).toBeTruthy();
    expect(textElement.props.style.color).toBe('#ff0000');
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    render(<MenuOverlayEntry {...defaultProps} onPress={mockOnPress} />);

    fireEvent.press(screen.getByText('Edit').parent);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders with different icon names', () => {
    const trashProps = {
      ...defaultProps,
      iconName: 'trash' as const,
      text: 'Delete'
    };

    render(<MenuOverlayEntry {...trashProps} />);
    screen.getByText('Delete');
  });

  it('renders with different sizes', () => {
    const largeProps = {
      ...defaultProps,
      size: 24
    };

    render(<MenuOverlayEntry {...largeProps} />);
    screen.getByText('Edit');
  });
});

describe('Menu Overlay', () => {
  const defaultProps = {
    visible: true,
    onClose: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders MenuOverlay when visible is true', () => {
    render(<MenuOverlay {...defaultProps} />);

    screen.getByText('Edit');
    screen.getByText('Delete');
  });

  it('does not render when visible is false', () => {
    render(<MenuOverlay {...defaultProps} visible={false} />);

    expect(screen.queryByText('Edit')).toBeNull();
    expect(screen.queryByText('Delete')).toBeNull();
  });

  it('calls onClose when background is pressed', () => {
    const mockOnClose = jest.fn();

    render(<MenuOverlay {...defaultProps} onClose={mockOnClose} />);
    fireEvent.press(screen.getByTestId('pressable_background_close_menu'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onEdit when Edit button is pressed', () => {
    const mockOnEdit = jest.fn();

    render(<MenuOverlay {...defaultProps} onEdit={mockOnEdit} />);
    fireEvent.press(screen.getByText('Edit').parent);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when Delete button is pressed', () => {
    const mockOnDelete = jest.fn();

    render(<MenuOverlay {...defaultProps} onDelete={mockOnDelete} />);
    fireEvent.press(screen.getByText('Delete').parent);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('handles multiple rapid button presses correctly', () => {
    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();

    render(<MenuOverlay {...defaultProps} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    const editButton = screen.getByText('Edit').parent;
    const deleteButton = screen.getByText('Delete').parent;

    // Press both buttons rapidly
    fireEvent.press(editButton);
    fireEvent.press(deleteButton);
    fireEvent.press(editButton);

    expect(mockOnEdit).toHaveBeenCalledTimes(2);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});