import FriendRequestItem from "@/components/friends/friendRequestItem";
import { useAuth } from "@/contexts/authContext";
import { useFriendsStore } from "@/stores/friendsStore";
import { handleAcceptRequest, handleDeclineRequest } from "@/utils/handleFriendOperations";
import { Text, View } from "react-native";

// Incoming friend requests the current user can accept or decline.
export default function ReceivedRequestsSection({ onItemPress }: { onItemPress?: () => void }) {
  const { session } = useAuth();
  const { incoming, addFriend, removeIncoming } = useFriendsStore((state) => state);

  return (
    <View className="mb-6">
      <Text className="text-white/80 text-lg font-LexendBold mb-2">Erhaltene Anfragen</Text>
      {
        incoming.length === 0
          ? <Text className="text-white/50 font-Lexend">Keine erhaltenen Anfragen</Text>
          : incoming.map((request) => (
            <FriendRequestItem
              key={request.ownerId}
              onAccept={() => { if (session) handleAcceptRequest(session, request, addFriend, removeIncoming); }}
              onDecline={() => { if (session) handleDeclineRequest(session, request.ownerId, removeIncoming); }}
              onNavigate={onItemPress}
              request={request}
              variant="incoming"
            />
          ))
      }
    </View>
  );
}
