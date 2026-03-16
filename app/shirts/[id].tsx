import MenuOverlay from '@/components/menuOverlay/menuOverlay';
import { useAuth } from '@/contexts/authContext';
import { useShirtStore } from '@/stores/shirtStore';
import { useUserStatisticsStore } from '@/stores/statisticsStore';
import { handleShirtDeletion } from '@/utils/handleShirtOperations';
import ShirtDetailView from '@/views/shirtDetailView';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
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
  const [menuVisible, setMenuVisible] = useState(false);
  const shirt = shirts.find((currShirt) => currShirt.id === shirtId);

  const handleEdit = () => {
    setMenuVisible(false);
    router.navigate({
      pathname: '/shirts/manage',
      params: { mode: 'edit', shirt: JSON.stringify(shirt) }
    });
  };

  const handleDelete = async () => {
    await handleShirtDeletion(session!, shirtId!, removeShirt, setHasChanged);
    setMenuVisible(false);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-vanillaCream pb-24">
      <View className="flex-row items-center bg-vanillaCream/80 backdrop-blur-md px-4 pb-2 pt-3 justify-between border-b border-ashBrown/15">
        <Pressable className="size-12 items-center justify-center" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color='#6C584C' />
        </Pressable>
        <Text className="text-ashBrown text-3xl font-Lexend font-bold tracking-tight text-center">Details</Text>
        <Pressable className="items-center justify-center size-12" onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="ellipsis-vertical" size={24} color='#6C584C' />
        </Pressable>
      </View>

      <MenuOverlay
        onDelete={handleDelete}
        onClose={() => setMenuVisible(false)}
        onEdit={handleEdit}
        visible={menuVisible}
      />

      {
        shirt
          ? <ShirtDetailView shirt={shirt} />
          : <></>
      }
    </SafeAreaView>
  );
}