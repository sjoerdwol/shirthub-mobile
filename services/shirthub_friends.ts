import { Session } from "@supabase/supabase-js";

// Resolve the backend base URL and assert a valid session. Throws with a
// descriptive message if either prerequisite is missing.
const getRequestContext = (session: Session): { backendUrl: string; accessToken: string } => {
  const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
  if (!session.access_token) throw new Error('No valid session found. Please log in again.');
  if (!backendUrl) throw new Error('Missing EXPO_PUBLIC_BACKEND_URL environment variable!');

  return { backendUrl, accessToken: session.access_token };
};

/* - - - - - - - - -
* READ
* - - - - - - - - - */
// Fetch the current user's accepted friends.
export const getFriends = async (session: Session): Promise<FriendUser[]> => {
  try {
    const { backendUrl, accessToken } = getRequestContext(session);

    const response = await fetch(`${backendUrl}/friends`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const friends: FriendUser[] = await response.json();
    return friends;
  } catch (error) {
    console.error('Error fetching friends: ', error);
    throw error;
  }
}

// Fetch the current user's pending friend requests (incoming and outgoing).
export const getFriendRequests = async (session: Session): Promise<FriendRequests> => {
  try {
    const { backendUrl, accessToken } = getRequestContext(session);

    const response = await fetch(`${backendUrl}/friends/requests`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const requests: FriendRequests = await response.json();
    return requests;
  } catch (error) {
    console.error('Error fetching friend requests: ', error);
    throw error;
  }
}

/* - - - - - - - - -
* WRITE
* - - - - - - - - - */
// Send a friend request to another user. The backend returns the resulting
// friendship: `pending` for a normal new request, or `accepted` when the target
// had already sent us a request and the two are matched directly.
export const sendFriendRequest = async (session: Session, userId: string): Promise<FriendshipResponse> => {
  try {
    const { backendUrl, accessToken } = getRequestContext(session);

    const response = await fetch(`${backendUrl}/friends/requests`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId })
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const friendship: FriendshipResponse = await response.json();
    return friendship;
  } catch (error) {
    console.error('Error sending friend request: ', error);
    throw error;
  }
}

// Accept an incoming friend request from another user. The backend returns the
// now-accepted friendship.
export const acceptFriendRequest = async (session: Session, userId: string): Promise<FriendshipResponse> => {
  try {
    const { backendUrl, accessToken } = getRequestContext(session);

    const response = await fetch(`${backendUrl}/friends/requests/${userId}/accept`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const friendship: FriendshipResponse = await response.json();
    return friendship;
  } catch (error) {
    console.error('Error accepting friend request: ', error);
    throw error;
  }
}

// Decline an incoming request or withdraw an outgoing request. Both map to
// deleting the pending row in either direction between the two users.
export const cancelOrDeclineRequest = async (session: Session, userId: string): Promise<void> => {
  try {
    const { backendUrl, accessToken } = getRequestContext(session);

    const response = await fetch(`${backendUrl}/friends/requests/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  } catch (error) {
    console.error('Error cancelling friend request: ', error);
    throw error;
  }
}

// Remove an existing (accepted) friendship.
export const removeFriend = async (session: Session, userId: string): Promise<void> => {
  try {
    const { backendUrl, accessToken } = getRequestContext(session);

    const response = await fetch(`${backendUrl}/friends/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  } catch (error) {
    console.error('Error removing friend: ', error);
    throw error;
  }
}
