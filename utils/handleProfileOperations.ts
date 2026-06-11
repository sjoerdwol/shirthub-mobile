import { getProfile, removeAvatar, updateAvatar, updateProfile } from "@/services/shirthub_user_profile";
import { removeAvatarImage, uploadAvatarImage } from "@/services/supabase_media";
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

// Uploads the picked image to Supabase Storage, then persists the avatar URL via
// the backend and reflects the result in the store. Throws on failure so the UI
// can surface an error and reset its loading state.
export async function handleAvatarUpload(session: Session, updateProfileInStore: (profile: Profile) => void, base64: string) {
  await uploadAvatarImage(session, base64);
  const response = await updateAvatar(session);
  const profile = convertProfileResponse(response);
  updateProfileInStore(profile);
}

export async function handleAvatarRemove(session: Session, updateProfileInStore: (profile: Profile) => void) {
  await removeAvatarImage(session);
  const response = await removeAvatar(session);
  const profile = convertProfileResponse(response);
  updateProfileInStore(profile);
}