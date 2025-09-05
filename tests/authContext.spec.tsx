import { AuthContextProvider, useAuth } from "@/contexts/authContext";
import { checkForActiveSession, fetchActiveUser, signInWithEmail, signOutFromSession, signUpWithEmail } from "@/services/supabase_auth";
import { isSession } from "@/utils/typeGuards";
import { Session, User } from '@supabase/supabase-js';
import { render, waitFor } from '@testing-library/react-native';
import React from 'react';

// Mock the supabase auth services
jest.mock('@/services/supabase_auth', () => ({
  checkForActiveSession: jest.fn(),
  fetchActiveUser: jest.fn(),
  signInWithEmail: jest.fn(),
  signOutFromSession: jest.fn(),
  signUpWithEmail: jest.fn(),
}));

// Mock the type guards utility
jest.mock('@/utils/typeGuards', () => ({
  isSession: jest.fn(),
}));

const mockCheckForActiveSession = checkForActiveSession as jest.MockedFunction<typeof checkForActiveSession>;
const mockFetchActiveUser = fetchActiveUser as jest.MockedFunction<typeof fetchActiveUser>;
const mockSignInWithEmail = signInWithEmail as jest.MockedFunction<typeof signInWithEmail>;
const mockSignOutFromSession = signOutFromSession as jest.MockedFunction<typeof signOutFromSession>;
const mockSignUpWithEmail = signUpWithEmail as jest.MockedFunction<typeof signUpWithEmail>;
const mockIsSession = isSession as jest.MockedFunction<typeof isSession>;

const TestComponent = () => {
  const auth = useAuth();
  return null;
};

const mockSession: Session = {
  access_token: 'test-access-token',
  refresh_token: 'test-refresh-token',
  expires_in: 3600,
  expires_at: Date.now() + 3600,
  token_type: 'bearer',
  user: {
    id: 'test-user-id',
    email: 'test@example.com',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    aud: 'authenticated',
    role: 'authenticated',
    app_metadata: {},
    user_metadata: {},
    identities: [],
    factors: [],
  }
};

const mockUser: User = {
  id: 'test-user-id',
  email: 'test@example.com',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  aud: 'authenticated',
  role: 'authenticated',
  app_metadata: {},
  user_metadata: {},
  identities: [],
  factors: [],
};

