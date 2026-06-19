import ShirtImage from "@/components/ui/shirtImage";
import getAvatarSource from "@/utils/getAvatarSource";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export default function AvatarPicker({ loading, profile, showOptions }: { loading: boolean, profile: Profile, showOptions: () => void }) {
  return (
    <View className="items-center mb-8">
      <Pressable disabled={loading} onPress={showOptions} testID="avatar_picker">
        <ShirtImage
          imageSrc={getAvatarSource(profile)}
          type="profile"
        />
        {loading && (
          <View className="absolute inset-0 items-center justify-center rounded-full bg-black/40" testID="avatar_picker_loading">
            <ActivityIndicator color="#fff" size="small" />
          </View>
        )}
      </Pressable>
      <Pressable disabled={loading} onPress={showOptions}>
        <Text className="text-dark-highlight text-base font-LexendBold mt-3">Profilbild ändern</Text>
      </Pressable>
    </View>
  );
}
