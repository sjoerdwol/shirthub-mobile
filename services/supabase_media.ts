import { supabase } from "@/utils/createSupabaseClient";
import { Session } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";

const AVATAR_BUCKET = 'avatars';

// Upload a profile picture directly to Supabase Storage. The image is provided
// as a base64 string (from expo-image-picker) and decoded to an ArrayBuffer —
// passing a Blob from fetch() can produce 0-byte uploads on React Native.
// The object path starts with the user id so the storage RLS policy permits the
// write only inside the user's own folder.
export const uploadAvatarImage = async (session: Session, base64: string): Promise<void> => {
  if (!session.access_token) throw new Error('No valid session found. Please log in again.');

  const path = `${session.user.id}/avatar.jpg`;

  const { error } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(path, decode(base64), {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) throw new Error(`Error uploading avatar image: ${error.message}`);
}

// Remove the user's avatar object from Supabase Storage.
export const removeAvatarImage = async (session: Session): Promise<void> => {
  if (!session.access_token) throw new Error('No valid session found. Please log in again.');

  const path = `${session.user.id}/avatar.jpg`;

  const { error } = await supabase.storage.from(AVATAR_BUCKET).remove([path]);

  if (error) throw new Error(`Error removing avatar image: ${error.message}`);
}
