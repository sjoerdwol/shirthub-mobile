import UserSettingsForm from "@/components/forms/userSettingsForm";
import AvatarPickerContainer from "@/components/profile/avatarPickerContainer";
import Animated, { FadeIn } from "react-native-reanimated";

export default function SettingsView({ profile }: { profile: Profile }) {
  return (
    <Animated.View
      className="flex-1 p-4 mt-2"
      entering={FadeIn.duration(500)}
    >
      <AvatarPickerContainer profile={profile} />
      <UserSettingsForm profile={profile} />
    </Animated.View>
  );
}
