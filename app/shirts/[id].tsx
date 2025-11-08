import DetailsItem from '@/components/details/detailsItem';
import DetailsRow from '@/components/details/detailsRow';
import MenuOverlay from '@/components/menuOverlay/menuOverlay';
import ShirtImage from '@/components/ui/shirtImage';
import { useAuth } from '@/contexts/authContext';
import { useShirtStore } from '@/stores/shirtStore';
import { useUserStatisticsStore } from '@/stores/statisticsStore';
import { handleShirtDeletion } from '@/utils/handleShirtOperations';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { setMenuVisibleGlobal } from '../_layout';

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

  useEffect(() => {
    setMenuVisibleGlobal(setMenuVisible);
  }, []);

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
    <View className="bg-dark-background-400 flex-1 p-4">
      {shirt
        ? (
          <>
            <View className='bg-dark-background-200 mb-4 overflow-hidden h-64 w-full rounded-xl'>
              <ShirtImage
                imageSrc={require('../../assets/images/exampleshirt.png')}
                size='maxi'
              />
            </View>
            <View className='p-4'>
              <Text className='font-bold mb-4 text-dark-text-400 text-2xl'>{`${shirt.team} - ${shirt.season} - ${shirt.type}`}</Text>
              <View className='px-1'>
                <DetailsRow>
                  <DetailsItem
                    title='Team'
                    content={shirt.team}
                  />
                  <DetailsItem
                    title='Season'
                    content={shirt.season}
                  />
                </DetailsRow>
                <DetailsRow>
                  <DetailsItem
                    title='Type'
                    content={shirt.type}
                  />
                  <DetailsItem
                    title='Condition'
                    content={shirt.condition}
                  />
                </DetailsRow>
                <DetailsRow>
                  <DetailsItem
                    title='Print Name'
                    content={shirt.print_name}
                  />
                  <DetailsItem
                    title='Print Number'
                    content={shirt.print_number}
                  />
                </DetailsRow>
                <DetailsRow>
                  <DetailsItem
                    title='Size'
                    content={shirt.size}
                  />
                  <DetailsItem
                    title='Value'
                    content={shirt.value}
                  />
                </DetailsRow>
              </View>
            </View>

            <MenuOverlay
              onDelete={handleDelete}
              onClose={() => setMenuVisible(false)}
              onEdit={handleEdit}
              visible={menuVisible}
            />
          </>
        )
        : (
          <View>
          </View>
        )
      }
    </View>
  );
}