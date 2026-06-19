import { useAuth } from "@/contexts/authContext";
import { useReferenceDataStore } from "@/stores/referenceDataStore";
import { handleReferenceData } from "@/utils/setReferenceData";
import LoadingView from "@/views/loadingView";
import ShirtManageView from "@/views/shirtManageView";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ManageShirt() {
  const { session } = useAuth();
  const { mode, shirt } = useLocalSearchParams();
  const { data, setReferenceData } = useReferenceDataStore((state) => state);
  const [loading, setLoading] = useState(true);
  let currentShirt: Shirt | null = null;

  if (typeof shirt === 'string') { currentShirt = JSON.parse(shirt); }
  else if (Array.isArray(shirt) && shirt.length > 0) { currentShirt = JSON.parse(shirt[0]); }

  useEffect(() => {
    if (!session || data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional loading toggle within an async data-loading effect
      setLoading(false);
      return;
    }

    const loadReferenceData = async () => {
      await handleReferenceData(session, setReferenceData);
      setLoading(false);
    };

    loadReferenceData();
  }, [session, data, setReferenceData]);

  // necessary guard even if this is technically not possible since mode is only strictly set by a previous page
  if (mode !== 'add' && mode !== 'edit') { return null; }

  return (
    <SafeAreaView className="flex-1 bg-dark-background pb-24">
      <View className="flex-row items-center backdrop-blur-md px-4 pb-2 pt-3 justify-between border-b border-dark-border">
        <Pressable className="size-12 items-center justify-center" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color='rgb(141, 157, 180)' />
        </Pressable>
        <Text className="text-white/80 text-3xl font-Lexend font-bold tracking-tight text-center">{mode === 'edit' ? 'Bearbeite dein Trikot' : 'Füge ein Trikot hinzu'}</Text>
        <Pressable className="items-center justify-center size-12" onPress={() => { }}>
          <Ionicons name="heart" size={0} color='rgb(141, 157, 180)' />
        </Pressable>
      </View>
      {
        loading
          ? <LoadingView />
          : data
            ? <ShirtManageView data={data} mode={mode} shirt={currentShirt} />
            : <Text className="text-red-500 text-lg font-medium text-center">Leider ist es aktuell nicht möglich, die nötigen Daten zu laden. Bitte versuche es später nochmal.</Text>
      }
    </SafeAreaView>
  );
}