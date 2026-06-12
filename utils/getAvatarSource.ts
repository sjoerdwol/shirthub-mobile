import { ImageSourcePropType } from 'react-native';

const DICEBEAR_STYLE = 'fun-emoji';

// Builds the image source for a user's avatar. If the profile has an uploaded
// avatar, that URL is used. Otherwise a deterministic placeholder is generated
// by DiceBear from the username as seed, so every user gets a stable, unique
// image even without an uploaded picture.
export default function getAvatarSource(profile: Profile): ImageSourcePropType {
  if (profile.avatar_url) return { uri: profile.avatar_url };

  const seed = encodeURIComponent(profile.username);
  return { uri: `https://api.dicebear.com/9.x/${DICEBEAR_STYLE}/png?seed=${seed}` };
}
