import FriendListItem from "@/components/friends/friendListItem";
import { useAuth } from "@/contexts/authContext";
import { useFriendsStore } from "@/stores/friendsStore";
import { handleRemoveFriend } from "@/utils/handleFriendOperations";
import { Text, View } from "react-native";

// The current user's accepted friends.
export default function FriendsListSection({ onItemPress }: { onItemPress?: () => void }) {
  const { session } = useAuth();
  const { friends, removeFriend } = useFriendsStore((state) => state);

  return (
    <View className="mb-6">
      <Text className="text-white/80 text-lg font-LexendBold mb-2">Freundesliste</Text>
      {
        friends.length === 0
          ? <Text className="text-white/50 font-Lexend">Noch keine Freunde</Text>
          : friends.map((friend) => (
            <FriendListItem
              friend={friend}
              key={friend.ownerId}
              onNavigate={onItemPress}
              onRemove={() => { if (session) handleRemoveFriend(session, friend.ownerId, removeFriend); }}
            />
          ))
      }
    </View>
  );
}
