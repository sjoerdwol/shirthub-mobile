import {
  acceptFriendRequest,
  cancelOrDeclineRequest,
  getFriendRequests,
  getFriends,
  removeFriend,
  sendFriendRequest,
} from '@/services/shirthub_friends';
import { Session } from '@supabase/supabase-js';

// The minimal profile data needed to build a friend/request entry for the store.
type FriendProfileParts = { ownerId: string; username: string; avatarUrl: string | null };

// Load the current user's friends and pending requests into the store.
export async function handleFriendsInitialFetch(
  session: Session,
  setFriends: (friends: Array<FriendUser>) => void,
  setIncoming: (incoming: Array<FriendRequest>) => void,
  setOutgoing: (outgoing: Array<FriendRequest>) => void
): Promise<void> {
  try {
    const [friends, requests] = await Promise.all([getFriends(session), getFriendRequests(session)]);
    setFriends(friends);
    setIncoming(requests.incoming);
    setOutgoing(requests.outgoing);
  } catch (error) {
    console.error('Error fetching friends and requests: ', error);
  }
}

// Send a friend request and forward the backend result to the store. The
// returned friendship decides the outcome: `accepted` means the target had
// already requested us (now friends), `pending` means a normal outgoing request.
// Returns the resulting FriendStatus so the caller can sync its local state.
export async function handleSendRequest(
  session: Session,
  user: FriendProfileParts,
  addOutgoing: (request: FriendRequest) => void,
  addFriend: (friend: FriendUser) => void,
  removeIncoming: (ownerId: string) => void
): Promise<FriendStatus> {
  try {
    const friendship = await sendFriendRequest(session, user.ownerId);

    if (friendship.status === 'accepted') {
      removeIncoming(user.ownerId);
      addFriend({ ...user, since: friendship.updatedAt });
      return 'friends';
    }

    addOutgoing({ ...user, createdAt: friendship.createdAt });
    return 'requestSent';
  } catch (error) {
    console.error('Error sending friend request: ', error);
    return 'none';
  }
}

// Accept an incoming request and forward the backend result to the store: the
// request leaves `incoming` and the user joins `friends`. Returns whether it succeeded.
export async function handleAcceptRequest(
  session: Session,
  user: FriendProfileParts,
  addFriend: (friend: FriendUser) => void,
  removeIncoming: (ownerId: string) => void
): Promise<boolean> {
  try {
    const friendship = await acceptFriendRequest(session, user.ownerId);
    removeIncoming(user.ownerId);
    addFriend({ ...user, since: friendship.updatedAt });
    return true;
  } catch (error) {
    console.error('Error accepting friend request: ', error);
    return false;
  }
}

// Decline an incoming request: delete it on the backend, then drop it from `incoming`.
export async function handleDeclineRequest(
  session: Session,
  ownerId: string,
  removeIncoming: (ownerId: string) => void
): Promise<void> {
  try {
    await cancelOrDeclineRequest(session, ownerId);
    removeIncoming(ownerId);
  } catch (error) {
    console.error('Error declining friend request: ', error);
  }
}

// Withdraw an outgoing request: delete it on the backend, then drop it from `outgoing`.
export async function handleCancelRequest(
  session: Session,
  ownerId: string,
  removeOutgoing: (ownerId: string) => void
): Promise<void> {
  try {
    await cancelOrDeclineRequest(session, ownerId);
    removeOutgoing(ownerId);
  } catch (error) {
    console.error('Error cancelling friend request: ', error);
  }
}

// Remove an accepted friendship: delete it on the backend, then drop it from `friends`.
export async function handleRemoveFriend(
  session: Session,
  ownerId: string,
  removeFriendFromStore: (ownerId: string) => void
): Promise<void> {
  try {
    await removeFriend(session, ownerId);
    removeFriendFromStore(ownerId);
  } catch (error) {
    console.error('Error removing friend: ', error);
  }
}
