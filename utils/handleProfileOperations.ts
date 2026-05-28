import { getProfile, updateProfile } from "@/services/shirthub_user_profile";
import { Session } from "@supabase/supabase-js";

export async function handleInitialProfileFetch(session: Session, setProfile: (profile: Profile) => void) {
  try {
    const response = await getProfile(session);
    setProfile(response);
  } catch (error) {
    console.error('Error getting profile: ', error);
  }
}

export async function handleProfileUpdate(session: Session, updateProfileInStore: (profile: Profile) => void, updatedProfile: Partial<Profile>) {
  try {
    const response = await updateProfile(session, updatedProfile);
    updateProfileInStore(response);
  } catch (error) {
    console.error('Error updating profile: ', error);
  }
}