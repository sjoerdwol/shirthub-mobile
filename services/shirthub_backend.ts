import { Session } from '@supabase/supabase-js';

export const getShirts = async (session: Session): Promise<ShirtResponse[]> => {
  try {
    if (!session?.access_token) throw new Error('No valid session found. Please log in again.');

    // GET request to /shirts with the JWT token
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/shirts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const shirts: ShirtResponse[] = await response.json();
    return shirts;
  } catch (error) {
    console.error('Error fetching shirts: ', error);
    throw error;
  }
};

export const addShirt = async (session: Session, shirt: Partial<Shirt>): Promise<ShirtResponse> => {
  try {
    if (!session?.access_token) throw new Error('No valid session found. Please log in again.');

    // POST request to /shirts with the JWT token and the new shirt data
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/shirts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shirt),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const newShirt: ShirtResponse = await response.json();
    return newShirt;
  } catch (error) {
    console.error('Error creating shirt: ', error);
    throw error;
  }
}

export const deleteShirt = async (session: Session, shirtId: string): Promise<void> => {
  try {
    if (!session?.access_token) throw new Error('No valid session found. Please log in again.');

    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/shirts/${shirtId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  } catch (error) {
    console.error('Error deleting shirt: ', error);
    throw error;
  }
}