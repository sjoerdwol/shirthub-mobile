import UserProfileFavoritePicker from "@/components/profile/userProfileFavoritePicker";
import UserProfileHeader from "@/components/profile/userProfileHeader";
import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function ProfileView({ authLoading, profile, shirtAmount, signOut }: { authLoading: boolean, profile: Profile, shirtAmount: number, signOut: () => Promise<void> }) {
  return (
    <Animated.View
      className="flex-1 px-4"
      entering={FadeIn.duration(500)}
    >
      <View className="mt-14">
        <UserProfileHeader authLoading={authLoading} profile={profile} shirtAmount={shirtAmount} signOut={signOut} />
      </View>
      <View className="mt-8">
        <UserProfileFavoritePicker profile={profile} />
      </View>
    </Animated.View>
  );
}