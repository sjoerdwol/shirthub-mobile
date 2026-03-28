import { useAuth } from "@/contexts/authContext";
import { useShirtStore } from "@/stores/shirtStore";
import { handleShirtInitialFetch } from "@/utils/handleShirtOperations";
import CollectionView from "@/views/collectionView";
import LoadingView from "@/views/loadingView";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Collection() {
  const { session } = useAuth();
  const { shirts, setShirts } = useShirtStore(state => state);
  const [loading, setLoading] = useState(true);

  // TODO: Activate this properly after notifications have been implemented on homepage
  useEffect(() => {
    /*const initialShirtFetch = async () => {
      await handleShirtInitialFetch(session, setShirts);
      setLoading(false);
    };

    initialShirtFetch();*/
    setLoading(false);
  }, [session, setShirts]);

  return (
    <SafeAreaView className="flex-1 bg-dark-background pb-14">
      <View className="flex-row items-center backdrop-blur-md px-4 pb-2 pt-3 justify-between border-b border-dark-border">
        <View className="size-12 items-center justify-center">
          <Ionicons name="grid" size={22} color='rgb(141, 157, 180)' />
        </View>
        <Text className="text-white/80 text-3xl font-Lexend font-bold tracking-tight text-center">Meine Sammlung</Text>
        <View className="items-center justify-center size-12">
          <Ionicons name="settings" size={24} color='rgb(141, 157, 180)' />
        </View>
      </View>
      <View className="flex-1">
        <View className="p-4 my-2">
          <View className="relative">
            <Ionicons className="absolute left-3 top-1/2 -translate-y-1/2" name="search" size={20} color='#6F839F' />
            <TextInput
              className="w-full h-12 pl-12 pr-4 bg-dark-secondaryBackground rounded-xl text-white/70 placeholder:text-dark-placeholder font-Lexend"
              placeholder="Durchsuche deine Sammlung ..."
            />
          </View>
          <View className="flex-row gap-2 overflow-x-auto mt-4">
            <View className="items-center gap-1 px-4 py-2 bg-dark-highlight rounded-full shadow-sm">
              <Text className="text-white font-Lexend text-base font-medium whitespace-nowrap">Alle Trikots</Text>
            </View>
          </View>
        </View>
        {
          loading
            ? <LoadingView />
            : <CollectionView shirts={shirts} />
        }
      </View>
    </SafeAreaView>
  );
}
