import AuthIndex from "@/app/(authentication)/index";
import { fireEvent, render, screen } from "@testing-library/react-native";

jest.mock('@/views/loginView', () => {
  const { Text, View } = require('react-native');
  return () => (
    <View>
      <Text testID="login_view">LoginView</Text>
    </View>
  );
});

jest.mock('@/views/registerView', () => {
  const { Text, View } = require('react-native');
  return () => (
    <View>
      <Text testID="register_view">RegisterView</Text>
    </View>
  );
});

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders login view by default', () => {
  render(<AuthIndex />);

  expect(screen.getByTestId('login_view')).toBeVisible();
  expect(screen.queryByTestId('register_view')).toBeNull();
});

it('renders app title and subtitle', () => {
  render(<AuthIndex />);

  expect(screen.getByText('ShirtHub')).toBeVisible();
  expect(screen.getByText('Die ultimative Community der Trikotsammler!')).toBeVisible();
});

it('renders register prompt when in login mode', () => {
  render(<AuthIndex />);

  expect(screen.getByText('Noch keinen Account?', { exact: false })).toBeVisible();
  expect(screen.getByText('Jetzt registrieren!')).toBeVisible();
});

it('switches to register view when register link is pressed', () => {
  render(<AuthIndex />);

  fireEvent.press(screen.getByText('Jetzt registrieren!'));

  expect(screen.getByTestId('register_view')).toBeVisible();
  expect(screen.queryByTestId('login_view')).toBeNull();
});

it('renders login prompt when in register mode', () => {
  render(<AuthIndex />);

  fireEvent.press(screen.getByText('Jetzt registrieren!'));

  expect(screen.getByText('Bereits einen Account?', { exact: false })).toBeVisible();
  expect(screen.getByText('Jetzt anmelden!')).toBeVisible();
});

it('switches back to login view when login link is pressed', () => {
  render(<AuthIndex />);

  fireEvent.press(screen.getByText('Jetzt registrieren!'));
  fireEvent.press(screen.getByText('Jetzt anmelden!'));

  expect(screen.getByTestId('login_view')).toBeVisible();
  expect(screen.queryByTestId('register_view')).toBeNull();
});
