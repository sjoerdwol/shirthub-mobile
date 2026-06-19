import { useProfileStore } from "@/stores/profileStore";
import SettingsView from "@/views/settingsView";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const { profile } = useProfileStore(state => state);

  return (
    <SafeAreaView className="flex-1 bg-dark-background pb-24">
      <View className="flex-row items-center backdrop-blur-md px-4 pb-2 pt-3 justify-between border-b border-dark-border">
        <Pressable className="size-12 items-center justify-center" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color='rgb(141, 157, 180)' />
        </Pressable>
        <Text className="text-white/80 text-3xl font-Lexend font-bold tracking-tight text-center">Einstellungen</Text>
        <View className="size-12" />
      </View>
      {profile && (
        <SettingsView profile={profile} />
      )}
    </SafeAreaView>
  );
}
