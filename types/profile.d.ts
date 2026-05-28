interface Profile {
  ownerId: string;
  username: string;
  avatarUrl: string | null;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  email: string;
}

interface ProfileState {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  updateProfile: (profile: Profile) => void;
}