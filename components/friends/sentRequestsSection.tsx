import FriendRequestItem from "@/components/friends/friendRequestItem";
import { useAuth } from "@/contexts/authContext";
import { useFriendsStore } from "@/stores/friendsStore";
import { handleCancelRequest } from "@/utils/handleFriendOperations";
import { Text, View } from "react-native";

// Outgoing friend requests the current user has sent and can withdraw.
export default function SentRequestsSection({ onItemPress }: { onItemPress?: () => void }) {
  const { session } = useAuth();
  const { outgoing, removeOutgoing } = useFriendsStore((state) => state);

  return (
    <View className="mb-6">
      <Text className="text-white/80 text-lg font-LexendBold mb-2">Gesendete Anfragen</Text>
      {
        outgoing.length === 0
          ? <Text className="text-white/50 font-Lexend">Keine gesendeten Anfragen</Text>
          : outgoing.map((request) => (
            <FriendRequestItem
              key={request.ownerId}
              onCancel={() => { if (session) handleCancelRequest(session, request.ownerId, removeOutgoing); }}
              onNavigate={onItemPress}
              request={request}
              variant="outgoing"
            />
          ))
      }
    </View>
  );
}
