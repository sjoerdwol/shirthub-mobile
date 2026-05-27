import UserProfileFavoritePicker from "@/components/profile/userProfileFavoritePicker";
import UserProfileHeader from "@/components/profile/userProfileHeader";
import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function ProfileView() {
  return (
    <Animated.View
      className="flex-1 px-4"
      entering={FadeIn.duration(500)}
    >
      <View className="mt-14">
        <UserProfileHeader />
      </View>
      <View className="mt-8">
        <UserProfileFavoritePicker />
      </View>
    </Animated.View>
  );
}