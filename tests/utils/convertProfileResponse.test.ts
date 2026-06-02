import convertProfileResponse from "@/utils/convertProfileResponse";

it('correctly converts backend profile response', () => {
  const createdAt = new Date('2024-01-01T00:00:00Z');
  const updatedAt = new Date('2024-02-01T00:00:00Z');

  const response: ProfileResponse = {
    ownerId: 'TEST-OWNER-ID',
    username: 'TestUser',
    avatarUrl: 'https://example.com/avatar.png',
    isPublic: true,
    createdAt,
    updatedAt,
    email: 'test@example.com'
  };

  const expectedProfile: Profile = {
    owner_id: 'TEST-OWNER-ID',
    username: 'TestUser',
    avatar_url: 'https://example.com/avatar.png',
    is_public: true,
    created_at: createdAt,
    updated_at: updatedAt,
    email: 'test@example.com'
  };

  expect(convertProfileResponse(response)).toEqual(expectedProfile);
});

it('keeps a null avatar url and a private profile', () => {
  const response: ProfileResponse = {
    ownerId: 'TEST-OWNER-ID',
    username: 'TestUser',
    avatarUrl: null,
    isPublic: false,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    email: 'test@example.com'
  };

  const result = convertProfileResponse(response);

  expect(result.avatar_url).toBeNull();
  expect(result.is_public).toBe(false);
});
