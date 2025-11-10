import { Session } from '@supabase/supabase-js';

// Retrieve user statistics
export const getUserStatistics = async (session: Session): Promise<UserStatistics> => {
  try {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    if (!session?.access_token) throw new Error('No valid session found. Please log in again.');
    if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

    // GET request to /statistics with the JWT token
    const response = await fetch(`${backendUrl}/stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const userStatistics: UserStatistics = await response.json();
    return userStatistics;
  } catch (error) {
    console.error('Error fetching user statistics: ', error);
    throw error;
  }
}