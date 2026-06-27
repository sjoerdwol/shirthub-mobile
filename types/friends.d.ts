type FriendStatus = 'none' | 'friends' | 'requestSent' | 'requestReceived';

type IncomingProps = {
  request: FriendRequest;
  variant: 'incoming';
  onAccept: () => void;
  onDecline: () => void;
  onNavigate?: () => void;
};

type OutgoingProps = {
  request: FriendRequest;
  variant: 'outgoing';
  onCancel: () => void;
  onNavigate?: () => void;
};

interface FriendshipResponse {
  id: string;
  requesterId: string;
  addresseeId: string;
  status: 'pending' | 'accepted';
  createdAt: string;
  updatedAt: string;
}

interface FriendUser {
  ownerId: string;
  username: string;
  avatarUrl: string | null;
  since: string;
}

interface FriendRequest {
  ownerId: string;
  username: string;
  avatarUrl: string | null;
  createdAt: string;
}

interface FriendRequests {
  incoming: Array<FriendRequest>;
  outgoing: Array<FriendRequest>;
}

interface FriendsState {
  friends: Array<FriendUser>;
  incoming: Array<FriendRequest>;
  outgoing: Array<FriendRequest>;
  setFriends: (friends: Array<FriendUser>) => void;
  setIncoming: (incoming: Array<FriendRequest>) => void;
  setOutgoing: (outgoing: Array<FriendRequest>) => void;
  addFriend: (friend: FriendUser) => void;
  addOutgoing: (request: FriendRequest) => void;
  removeFriend: (ownerId: string) => void;
  removeIncoming: (ownerId: string) => void;
  removeOutgoing: (ownerId: string) => void;
}
