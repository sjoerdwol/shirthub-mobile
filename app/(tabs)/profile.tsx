import { useAuth } from "@/contexts/authContext";
import { useProfileStore } from "@/stores/profileStore";
import { useShirtStore } from "@/stores/shirtStore";
import { handleInitialProfileFetch } from "@/utils/handleProfileOperations";
import LoadingView from "@/views/loadingView";
import ProfileView from "@/views/profileView";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { loading, session, signOut } = useAuth();
  const { profile, setProfile } = useProfileStore(state => state);
  const { shirts } = useShirtStore(state => state);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!session) { return; }
    const initialProfileFetch = async () => {
      await handleInitialProfileFetch(session, setProfile);
      setProfileLoading(false);
    }

    initialProfileFetch();
  }, [session, setProfile]);

  return (
    <SafeAreaView className="flex-1 bg-dark-background pb-24">
      <View className="flex-row items-center backdrop-blur-md px-4 pb-3.5 pt-[1.125rem] justify-center border-b border-dark-border">
        <Text className="text-white/80 text-3xl font-LexendBold tracking-tight text-center">Mein Profil</Text>
      </View>
      {
        profileLoading
          ? <LoadingView />
          : profile
            ? <ProfileView authLoading={loading} profile={profile} shirtAmount={shirts.length} signOut={signOut} />
            : <Text className="text-red-500 text-lg font-medium text-center">Leider ist es aktuell nicht möglich, die nötigen Daten zu laden. Bitte versuche es später nochmal.</Text>
      }
    </SafeAreaView>
  );
}
