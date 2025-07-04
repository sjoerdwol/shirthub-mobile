import { Session, User } from "@supabase/supabase-js";

export function isSession(obj: Session | User): obj is Session {
  return 'access_token' in obj;
};