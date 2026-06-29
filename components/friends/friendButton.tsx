import PrimaryButton from "@/components/buttons/primaryButton";
import { useAuth } from "@/contexts/authContext";
import { useFriendsStore } from "@/stores/friendsStore";
import {
  handleAcceptRequest,
  handleCancelRequest,
  handleDeclineRequest,
  handleRemoveFriend,
  handleSendRequest,
} from "@/utils/handleFriendOperations";
import { useState } from "react";
import { View } from "react-native";
import SecondaryButton from "../buttons/secondaryButton";

// Friendship action shown on another user's profile
// Renders the right action(s) for the current relationship 
export default function FriendButton({ ownerId, username, avatarUrl, initialStatus }: { ownerId: string, username: string, avatarUrl: string | null, initialStatus: FriendStatus }) {
  const { session } = useAuth();
  const { addFriend, addOutgoing, removeFriend, removeIncoming, removeOutgoing } = useFriendsStore((state) => state);
  const [status, setStatus] = useState<FriendStatus>(initialStatus);
  const [loading, setLoading] = useState(false);

  if (!session) return null;

  const user = { ownerId, username, avatarUrl };

  const onAdd = async () => {
    setLoading(true);
    const newStatus = await handleSendRequest(session, user, addOutgoing, addFriend, removeIncoming);
    setStatus(newStatus);
    setLoading(false);
  };

  const onCancel = async () => {
    setLoading(true);
    await handleCancelRequest(session, ownerId, removeOutgoing);
    setStatus('none');
    setLoading(false);
  };

  const onAccept = async () => {
    setLoading(true);
    const accepted = await handleAcceptRequest(session, user, addFriend, removeIncoming);
    setStatus(accepted ? 'friends' : 'requestReceived');
    setLoading(false);
  };

  const onDecline = async () => {
    setLoading(true);
    await handleDeclineRequest(session, ownerId, removeIncoming);
    setStatus('none');
    setLoading(false);
  };

  // TODO: 
  const onRemove = async () => {
    setLoading(true);
    await handleRemoveFriend(session, ownerId, removeFriend);
    setStatus('none');
    setLoading(false);
  };

  // if status == requestReceived, display accept and decline button
  if (status === 'requestReceived') {
    return (
      <View className="w-full flex-row gap-3" testID="friend_button">
        <View className="flex-1">
          <PrimaryButton loading={loading} onPress={onAccept} text="Annehmen" />
        </View>
        <View className="flex-1">
          <SecondaryButton loading={loading} onPress={onDecline} text="Ablehnen" />
        </View>
      </View>
    );
  }

  // if status != requestReceived, map to one of the other states and display one correct button
  const action = {
    none: { onPress: onAdd, text: 'Freund hinzufügen' },
    requestSent: { onPress: onCancel, text: 'Anfrage zurückziehen' },
    friends: { onPress: onRemove, text: 'Freund entfernen' },
  }[status];

  return (
    <View className="w-full" testID="friend_button">
      <PrimaryButton loading={loading} onPress={action.onPress} text={action.text} />
    </View>
  );
}
