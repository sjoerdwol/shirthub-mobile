import { Session } from "@supabase/supabase-js";

// Retrieve all supported teams and leagues
export const fetchReferenceData = async (session: Session): Promise<ReferenceData> => {
  try {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    if (!session?.access_token) throw new Error('No valid session found. Please log in again.');
    if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

    // GET request to /shirts with the JWT token
    const response = await fetch(`${backendUrl}/reference_data`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data: ReferenceData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching reference teams: ' + error);
    throw error;
  }
}