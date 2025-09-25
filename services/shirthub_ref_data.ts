import { Session } from "@supabase/supabase-js";

// Retrieve all supported teams
export const fetchReferenceTeams = async (session: Session): Promise<ReferenceTeam[]> => {
  try {
    if (!session?.access_token) throw new Error('No valid session found. Please log in again.');

    // GET request to /shirts with the JWT token
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/ref_teams`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const teams: ReferenceTeam[] = await response.json();
    return teams;
  } catch (error) {
    console.error('Error fetching reference teams: ' + error);
    throw error;
  }
}