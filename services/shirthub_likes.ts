import { Session } from "@supabase/supabase-js";

// Resolve the backend base URL and assert a valid session
const getRequestContext = (session: Session): { backendUrl: string; accessToken: string } => {
  const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
  if (!session.access_token) throw new Error('No valid session found. Please log in again.');
  if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

  return { backendUrl, accessToken: session.access_token };
};

// Like or unlike another user's shirt (toggle). Returns the updated like state.
export const setShirtLike = async (session: Session, shirtId: string, liked: boolean): Promise<LikeState> => {
  try {
    const { backendUrl, accessToken } = getRequestContext(session);

    const response = await fetch(`${backendUrl}/shirts/${shirtId}/like`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ liked })
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const likeState: LikeState = await response.json();
    return likeState;
  } catch (error) {
    console.error('Error setting shirt like: ', error);
    throw error;
  }
}
