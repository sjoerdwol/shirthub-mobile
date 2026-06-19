import { isSession } from "@/utils/typeGuards";
import { Session, User } from "@supabase/supabase-js";

const mockuser: User = {
  id: 'MOCKUSERID',
  app_metadata: {},
  user_metadata: {},
  aud: 'MOCK',
  created_at: new Date().toDateString()
}

it('is a session', () => {
  const session: Session = {
    access_token: 'MOCK-TOKEN',
    refresh_token: 'MOCK-TOKEN',
    expires_in: 9999,
    token_type: 'bearer',
    user: mockuser
  }

  expect(isSession(session)).toBe(true);
});

it('is not a session', () => {
  expect(isSession(mockuser)).toBe(false);
});