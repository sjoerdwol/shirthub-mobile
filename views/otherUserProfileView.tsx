import ShirtImage from "@/components/ui/shirtImage";
import { getAvatarSourceFromParts } from "@/utils/getAvatarSource";
import { Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function OtherUserProfileView({ profile }: { profile: PublicProfile }) {
  return (
    <Animated.View
      className="flex-1 px-4"
      entering={FadeIn.duration(500)}
    >
      <View className="mt-14 items-center">
        <ShirtImage
          imageSrc={getAvatarSourceFromParts(profile.username, profile.avatarUrl)}
          type='profile'
        />
        <Text className="text-white/80 text-3xl font-LexendBold mb-0.5 mt-4">{profile.username}</Text>
        {
          profile.isPublic &&
          <Text className="text-white/70 text-base font-Lexend">
            Mitglied seit {new Date(profile.createdAt).getFullYear()}  •  {profile.shirtCount} Trikots
          </Text>
        }
      </View>
    </Animated.View>
  );
}
