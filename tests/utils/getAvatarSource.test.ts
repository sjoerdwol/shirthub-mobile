import getAvatarSource from "@/utils/getAvatarSource";
import mockData from "../data.json";

const mockProfile = mockData.profile as unknown as Profile;

it('returns the uploaded avatar url when one is set', () => {
  const profile = { ...mockProfile, avatar_url: 'https://example.com/avatar.jpg?v=1' } as Profile;

  expect(getAvatarSource(profile)).toEqual({ uri: 'https://example.com/avatar.jpg?v=1' });
});

it('falls back to a DiceBear fun-emoji image seeded with the username', () => {
  const profile = { ...mockProfile, avatar_url: null } as Profile;

  expect(getAvatarSource(profile)).toEqual({
    uri: 'https://api.dicebear.com/9.x/fun-emoji/png?seed=TestUser',
  });
});

it('url-encodes usernames with special characters in the seed', () => {
  const profile = { ...mockProfile, avatar_url: null, username: 'Max Müller' } as Profile;

  expect(getAvatarSource(profile)).toEqual({
    uri: 'https://api.dicebear.com/9.x/fun-emoji/png?seed=Max%20M%C3%BCller',
  });
});
