import { AuthContextProvider, useAuth } from "@/contexts/authContext";
import * as supabaseAuth from "@/services/supabase_auth";
import * as typeGuards from "@/utils/typeGuards";
import { Session, User } from "@supabase/supabase-js";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import { PropsWithChildren } from "react";
import mockData from '../data.json';

const mockSession: Session = { ...mockData.session, token_type: 'bearer', user: {} as User };
const mockUser: User = { ...mockData.user, created_at: new Date().toString() };

jest.mock('@/services/supabase_auth', () => ({
  checkForActiveSession: jest.fn(),
  fetchActiveUser: jest.fn(),
  signInWithEmail: jest.fn(),
  signOutFromSession: jest.fn(),
  signUpWithEmail: jest.fn(),
}));

jest.mock('@/utils/typeGuards', () => ({
  isSession: jest.fn(),
}));

const wrapper = ({ children }: PropsWithChildren) => (
  <AuthContextProvider>{children}</AuthContextProvider>
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('AuthContextProvider - init', () => {
  it('sets session and user when an active session exists', async () => {
    (supabaseAuth.checkForActiveSession as jest.Mock).mockResolvedValue(mockSession);
    (supabaseAuth.fetchActiveUser as jest.Mock).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.session).toEqual(mockSession);
    expect(result.current.user).toEqual(mockUser);
  });

  it('sets loading to false and keeps session/user null when no active session', async () => {
    (supabaseAuth.checkForActiveSession as jest.Mock).mockRejectedValue(new Error('No active session'));
    (supabaseAuth.fetchActiveUser as jest.Mock).mockRejectedValue(new Error('No user'));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.session).toBeNull();
    expect(result.current.user).toBeNull();
  });
});

describe('AuthContextProvider - signIn', () => {
  it('sets session and user on successful sign in', async () => {
    (supabaseAuth.checkForActiveSession as jest.Mock).mockRejectedValue(new Error('No session'));
    (supabaseAuth.fetchActiveUser as jest.Mock).mockRejectedValue(new Error('No user'));
    (supabaseAuth.signInWithEmail as jest.Mock).mockResolvedValue({ session: mockSession, user: mockUser });

    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.signIn('test@example.com', 'password123');
    });

    expect(result.current.session).toEqual(mockSession);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
  });

  it('keeps session and user null when sign in throws', async () => {
    (supabaseAuth.checkForActiveSession as jest.Mock).mockRejectedValue(new Error('No session'));
    (supabaseAuth.fetchActiveUser as jest.Mock).mockRejectedValue(new Error('No user'));
    (supabaseAuth.signInWithEmail as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.signIn('test@example.com', 'wrong-password');
    });

    expect(result.current.session).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});

describe('AuthContextProvider - signOut', () => {
  it('clears session and user on successful sign out', async () => {
    (supabaseAuth.checkForActiveSession as jest.Mock).mockResolvedValue(mockSession);
    (supabaseAuth.fetchActiveUser as jest.Mock).mockResolvedValue(mockUser);
    (supabaseAuth.signOutFromSession as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.session).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('keeps session and user when sign out throws', async () => {
    (supabaseAuth.checkForActiveSession as jest.Mock).mockResolvedValue(mockSession);
    (supabaseAuth.fetchActiveUser as jest.Mock).mockResolvedValue(mockUser);
    (supabaseAuth.signOutFromSession as jest.Mock).mockRejectedValue(new Error('Sign out failed'));

    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.session).toEqual(mockSession);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
  });
});

describe('AuthContextProvider - signUp', () => {
  it('sets session and user when sign up returns a session (email confirmed)', async () => {
    (supabaseAuth.checkForActiveSession as jest.Mock).mockRejectedValue(new Error('No session'));
    (supabaseAuth.fetchActiveUser as jest.Mock).mockResolvedValueOnce(mockUser);
    (supabaseAuth.signUpWithEmail as jest.Mock).mockResolvedValue(mockSession);
    (typeGuards.isSession as unknown as jest.Mock).mockReturnValue(true);

    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.signUp('new@example.com', 'password123');
    });

    expect(result.current.session).toEqual(mockSession);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
  });

  it('does not set session when sign up returns a user (email confirmation required)', async () => {
    (supabaseAuth.checkForActiveSession as jest.Mock).mockRejectedValue(new Error('No session'));
    (supabaseAuth.fetchActiveUser as jest.Mock).mockRejectedValue(new Error('No user'));
    (supabaseAuth.signUpWithEmail as jest.Mock).mockResolvedValue(mockUser);
    (typeGuards.isSession as unknown as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.signUp('new@example.com', 'password123');
    });

    expect(result.current.session).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('keeps session and user null when sign up throws', async () => {
    (supabaseAuth.checkForActiveSession as jest.Mock).mockRejectedValue(new Error('No session'));
    (supabaseAuth.fetchActiveUser as jest.Mock).mockRejectedValue(new Error('No user'));
    (supabaseAuth.signUpWithEmail as jest.Mock).mockRejectedValue(new Error('Sign up failed'));

    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.signUp('new@example.com', 'password123');
    });

    expect(result.current.session).toBeNull();
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});

describe('useAuth', () => {
  it('throws when used outside of AuthContextProvider', () => {
    // Suppress the expected console.error from React
    const spy = jest.spyOn(console, 'error').mockImplementation(() => { });

    expect(() => renderHook(() => useAuth())).toThrow("Can't use AuthContext here!");

    spy.mockRestore();
  });
});
