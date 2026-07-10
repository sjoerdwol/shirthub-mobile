import { useAuth } from "@/contexts/authContext";
import { setShirtLike } from "@/services/shirthub_likes";
import { getFriendShirt } from "@/services/shirthub_public_collection";
import LoadingView from "@/views/loadingView";
import OtherUserShirtDetailView from "@/views/otherUserShirtDetailView";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FriendShirtDetails() {
  const { session } = useAuth();
  const { id, shirtId } = useLocalSearchParams();
  const [shirt, setShirt] = useState<FriendShirtDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [liking, setLiking] = useState(false);

  let userId: string | null = null;
  if (typeof id === 'string') userId = id;
  else if (Array.isArray(id) && id.length > 0) userId = id[0];

  let currentShirtId: string | null = null;
  if (typeof shirtId === 'string') currentShirtId = shirtId;
  else if (Array.isArray(shirtId) && shirtId.length > 0) currentShirtId = shirtId[0];

  useEffect(() => {
    if (!session || !userId || !currentShirtId) {
      const setLoadingFalse = async () => setLoading(false);
      setLoadingFalse();
      return;
    }

    let active = true;
    const fetchShirt = async () => {
      try {
        const detail = await getFriendShirt(session, userId, currentShirtId);
        if (active) setShirt(detail);
      } catch {
        if (active) setShirt(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchShirt();

    return () => { active = false; };
  }, [session, userId, currentShirtId]);

  const handleToggleLike = async () => {
    if (!session || !currentShirtId || !shirt || liking) { return; }
    setLiking(true);
    try {
      const likeState = await setShirtLike(session, currentShirtId, !shirt.likedByMe);
      setShirt({ ...shirt, ...likeState });
    } catch {
      Alert.alert("Fehler", "Der Like konnte nicht gespeichert werden. Bitte versuche es erneut.");
    } finally {
      setLiking(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-background pb-24">
      <View className="flex-row items-center backdrop-blur-md px-4 pb-2 pt-3 justify-between border-b border-dark-border">
        <Pressable className="size-12 items-center justify-center" onPress={() => router.back()} testID="back_button">
          <Ionicons name="arrow-back" size={24} color='rgb(141, 157, 180)' />
        </Pressable>
        <Text className="text-white/80 text-3xl font-LexendBold tracking-tight text-center">Shirt Details</Text>
        {
          shirt
            ? <Pressable className="items-center justify-center size-12" onPress={handleToggleLike} testID="like_button">
              <Ionicons name={shirt.likedByMe ? "heart" : "heart-outline"} size={24} color={shirt.likedByMe ? 'rgb(15, 115, 255)' : 'rgb(141, 157, 180)'} />
            </Pressable>
            : <View className="size-12" />
        }
      </View>
      {
        loading
          ? <LoadingView />
          : shirt
            ? <OtherUserShirtDetailView shirt={shirt} />
            : <Text className="text-red-500 text-lg font-medium text-center mt-8">Leider ist es aktuell nicht möglich, dieses Trikot zu laden. Bitte versuche es später nochmal.</Text>
      }
    </SafeAreaView>
  );
}
