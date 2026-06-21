import { useAuth } from "@/contexts/authContext";
import { getPublicProfile } from "@/services/shirthub_user_profile";
import LoadingView from "@/views/loadingView";
import OtherUserProfileView from "@/views/otherUserProfileView";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserProfile() {
  const { session } = useAuth();
  const { id } = useLocalSearchParams();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);

  let userId: string | null = null;
  if (typeof id === 'string') userId = id;
  else if (Array.isArray(id) && id.length > 0) userId = id[0];

  useEffect(() => {
    if (!session || !userId) {
      if (!userId) setLoading(false);
      return;
    }

    let active = true;
    const fetchProfile = async () => {
      try {
        const publicProfile = await getPublicProfile(session, userId);
        if (active) setProfile(publicProfile);
      } catch {
        if (active) setProfile(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProfile();

    return () => { active = false; };
  }, [session, userId]);

  return (
    <SafeAreaView className="flex-1 bg-dark-background pb-24">
      <View className="flex-row items-center backdrop-blur-md px-4 pb-2 pt-3 justify-between border-b border-dark-border">
        <Pressable className="size-12 items-center justify-center" onPress={() => router.back()} testID="back_button">
          <Ionicons name="arrow-back" size={24} color='rgb(141, 157, 180)' />
        </Pressable>
        <Text className="text-white/80 text-3xl font-LexendBold tracking-tight text-center">Profil</Text>
        <View className="size-12" />
      </View>
      {
        loading
          ? <LoadingView />
          : profile
            ? <OtherUserProfileView profile={profile} />
            : <Text className="text-red-500 text-lg font-medium text-center mt-8">Leider ist es aktuell nicht möglich, dieses Profil zu laden. Bitte versuche es später nochmal.</Text>
      }
    </SafeAreaView>
  );
}
