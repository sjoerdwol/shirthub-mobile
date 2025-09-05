import { ShirtCardProps } from '@/types/shirtCardProps';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import ShirtImage from './shirtImage';

export default function ShirtCard({ imageSize, shirt }: ShirtCardProps) {
  return (
    <View className='justify-center items-start'>
      <Pressable onPress={() => router.navigate(`/shirts/${shirt.id}`)} testID='pressable_navigate_to_detail'>
        <ShirtImage imageSrc={require('../../assets/images/exampleshirt.png')} size={imageSize} />
      </Pressable>
      <View className='mt-3 px-2'>
        <Text className='mb-0.5 text-dark-text-400 font-semibold'>{shirt.team}</Text>
        <Text className='text-dark-text-500 text-sm'>{shirt.season}, {shirt.type}</Text>
      </View>
    </View>
  );
}