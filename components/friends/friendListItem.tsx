import ShirtImage from "@/components/ui/shirtImage";
import { getAvatarSourceFromParts } from "@/utils/getAvatarSource";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

// A single friend. Tapping the friend opens their profile; the trailing button removes the friendship.
export default function FriendListItem({ friend, onRemove, onNavigate }: { friend: FriendUser, onRemove: () => void, onNavigate?: () => void }) {
  const handlePress = () => {
    onNavigate?.();
    router.navigate(`/users/${friend.ownerId}`);
  };

  return (
    <View className="flex-row items-center gap-3 p-3 rounded-xl">
      <Pressable
        className="flex-1 flex-row items-center gap-3 active:opacity-70"
        onPress={handlePress}
        testID={`friend_${friend.ownerId}`}
      >
        <ShirtImage imageSrc={getAvatarSourceFromParts(friend.username, friend.avatarUrl)} type='avatar' />
        <Text className="flex-1 text-white/80 text-base font-LexendBold" numberOfLines={1}>{friend.username}</Text>
      </Pressable>
      <Pressable
        className="size-10 items-center justify-center rounded-full bg-dark-secondaryBackground active:opacity-80"
        onPress={onRemove}
        testID={`remove_friend_${friend.ownerId}`}
      >
        <Ionicons name="person-remove" size={18} color='rgb(141, 157, 180)' />
      </Pressable>
    </View>
  );
}
