interface Shirt {
  id: string;
  team: string;
  teamKey: string;
  leagueKey: string;
  season: string;
  type: string;
  condition: number;
  printName: string | null;
  printNumber: number | null;
  size: string | null;
  value: number | null;
  imageSrc: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ShirtState {
  shirts: Array<Shirt>;
  addShirt: (shirt: Shirt) => void;
  setShirts: (shirts: Array<Shirt>) => void;
  updateShirt: (id: string, updateShirt: Partial<Shirt>) => void;
  removeShirt: (id: string) => void;
}

// Aggregate like state returned by the like toggle endpoint.
interface LikeState {
  likeCount: number;
  likedByMe: boolean;
}

// A user who liked a shirt (shown on the owner's shirt detail view).
interface Liker {
  ownerId: string;
  username: string;
  avatarUrl: string | null;
}

// Single shirt of another user, enriched with like state for the viewer.
// The backend returns camelCase, so this extends the camelCase ShirtResponse.
interface FriendShirtDetail extends ShirtResponse {
  likeCount: number;
  likedByMe: boolean;
}

// The current user's own shirt with the list of users who liked it.
interface OwnShirtDetail extends ShirtResponse {
  likeCount: number;
  likers: Liker[];
}