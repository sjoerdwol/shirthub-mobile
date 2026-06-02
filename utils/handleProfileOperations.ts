import { getProfile, updateProfile } from "@/services/shirthub_user_profile";
import { Session } from "@supabase/supabase-js";
import convertProfileResponse from "./convertProfileResponse";

export async function handleInitialProfileFetch(session: Session, setProfile: (profile: Profile) => void) {
  try {
    const response = await getProfile(session);
    const profile = convertProfileResponse(response);
    setProfile(profile);
  } catch (error) {
    console.error('Error getting profile: ', error);
  }
}

export async function handleProfileUpdate(session: Session, updateProfileInStore: (profile: Profile) => void, updatedProfile: Partial<Profile>) {
  try {
    const response = await updateProfile(session, updatedProfile);
    const profile = convertProfileResponse(response)
    updateProfileInStore(profile);
  } catch (error) {
    console.error('Error updating profile: ', error);
  }
}