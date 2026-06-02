interface Profile {
  owner_id: string;
  username: string;
  avatar_url: string | null;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
  email: string;
}

interface ProfileState {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  updateProfile: (profile: Profile) => void;
}