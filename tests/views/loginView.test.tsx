import { useAuth } from "@/contexts/authContext";
import LoginView from "@/views/loginView";
import { fireEvent, render, screen } from "@testing-library/react-native";

jest.mock('@/contexts/authContext', () => ({ useAuth: jest.fn() }));

const mockSignIn = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useAuth as jest.Mock).mockReturnValue({
    loading: false,
    signIn: mockSignIn,
    signOut: jest.fn(),
    signUp: jest.fn(),
    session: null,
    user: null,
  });
});

it('renders login form correctly', () => {
  render(<LoginView />);

  expect(screen.getByText('Willkommen zurück')).toBeVisible();
  expect(screen.getByText('Email Adresse')).toBeVisible();
  expect(screen.getByText('Passwort')).toBeVisible();
  expect(screen.getByTestId('primary_button')).toHaveTextContent('Anmelden');
});

it('updates email input', () => {
  render(<LoginView />);

  fireEvent.changeText(screen.getByPlaceholderText('name@beispiel.de'), 'test@example.com');

  expect(screen.getByDisplayValue('test@example.com')).toBeVisible();
});

it('updates password input', () => {
  render(<LoginView />);

  fireEvent.changeText(screen.getByPlaceholderText('Dein Passwort ...'), 'secret123');

  expect(screen.getByDisplayValue('secret123')).toBeVisible();
});

it('toggles password visibility when eye button is pressed', () => {
  render(<LoginView />);

  const passwordInput = screen.getByPlaceholderText('Dein Passwort ...');
  expect(passwordInput.props.secureTextEntry).toBe(true);

  fireEvent.press(screen.getByTestId('input_toggle_button'));

  expect(screen.getByPlaceholderText('Dein Passwort ...').props.secureTextEntry).toBe(false);
});

it('calls signIn with email and password when login button is pressed', () => {
  render(<LoginView />);

  fireEvent.changeText(screen.getByPlaceholderText('name@beispiel.de'), 'test@example.com');
  fireEvent.changeText(screen.getByPlaceholderText('Dein Passwort ...'), 'secret123');
  fireEvent.press(screen.getByTestId('primary_button'));

  expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'secret123');
});

it('renders primary button in loading state when auth is loading', () => {
  (useAuth as jest.Mock).mockReturnValue({
    loading: true,
    signIn: mockSignIn,
    signOut: jest.fn(),
    signUp: jest.fn(),
    session: null,
    user: null,
  });

  render(<LoginView />);

  expect(screen.getByTestId('primary_button')).toBeDisabled();
});
