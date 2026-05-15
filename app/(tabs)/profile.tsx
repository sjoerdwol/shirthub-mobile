import { useAuth } from "@/contexts/authContext";
import LoadingView from "@/views/loadingView";
import ProfileView from "@/views/profileView";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { loading, signOut } = useAuth();
  const [profileLoading, setProfileLoading] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-dark-background pb-24">
      <View className="flex-row items-center backdrop-blur-md px-4 pb-3.5 pt-[1.125rem] justify-center border-b border-dark-border">
        <Text className="text-white/80 text-3xl font-Lexend font-bold tracking-tight text-center">Mein Profil</Text>
      </View>
      {
        profileLoading
          ? <LoadingView />
          : <ProfileView />
      }
    </SafeAreaView>
  );
}
