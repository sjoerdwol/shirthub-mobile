import ShirtImage from "@/components/ui/shirtImage";
import { getAvatarSourceFromParts } from "@/utils/getAvatarSource";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

// A single pending friend request. Incoming requests can be accepted or declined, outgoing requests can be withdrawn.
export default function FriendRequestItem(props: IncomingProps | OutgoingProps) {
  const { request } = props;

  const handlePress = () => {
    props.onNavigate?.();
    router.navigate(`/users/${props.request.ownerId}`);
  };

  return (
    <View className="flex-row items-center gap-3 p-3 rounded-xl">
      <Pressable
        className="flex-1 flex-row items-center gap-3 active:opacity-70"
        onPress={handlePress}
        testID={`friend_${props.request.ownerId}`}
      >
        <ShirtImage imageSrc={getAvatarSourceFromParts(request.username, request.avatarUrl)} type='avatar' />
        <Text className="flex-1 text-white/80 text-base font-LexendBold" numberOfLines={1}>{request.username}</Text>
      </Pressable>
      {
        props.variant === 'incoming'
          ? (
            <View className="flex-row gap-2">
              <Pressable
                className="size-10 items-center justify-center rounded-full bg-dark-highlight active:opacity-80"
                onPress={props.onAccept}
                testID={`accept_request_${request.ownerId}`}
              >
                <Ionicons name="checkmark" size={20} color="#fff" />
              </Pressable>
              <Pressable
                className="size-10 items-center justify-center rounded-full bg-dark-secondaryBackground active:opacity-80"
                onPress={props.onDecline}
                testID={`decline_request_${request.ownerId}`}
              >
                <Ionicons name="close" size={20} color='rgb(141, 157, 180)' />
              </Pressable>
            </View>
          )
          : (
            <Pressable
              className="size-10 items-center justify-center rounded-full bg-dark-secondaryBackground active:opacity-80"
              onPress={props.onCancel}
              testID={`cancel_request_${request.ownerId}`}
            >
              <Ionicons name="close" size={20} color='rgb(141, 157, 180)' />
            </Pressable>
          )
      }
    </View>
  );
}
