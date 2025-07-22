import DetailsItem from '@/components/details/detailsItem';
import DetailsRow from '@/components/details/detailsRow';
import ShirtImage from '@/components/ui/shirtImage';
import { useShirtStore } from '@/stores/shirtStore';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function ShirtDetails() {
  const { id } = useLocalSearchParams();
  const shirts = useShirtStore((state) => state.shirts);
  const shirt = shirts.find((currShirt) => currShirt.id === id);

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
                    title='Condition'
                    content={shirt.condition}
                  />
                  <DetailsItem
                    title='Type'
                    content={shirt.type}
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