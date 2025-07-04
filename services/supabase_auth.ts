import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, processLock, Session, User } from '@supabase/supabase-js';
import 'react-native-url-polyfill';

const supabaseURL = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseURL, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock
  },
});

// Check if there is an active session in the storage
export const checkForActiveSession = async (): Promise<Session> => {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) throw new Error('Error while checking for active session: ' + error.message);
  if (!session) throw new Error('No active session in storage!');

  return session;
}

// Get the current user belonging to the active session
export const fetchActiveUser = async (): Promise<User> => {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) throw new Error('Error while fetching active user: ' + error.message);
  if (!user) throw new Error('No user for active session found!');

  return user;
}

// Sign in a user with the provided email and password
export const signInWithEmail = async (email: string, password: string): Promise<{ session: Session, user: User }> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    throw new Error('Error while logging in user: ' + error.message);
  }

  return { session: data.session, user: data.user };
}

export const signOutFromSession = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error('Error while logging out: ' + error.message);
}

// Create a new account using the provided email and password
export const signUpWithEmail = async (email: string, password: string, username: string): Promise<Session | User> => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        user_name: username,
      },
    },
  });

  if (error) {
    throw new Error('Error while creating user: ' + error.message);
  }

  if (!data.session) {
    console.log('User needs to confirm email first!');

    if (!data.user) throw new Error('User data missing!');
    return data.user;
  }

  return data.session;
}
