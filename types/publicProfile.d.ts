interface UserSearchResult {
  ownerId: string;
  username: string;
  avatarUrl: string | null;
}

interface PublicProfile {
  ownerId: string;
  username: string;
  avatarUrl: string | null;
  isPublic: boolean;
  createdAt: string;
  shirtCount: number;
  friendStatus: FriendStatus;
  // Core statistics, only present when the profile is viewable (public or friends)
  distinctTeamsCount?: number;
  totalValue?: number;
}
