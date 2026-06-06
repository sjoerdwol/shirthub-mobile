import { Session } from '@supabase/supabase-js';

// Add a shirt to the users collection
export const addShirt = async (session: Session, shirt: Partial<Shirt>): Promise<ShirtResponse> => {
  try {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    if (!session?.access_token) throw new Error('No valid session found. Please log in again.');
    if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

    // POST request to /shirts with the JWT token and the new shirt data
    const response = await fetch(`${backendUrl}/shirts`, {
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

// Delete a shirt from the users collection
export const deleteShirt = async (session: Session, shirtId: string): Promise<void> => {
  try {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    if (!session?.access_token) throw new Error('No valid session found. Please log in again.');
    if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

    // DELETE request to /shirts/id with the JWT token
    const response = await fetch(`${backendUrl}/shirts/${shirtId}`, {
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

// Retrieve all shirts from the users collection
export const getShirts = async (session: Session): Promise<ShirtResponse[]> => {
  try {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    if (!session?.access_token) throw new Error('No valid session found. Please log in again.');
    if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

    // GET request to /shirts with the JWT token
    const response = await fetch(`${backendUrl}/shirts`, {
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
}

// Set a shirt as the users favorite. Backend marks this shirt as favorite, removes any previous favorite and returns the new favorite
export const setIsFavorite = async (session: Session, shirtId: string, isFavorite: boolean): Promise<ShirtResponse> => {
  try {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    if (!session?.access_token) throw new Error('No valid session found. Please log in again.');
    if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

    // PUT request to /shirts/id/favorite with the JWT token
    const response = await fetch(`${backendUrl}/shirts/${shirtId}/favorite`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_favorite: isFavorite })
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const favoriteShirt: ShirtResponse = await response.json();
    return favoriteShirt;
  } catch (error) {
    console.error('Error setting favorite shirt: ', error);
    throw error;
  }
}

// Update a shirt in the users collection
export const updateShirt = async (session: Session, shirtId: string, updatedShirt: Partial<Shirt>): Promise<ShirtResponse> => {
  try {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    if (!session?.access_token) throw new Error('No valid session found. Please log in again.');
    if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

    // PUT request to /shirts/id with the JWT token and the updated shirt data
    const response = await fetch(`${backendUrl}/shirts/${shirtId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedShirt)
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const updatedShirtResponse: ShirtResponse = await response.json();
    return updatedShirtResponse;
  } catch (error) {
    console.error('Error updating shirt: ', error);
    throw error;
  }
}
