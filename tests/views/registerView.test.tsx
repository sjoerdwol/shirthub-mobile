import { useAuth } from "@/contexts/authContext";
import RegisterView from "@/views/registerView";
import { fireEvent, render, screen } from "@testing-library/react-native";

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));

const mockSignUp = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useAuth as jest.Mock).mockReturnValue({
    loading: false,
    signIn: jest.fn(),
    signOut: jest.fn(),
    signUp: mockSignUp,
    session: null,
    user: null,
  });
});

it('renders register form correctly', () => {
  render(<RegisterView />);

  expect(screen.getByText('Trete uns bei')).toBeVisible();
  expect(screen.getByText('Username')).toBeVisible();
  expect(screen.getByText('Email Adresse')).toBeVisible();
  expect(screen.getByText('Passwort')).toBeVisible();
  expect(screen.getByTestId('primary_button')).toHaveTextContent('Registrieren');
});

it('updates username input', () => {
  render(<RegisterView />);

  fireEvent.changeText(screen.getByPlaceholderText('Lege deinen Usernamen fest ...'), 'johndoe');

  expect(screen.getByDisplayValue('johndoe')).toBeVisible();
});

it('updates email input', () => {
  render(<RegisterView />);

  fireEvent.changeText(screen.getByPlaceholderText('name@beispiel.de'), 'john@example.com');

  expect(screen.getByDisplayValue('john@example.com')).toBeVisible();
});

it('updates password input', () => {
  render(<RegisterView />);

  fireEvent.changeText(screen.getByPlaceholderText('Lege dein Passwort fest ...'), 'password123');

  expect(screen.getByDisplayValue('password123')).toBeVisible();
});

it('toggles password visibility when eye button is pressed', () => {
  render(<RegisterView />);

  const passwordInput = screen.getByPlaceholderText('Lege dein Passwort fest ...');
  expect(passwordInput.props.secureTextEntry).toBe(true);

  fireEvent.press(screen.getByTestId('input_toggle_button'));

  expect(screen.getByPlaceholderText('Lege dein Passwort fest ...').props.secureTextEntry).toBe(false);
});

it('calls signUp with username, email and password when register button is pressed', () => {
  render(<RegisterView />);

  fireEvent.changeText(screen.getByPlaceholderText('Lege deinen Usernamen fest ...'), 'johndoe');
  fireEvent.changeText(screen.getByPlaceholderText('name@beispiel.de'), 'john@example.com');
  fireEvent.changeText(screen.getByPlaceholderText('Lege dein Passwort fest ...'), 'password123');
  fireEvent.press(screen.getByTestId('primary_button'));

  expect(mockSignUp).toHaveBeenCalledWith('john@example.com', 'password123', 'johndoe');
});

it('renders primary button in loading state when auth is loading', () => {
  (useAuth as jest.Mock).mockReturnValue({
    loading: true,
    signIn: jest.fn(),
    signOut: jest.fn(),
    signUp: mockSignUp,
    session: null,
    user: null,
  });

  render(<RegisterView />);

  expect(screen.getByTestId('primary_button')).toBeDisabled();
});
