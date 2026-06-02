interface ProfileResponse {
  ownerId: string;
  username: string;
  avatarUrl: string | null;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  email: string;
}