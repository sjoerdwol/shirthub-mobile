import FriendsListSection from "@/components/friends/friendsListSection";
import ReceivedRequestsSection from "@/components/friends/receivedRequestsSection";
import SentRequestsSection from "@/components/friends/sentRequestsSection";
import UserSearchSection from "@/components/friends/userSearchSection";
import { useAuth } from "@/contexts/authContext";
import { useFriendsStore } from "@/stores/friendsStore";
import { handleFriendsInitialFetch } from "@/utils/handleFriendOperations";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useEffect } from "react";
import { Dimensions, Modal, Pressable, ScrollView, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DRAWER_WIDTH = Dimensions.get('window').width * 0.85;

export default function FriendsDrawer({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const { session } = useAuth();
  const { setFriends, setIncoming, setOutgoing } = useFriendsStore((state) => state);
  const translateX = useSharedValue(-DRAWER_WIDTH);

  useEffect(() => {
    translateX.value = withTiming(visible ? 0 : -DRAWER_WIDTH, { duration: 250 });
  }, [visible, translateX]);

  // Refresh friends and pending requests from the backend whenever the drawer opens.
  useEffect(() => {
    if (visible && session) { handleFriendsInitialFetch(session, setFriends, setIncoming, setOutgoing) };
  }, [visible, session, setFriends, setIncoming, setOutgoing]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Modal animationType="fade" onRequestClose={onClose} statusBarTranslucent transparent visible={visible}>
      <View className="flex-1 flex-row">
        <Animated.View
          className="bg-dark-background border-r border-dark-border px-4"
          style={[{ width: DRAWER_WIDTH, paddingTop: insets.top, paddingBottom: insets.bottom }, animatedStyle]}
        >
          <View className="flex-row items-center justify-between pt-3 pb-4 border-b border-dark-border">
            <Text className="text-white/80 text-2xl font-LexendBold">Freunde</Text>
            <Pressable className="size-10 items-center justify-center" onPress={onClose} testID="close_friends_drawer">
              <Ionicons name="close" size={24} color='rgb(141, 157, 180)' />
            </Pressable>
          </View>
          <View className="flex-1 pt-4">
            <View className="mb-6">
              <UserSearchSection onResultPress={onClose} />
            </View>
            <ScrollView
              className=""
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <ReceivedRequestsSection onItemPress={onClose} />
              <SentRequestsSection onItemPress={onClose} />
              <FriendsListSection onItemPress={onClose} />
            </ScrollView>
          </View>
        </Animated.View>
        <Pressable className="flex-1 bg-black/50" onPress={onClose} testID="friends_drawer_backdrop" />
      </View>
    </Modal>
  );
}
