import { router } from "expo-router";
import { Text, View } from "react-native";
import PrimaryButton from "../buttons/primaryButton";
import SecondaryButton from "../buttons/secondaryButton";
import ShirtImage from "../ui/shirtImage";

export default function UserProfileHeader({ authLoading, profile, shirtAmount, signOut }: { authLoading: boolean, profile: Profile, shirtAmount: number, signOut: () => Promise<void> }) {
  return (
    <View className="items-center">
      <ShirtImage
        imageSrc={require('../../assets/images/exampleavatar.png')}
        type='profile'
      />
      <Text className="text-white/80 text-3xl font-bold font-Lexend mb-0.5 mt-4">{profile.username}</Text>
      <Text className="text-white/70 text-base font-Lexend">Mitglied seit {new Date(profile.created_at).getFullYear()}  •  {shirtAmount} Trikots</Text>
      <View className="flex-row justify-between mt-6 w-full gap-4">
        <View className="flex-1">
          <SecondaryButton
            loading={false}
            onPress={() => router.navigate('/settings')}
            text="Einstellungen"
          />
        </View>
        <View className="flex-1">
          <PrimaryButton
            loading={authLoading}
            onPress={signOut}
            text="Abmelden"
          />
        </View>
      </View>
    </View>
  );
}