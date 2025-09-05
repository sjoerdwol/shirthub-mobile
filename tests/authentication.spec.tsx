import AuthIndex from "@/app/(authentication)/index";
import LoginScreen from "@/app/(authentication)/login";
import RegisterScreen from "@/app/(authentication)/register";
import AuthButton from "@/components/authentication/button";
import AuthInput from "@/components/authentication/input";
import { useAuth } from "@/contexts/authContext";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";

// Mock the auth context
jest.mock('@/contexts/authContext', () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe("Auth Button", () => {
  it("renders children text when not loading and fires onPress", () => {
    const onPress = jest.fn();
    render(
      <AuthButton loading={false} onPress={onPress}>
        Sign In
      </AuthButton>
    );

    screen.getByText("Sign In");
    fireEvent.press(screen.getByTestId('auth_button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("shows ActivityIndicator and disables button when loading", () => {
    const onPress = jest.fn();
    render(
      <AuthButton loading onPress={onPress}>
        Loading
      </AuthButton>
    );

    expect(screen.queryByText("Loading")).toBeNull();
    fireEvent.press(screen.getByTestId('auth_button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe("Auth Input", () => {
  it("renders with placeholder, value and calls onChangeText", () => {
    const onChangeText = jest.fn();
    render(
      <AuthInput
        placeholder="Email"
        value="user@example.com"
        onChangeText={onChangeText}
        keyboardType="email-address"
      />
    );

    screen.getByPlaceholderText("Email");
    const input = screen.getByDisplayValue("user@example.com");
    fireEvent.changeText(input, "new@example.com");
    expect(onChangeText).toHaveBeenCalledWith("new@example.com");
  });

  it("supports secureTextEntry for password fields", () => {
    render(
      <AuthInput
        placeholder="Password"
        value="secret"
        secureTextEntry
        onChangeText={jest.fn()}
      />
    );

    screen.getByPlaceholderText("Password");
  });
});

describe("Auth Index Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      loading: false,
      session: null,
      user: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
      signUp: jest.fn(),
    });
  });

  it("renders login screen by default", () => {
    render(<AuthIndex />);

    screen.getByText("Login");
    screen.getByText("No account yet? Sign up!");
  });

  it("switches to register screen when sign up button is pressed", () => {
    render(<AuthIndex />);

    const signUpButton = screen.getByText("No account yet? Sign up!");
    fireEvent.press(signUpButton);

    screen.getByText("Sign Up");
    screen.getByText("Already have an account? Log in!");
  });

  it("switches back to login screen when log in button is pressed", () => {
    render(<AuthIndex />);

    const signUpButton = screen.getByText("No account yet? Sign up!");
    fireEvent.press(signUpButton);

    const logInButton = screen.getByText("Already have an account? Log in!");
    fireEvent.press(logInButton);

    screen.getByText("Login");
    screen.getByText("No account yet? Sign up!");
  });

  it("maintains state when switching between modes", () => {
    const { rerender } = render(<AuthIndex />);

    const signUpButton = screen.getByText("No account yet? Sign up!");
    fireEvent.press(signUpButton);

    screen.getByText("Sign Up");

    rerender(<AuthIndex />);
    screen.getByText("Sign Up");
  });
});

describe("Login Screen Component", () => {
  const mockSignIn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      loading: false,
      session: null,
      user: null,
      signIn: mockSignIn,
      signOut: jest.fn(),
      signUp: jest.fn(),
    });
  });

  it("renders login form with all required elements", () => {
    render(<LoginScreen />);

    screen.getByText("Login");
    screen.getByPlaceholderText("Email");
    screen.getByPlaceholderText("Password");
    screen.getByTestId('auth_button');
  });

  it("updates email input when user types", () => {
    render(<LoginScreen />);

    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.changeText(emailInput, "test@example.com");

    expect(emailInput.props.value).toBe("test@example.com");
  });

  it("updates password input when user types", () => {
    render(<LoginScreen />);

    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.changeText(passwordInput, "password123");

    expect(passwordInput.props.value).toBe("password123");
  });

  it("calls signIn with correct parameters when login button is pressed", () => {
    render(<LoginScreen />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByTestId('auth_button');

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(loginButton);

    expect(mockSignIn).toHaveBeenCalledWith("test@example.com", "password123");
  });

  it("shows loading state when authentication is in progress", () => {
    mockUseAuth.mockReturnValue({
      loading: true,
      session: null,
      user: null,
      signIn: mockSignIn,
      signOut: jest.fn(),
      signUp: jest.fn(),
    });

    render(<LoginScreen />);

    const loginButton = screen.getByTestId('auth_button');
    expect(loginButton._fiber.stateNode.props.accessibilityState.disabled).toBe(true);
  });

  it("password input has secureTextEntry enabled", () => {
    render(<LoginScreen />);

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  it("email input has correct keyboard type", () => {
    render(<LoginScreen />);

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput.props.keyboardType).toBe("email-address");
  });

  it("handles empty form submission", () => {
    render(<LoginScreen />);

    const loginButton = screen.getByTestId('auth_button');
    fireEvent.press(loginButton);

    expect(mockSignIn).toHaveBeenCalledWith("", "");
  });
});

