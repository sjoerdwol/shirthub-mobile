import { Session } from '@supabase/supabase-js';

export const getShirts = async (session: Session): Promise<ShirtResponse[]> => {
  try {
    if (!session?.access_token) {
      throw new Error('No valid session found. Please log in again.');
    }

    // Make the GET request to localhost/shirts with the JWT token
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/shirts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const shirts: ShirtResponse[] = await response.json();
    console.log(`Shirts: ${shirts}`);
    return shirts;

  } catch (error) {
    console.error('Error fetching shirts:', error);
    throw error;
  }
};