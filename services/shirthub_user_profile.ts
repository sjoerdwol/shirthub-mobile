import { Session } from "@supabase/supabase-js";

/* - - - - - - - - -
* OWN USER PROFILE
* - - - - - - - - - */
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

/* - - - - - - - - -
* OTHER USER PROFILE
* - - - - - - - - - */
// Fetch another user's public profile
export const getPublicProfile = async (session: Session, userId: string): Promise<PublicProfile> => {
  try {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    if (!session.access_token) throw new Error('No valid session found. Please log in again.');
    if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

    const response = await fetch(`${backendUrl}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const profile: PublicProfile = await response.json();
    return profile;
  } catch (error) {
    console.error('Error fetching the public profile: ', error);
    throw error;
  }
}

// Search other users by a (partial) username.
export const searchUsers = async (session: Session, username: string): Promise<UserSearchResult[]> => {
  try {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    if (!session.access_token) throw new Error('No valid session found. Please log in again.');
    if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

    const response = await fetch(`${backendUrl}/users/search?username=${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const results: UserSearchResult[] = await response.json();
    return results;
  } catch (error) {
    console.error('Error searching for users: ', error);
    throw error;
  }
}

/* - - - - - - - - -
* Avatar handling
* - - - - - - - - - */
// Clear the avatar reference on the profile.
export const removeAvatar = async (session: Session): Promise<ProfileResponse> => {
  try {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    if (!session.access_token) throw new Error('No valid session found. Please log in again.');
    if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

    const response = await fetch(`${backendUrl}/profile/avatar`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const userProfile: ProfileResponse = await response.json();
    return userProfile;
  } catch (error) {
    console.error('Error removing the avatar: ', error);
    throw error;
  }
}

// Tell the backend to persist the (server-derived) avatar URL after the image has been uploaded directly to Supabase Storage
export const updateAvatar = async (session: Session): Promise<ProfileResponse> => {
  try {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    if (!session.access_token) throw new Error('No valid session found. Please log in again.');
    if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

    const response = await fetch(`${backendUrl}/profile/avatar`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const userProfile: ProfileResponse = await response.json();
    return userProfile;
  } catch (error) {
    console.error('Error updating the avatar: ', error);
    throw error;
  }
}