describe("RegisterScreen Component", () => {
  const mockSignUp = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      loading: false,
      session: null,
      user: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
      signUp: mockSignUp,
    });
  });

  it("renders register form with all required elements", () => {
    render(<RegisterScreen />);

    screen.getByText("Sign Up");
    screen.getByPlaceholderText("Username");
    screen.getByPlaceholderText("Email");
    screen.getByPlaceholderText("Password");
    screen.getByText("Register");
  });

  it("updates username input when user types", () => {
    render(<RegisterScreen />);

    const usernameInput = screen.getByPlaceholderText("Username");
    fireEvent.changeText(usernameInput, "testuser");

    expect(usernameInput.props.value).toBe("testuser");
  });

  it("updates email input when user types", () => {
    render(<RegisterScreen />);

    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.changeText(emailInput, "test@example.com");

    expect(emailInput.props.value).toBe("test@example.com");
  });

  it("updates password input when user types", () => {
    render(<RegisterScreen />);

    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.changeText(passwordInput, "password123");

    expect(passwordInput.props.value).toBe("password123");
  });

  it("calls signUp with correct parameters when register button is pressed", () => {
    render(<RegisterScreen />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const registerButton = screen.getByText("Register");

    fireEvent.changeText(usernameInput, "testuser");
    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(registerButton);

    expect(mockSignUp).toHaveBeenCalledWith("test@example.com", "password123", "testuser");
  });

  it("shows loading state when authentication is in progress", () => {
    mockUseAuth.mockReturnValue({
      loading: true,
      session: null,
      user: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
      signUp: mockSignUp,
    });

    render(<RegisterScreen />);

    const registerButton = screen.getByTestId('auth_button');
    expect(registerButton._fiber.stateNode.props.accessibilityState.disabled).toBe(true);
  });

  it("password input has secureTextEntry enabled", () => {
    render(<RegisterScreen />);

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  it("email input has correct keyboard type", () => {
    render(<RegisterScreen />);

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput.props.keyboardType).toBe("email-address");
  });

  it("handles empty form submission", () => {
    render(<RegisterScreen />);

    const registerButton = screen.getByText("Register");
    fireEvent.press(registerButton);

    expect(mockSignUp).toHaveBeenCalledWith("", "", "");
  });

  it("maintains form state during user interaction", () => {
    render(<RegisterScreen />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.changeText(usernameInput, "testuser");
    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    expect(usernameInput.props.value).toBe("testuser");
    expect(emailInput.props.value).toBe("test@example.com");
    expect(passwordInput.props.value).toBe("password123");
  });
});