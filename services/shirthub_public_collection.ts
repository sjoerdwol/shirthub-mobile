import { Session } from "@supabase/supabase-js";

/* - - - - - - - - - - - - - - - - - - - - - - - -
* Another user's collection & statistics.
* Both endpoints are gated on the backend: they only
* succeed when the target profile is public or the two
* users are friends, otherwise they respond with 401.
* - - - - - - - - - - - - - - - - - - - - - - - - */

// Fetch another user's full shirt collection.
export const getPublicUserShirts = async (session: Session, userId: string): Promise<Shirt[]> => {
  try {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    if (!session.access_token) throw new Error('No valid session found. Please log in again.');
    if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

    const response = await fetch(`${backendUrl}/users/${userId}/shirts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const shirts: Shirt[] = await response.json();
    return shirts;
  } catch (error) {
    console.error("Error fetching the user's collection: ", error);
    throw error;
  }
}

// Fetch another user's full statistics.
export const getPublicUserStatistics = async (session: Session, userId: string): Promise<UserStatistics> => {
  try {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    if (!session.access_token) throw new Error('No valid session found. Please log in again.');
    if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

    const response = await fetch(`${backendUrl}/users/${userId}/stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const statistics: UserStatistics = await response.json();
    return statistics;
  } catch (error) {
    console.error("Error fetching the user's statistics: ", error);
    throw error;
  }
}
