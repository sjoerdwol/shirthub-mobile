import { useAuth } from "@/contexts/authContext";
import { useShirtStore } from "@/stores/shirtStore";
import { handleShirtInitialFetch } from "@/utils/handleShirtOperations";
import CollectionView from "@/views/collectionView";
import LoadingView from "@/views/loadingView";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

export default function Collection() {
  const { session } = useAuth();
  const { shirts, setShirts } = useShirtStore(state => state);
  const [loading, setLoading] = useState(true);

  if (!session) {
    /* session cannot be null since root _layout.tsx would redirect to login / signup */
    return;
  }

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
    <View className="flex-1 bg-vanillaCream pb-24">
      <View className="p-4 my-2">
        <View className="relative">
          <Ionicons className="absolute left-3 top-1/2 -translate-y-1/2" name="search" size={20} color='#6C584C' />
          <TextInput
            className="w-full h-12 pl-12 pr-4 bg-cream/70 border-none rounded-xl text-ashBrown placeholder:text-ashBrown/40 font-Lexend"
            placeholder="Durchsuche deine Sammlung ..."
          />
        </View>
      </View>
      {
        loading
          ? <LoadingView />
          : <CollectionView shirts={shirts} />
      }
    </View>
  );
}
