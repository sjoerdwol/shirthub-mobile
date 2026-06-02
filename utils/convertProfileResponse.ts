export default function convertProfileResponse(profileResponse: ProfileResponse): Profile {
  return {
    owner_id: profileResponse.ownerId,
    username: profileResponse.username,
    avatar_url: profileResponse.avatarUrl,
    is_public: profileResponse.isPublic,
    created_at: profileResponse.createdAt,
    updated_at: profileResponse.updatedAt,
    email: profileResponse.email
  };
}