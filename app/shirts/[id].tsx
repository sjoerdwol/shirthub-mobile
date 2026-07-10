import { useAuth } from '@/contexts/authContext';
import { getOwnShirtDetail } from '@/services/shirthub_crud';
import { useShirtStore } from '@/stores/shirtStore';
import { useUserStatisticsStore } from '@/stores/statisticsStore';
import { handleShirtDeletion } from '@/utils/handleShirtOperations';
import ShirtDetailView from '@/views/shirtDetailView';
import Ionicons from "@react-native-vector-icons/ionicons";
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ShirtDetails() {
  const { session } = useAuth();
  const { id } = useLocalSearchParams();
  let shirtId: string | null = null;

  if (typeof id === 'string') shirtId = id;
  else if (Array.isArray(id) && id.length > 0) shirtId = id[0];

  const { shirts, removeShirt } = useShirtStore((state) => state);
  const { setHasChanged } = useUserStatisticsStore((state) => state);
  const shirt = shirts.find((currShirt) => currShirt.id === shirtId);

  const [likeCount, setLikeCount] = useState(0);
  const [likers, setLikers] = useState<Liker[]>([]);

  useEffect(() => {
    if (!session || !shirtId) { return; }

    let active = true;
    getOwnShirtDetail(session, shirtId)
      .then((detail) => {
        if (!active) { return; }
        setLikeCount(detail.likeCount);
        setLikers(detail.likers);
      })
      .catch(() => { });

    return () => { active = false; };
  }, [session, shirtId]);

  const handleEdit = () => {
    router.navigate({
      pathname: '/shirts/manage',
      params: { mode: 'edit', shirt: JSON.stringify(shirt) }
    });
  };

  const handleDelete = async () => {
    if (!session || !shirtId) { return; }
    await handleShirtDeletion(session, shirtId, removeShirt, setHasChanged);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-background pb-24">
      <View className="flex-row items-center backdrop-blur-md px-4 pb-2 pt-3 justify-between border-b border-dark-border">
        <Pressable className="size-12 items-center justify-center" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color='rgb(141, 157, 180)' />
        </Pressable>
        <Text className="text-white/80 text-3xl font-LexendBold tracking-tight text-center">Shirt Details</Text>
        <View className="size-12" />
      </View>
      {
        shirt
          ? <ShirtDetailView handleDelete={handleDelete} handleEdit={handleEdit} shirt={shirt} likeCount={likeCount} likers={likers} />
          : <></>
      }
    </SafeAreaView>
  );
}