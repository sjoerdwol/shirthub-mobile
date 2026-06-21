import { getAvatarSourceFromParts } from "@/utils/getAvatarSource";
import { router } from "expo-router";
import { Pressable, Text } from "react-native";
import ShirtImage from "../ui/shirtImage";

export default function UserSearchResultItem({ user, onResultPress }: { user: UserSearchResult, onResultPress?: () => void }) {
  const handlePress = () => {
    onResultPress?.();
    router.navigate(`/users/${user.ownerId}`);
  };

  return (
    <Pressable
      className="flex-row items-center gap-3 p-3 rounded-xl active:bg-dark-secondaryBackground"
      onPress={handlePress}
    >
      <ShirtImage imageSrc={getAvatarSourceFromParts(user.username, user.avatarUrl)} type='avatar' />
      <Text className="text-white/80 text-base font-LexendBold" numberOfLines={1}>{user.username}</Text>
    </Pressable>
  );
}
