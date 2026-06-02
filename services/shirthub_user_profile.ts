import { Session } from "@supabase/supabase-js";

export const getProfile = async (session: Session): Promise<ProfileResponse> => {
  try {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    if (!session.access_token) throw new Error('No valid session found. Please log in again.');
    if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

    // GET request to /profile with the JWT token
    const response = await fetch(`${backendUrl}/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const userProfile: ProfileResponse = await response.json();
    return userProfile;
  } catch (error) {
    console.error('Error fetching the user profile: ', error);
    throw error;
  }
}

export const updateProfile = async (session: Session, updatedProfile: Partial<Profile>): Promise<ProfileResponse> => {
  try {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    if (!session.access_token) throw new Error('No valid session found. Please log in again.');
    if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

    // PUT request to /profile with the JWT token and the updated profile
    const response = await fetch(`${backendUrl}/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfile)
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const userProfile: ProfileResponse = await response.json();
    return userProfile;
  } catch (error) {
    console.error('Error updating the user profile: ', error);
    throw error;
  }
}