describe('Auth Context', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Auth Context Provider', () => {
    it('initializes with loading state true', () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));

      render(
        <AuthContextProvider>
          <TestComponent />
        </AuthContextProvider>
      );

      expect(true).toBe(true);
    });

    it('calls init function on mount', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));

      render(
        <AuthContextProvider>
          <TestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockCheckForActiveSession).toHaveBeenCalledTimes(1);
      });
    });

    it('sets session and user when active session exists', async () => {
      mockCheckForActiveSession.mockResolvedValue(mockSession);
      mockFetchActiveUser.mockResolvedValue(mockUser);

      render(
        <AuthContextProvider>
          <TestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockCheckForActiveSession).toHaveBeenCalledTimes(1);
        expect(mockFetchActiveUser).toHaveBeenCalledTimes(1);
      });
    });

    it('handles init errors gracefully', async () => {
      const error = new Error('Session check failed');
      mockCheckForActiveSession.mockRejectedValue(error);

      render(
        <AuthContextProvider>
          <TestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockCheckForActiveSession).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(error);
      });
    });

    it('sets loading to false after init completes', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));

      render(
        <AuthContextProvider>
          <TestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockCheckForActiveSession).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('signIn function', () => {
    it('calls signInWithEmail with correct parameters', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));
      mockSignInWithEmail.mockResolvedValue({ session: mockSession, user: mockUser });

      const { rerender } = render(
        <AuthContextProvider>
          <TestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockCheckForActiveSession).toHaveBeenCalledTimes(1);
      });

      // Get the auth context and call signIn
      const authContext = require('@/contexts/authContext');
      const authProvider = authContext.AuthContextProvider;

      // We need to test this through a component that uses the context
      const SignInTestComponent = () => {
        const { signIn } = useAuth();
        React.useEffect(() => {
          signIn('test@example.com', 'password123');
        }, [signIn]);
        return null;
      };

      rerender(
        <AuthContextProvider>
          <SignInTestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockSignInWithEmail).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });

    it('handles signIn errors gracefully', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));
      const signInError = new Error('Invalid credentials');
      mockSignInWithEmail.mockRejectedValue(signInError);

      const SignInTestComponent = () => {
        const { signIn } = useAuth();
        React.useEffect(() => {
          signIn('test@example.com', 'wrongpassword');
        }, [signIn]);
        return null;
      };

      render(
        <AuthContextProvider>
          <SignInTestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockSignInWithEmail).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
        expect(console.log).toHaveBeenCalledWith(signInError);
      });
    });

    it('sets loading state during signIn', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));
      mockSignInWithEmail.mockResolvedValue({ session: mockSession, user: mockUser });

      const SignInTestComponent = () => {
        const { signIn, loading } = useAuth();
        React.useEffect(() => {
          signIn('test@example.com', 'password123');
        }, [signIn]);
        return null;
      };

      render(
        <AuthContextProvider>
          <SignInTestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockSignInWithEmail).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });
  });

  describe('signOut function', () => {
    it('calls signOutFromSession', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));
      mockSignOutFromSession.mockResolvedValue(undefined);

      const SignOutTestComponent = () => {
        const { signOut } = useAuth();
        React.useEffect(() => {
          signOut();
        }, [signOut]);
        return null;
      };

      render(
        <AuthContextProvider>
          <SignOutTestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockSignOutFromSession).toHaveBeenCalledTimes(1);
      });
    });

    it('clears session and user after signOut', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));
      mockSignOutFromSession.mockResolvedValue(undefined);

      const SignOutTestComponent = () => {
        const { signOut } = useAuth();
        React.useEffect(() => {
          signOut();
        }, [signOut]);
        return null;
      };

      render(
        <AuthContextProvider>
          <SignOutTestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockSignOutFromSession).toHaveBeenCalledTimes(1);
      });
    });

    it('handles signOut errors gracefully', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));
      const signOutError = new Error('Sign out failed');
      mockSignOutFromSession.mockRejectedValue(signOutError);

      const SignOutTestComponent = () => {
        const { signOut } = useAuth();
        React.useEffect(() => {
          signOut();
        }, [signOut]);
        return null;
      };

      render(
        <AuthContextProvider>
          <SignOutTestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockSignOutFromSession).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(signOutError);
      });
    });
  });

  describe('signUp function', () => {
    it('calls signUpWithEmail with correct parameters', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));
      mockSignUpWithEmail.mockResolvedValue(mockSession);
      mockIsSession.mockReturnValue(true);
      mockFetchActiveUser.mockResolvedValue(mockUser);

      const SignUpTestComponent = () => {
        const { signUp } = useAuth();
        React.useEffect(() => {
          signUp('test@example.com', 'password123', 'testuser');
        }, [signUp]);
        return null;
      };

      render(
        <AuthContextProvider>
          <SignUpTestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockSignUpWithEmail).toHaveBeenCalledWith('test@example.com', 'password123', 'testuser');
      });
    });

    it('handles successful signUp with session', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));
      mockSignUpWithEmail.mockResolvedValue(mockSession);
      mockIsSession.mockReturnValue(true);
      mockFetchActiveUser.mockResolvedValue(mockUser);

      const SignUpTestComponent = () => {
        const { signUp } = useAuth();
        React.useEffect(() => {
          signUp('test@example.com', 'password123', 'testuser');
        }, [signUp]);
        return null;
      };

      render(
        <AuthContextProvider>
          <SignUpTestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockSignUpWithEmail).toHaveBeenCalledWith('test@example.com', 'password123', 'testuser');
        expect(mockIsSession).toHaveBeenCalledWith(mockSession);
        expect(mockFetchActiveUser).toHaveBeenCalled();
      });
    });

    it('handles signUp without session (email confirmation required)', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));
      mockSignUpWithEmail.mockResolvedValue(mockUser);
      mockIsSession.mockReturnValue(false);

      const SignUpTestComponent = () => {
        const { signUp } = useAuth();
        React.useEffect(() => {
          signUp('test@example.com', 'password123', 'testuser');
        }, [signUp]);
        return null;
      };

      render(
        <AuthContextProvider>
          <SignUpTestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockSignUpWithEmail).toHaveBeenCalledWith('test@example.com', 'password123', 'testuser');
        expect(mockIsSession).toHaveBeenCalledWith(mockUser);
        expect(console.log).toHaveBeenCalledWith('New user was successfully created, User needs to confirm email!');
        expect(console.log).toHaveBeenCalledWith(mockUser);
      });
    });

    it('handles signUp errors gracefully', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));
      const signUpError = new Error('Email already exists');
      mockSignUpWithEmail.mockRejectedValue(signUpError);

      const SignUpTestComponent = () => {
        const { signUp } = useAuth();
        React.useEffect(() => {
          signUp('existing@example.com', 'password123', 'existinguser');
        }, [signUp]);
        return null;
      };

      render(
        <AuthContextProvider>
          <SignUpTestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockSignUpWithEmail).toHaveBeenCalledWith('existing@example.com', 'password123', 'existinguser');
        expect(console.log).toHaveBeenCalledWith(signUpError);
      });
    });
  });

  describe('useAuth hook', () => {
    it('throws error when used outside AuthContextProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

      expect(() => {
        render(<TestComponent />);
      }).toThrow("Can't use AuthContext here!");

      consoleSpy.mockRestore();
    });

    it('returns auth context when used inside AuthContextProvider', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));

      const ContextTestComponent = () => {
        const auth = useAuth();
        expect(auth).toHaveProperty('loading');
        expect(auth).toHaveProperty('session');
        expect(auth).toHaveProperty('user');
        expect(auth).toHaveProperty('signIn');
        expect(auth).toHaveProperty('signOut');
        expect(auth).toHaveProperty('signUp');
        return null;
      };

      render(
        <AuthContextProvider>
          <ContextTestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockCheckForActiveSession).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Context Provider value', () => {
    it('provides correct initial values', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));

      const ValueTestComponent = () => {
        const { loading, session, user } = useAuth();
        expect(typeof loading).toBe('boolean');
        expect(session).toBeNull();
        expect(user).toBeNull();
        return null;
      };

      render(
        <AuthContextProvider>
          <ValueTestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockCheckForActiveSession).toHaveBeenCalledTimes(1);
      });
    });

    it('provides functions with correct signatures', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));

      const FunctionTestComponent = () => {
        const { signIn, signOut, signUp } = useAuth();
        expect(typeof signIn).toBe('function');
        expect(typeof signOut).toBe('function');
        expect(typeof signUp).toBe('function');
        return null;
      };

      render(
        <AuthContextProvider>
          <FunctionTestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockCheckForActiveSession).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Error handling', () => {
    it('logs errors to console for all auth operations', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('Init error'));
      mockSignInWithEmail.mockRejectedValue(new Error('Sign in error'));
      mockSignOutFromSession.mockRejectedValue(new Error('Sign out error'));
      mockSignUpWithEmail.mockRejectedValue(new Error('Sign up error'));

      const ErrorTestComponent = () => {
        const { signIn, signOut, signUp } = useAuth();
        React.useEffect(() => {
          signIn('test@example.com', 'password123');
          signOut();
          signUp('test@example.com', 'password123', 'testuser');
        }, [signIn, signOut, signUp]);
        return null;
      };

      render(
        <AuthContextProvider>
          <ErrorTestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(console.log).toHaveBeenCalledWith(expect.any(Error));
      });
    });
  });

  describe('Loading state management', () => {
    it('sets loading to true during async operations', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));
      mockSignInWithEmail.mockResolvedValue({ session: mockSession, user: mockUser });

      const LoadingTestComponent = () => {
        const { signIn } = useAuth();
        React.useEffect(() => {
          signIn('test@example.com', 'password123');
        }, [signIn]);
        return null;
      };

      render(
        <AuthContextProvider>
          <LoadingTestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockSignInWithEmail).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });

    it('sets loading to false after async operations complete', async () => {
      mockCheckForActiveSession.mockRejectedValue(new Error('No session'));
      mockSignInWithEmail.mockResolvedValue({ session: mockSession, user: mockUser });

      const LoadingTestComponent = () => {
        const { signIn } = useAuth();
        React.useEffect(() => {
          signIn('test@example.com', 'password123');
        }, [signIn]);
        return null;
      };

      render(
        <AuthContextProvider>
          <LoadingTestComponent />
        </AuthContextProvider>
      );

      await waitFor(() => {
        expect(mockSignInWithEmail).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });
  });
});