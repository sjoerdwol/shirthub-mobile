import { checkForActiveSession, fetchActiveUser, signInWithEmail, signOutFromSession, signUpWithEmail } from "@/services/supabase_auth";
import { AuthentificationContext } from "@/types/authContext";
import { isSession } from "@/utils/typeGuards";
import { Session, User } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthentificationContext | null>(null);

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const activeSession = await checkForActiveSession();
      setSession(activeSession);
      const activeUser = await fetchActiveUser();
      setUser(activeUser);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { session, user } = await signInWithEmail(email, password);
      setSession(session);
      setUser(user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await signOutFromSession();
      setSession(null);
      setUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await signUpWithEmail(email, password);

      if (isSession(response)) {
        setSession(response);
        const activeUser = await fetchActiveUser();
        setUser(activeUser);
      } else {
        console.log('New user was successfully created, User needs to confirm email!');
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ loading, session, user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Can't use AuthContext here!");

  return context;
}

export { AuthContext, AuthContextProvider, useAuth };
