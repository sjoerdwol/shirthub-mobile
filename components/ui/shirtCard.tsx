import { ShirtCardProps } from '@/types/shirtCardProps';
import React from 'react';
import { Text, View } from 'react-native';
import ShirtImage from './shirtImage';

export default function ShirtCard({ imageSrc, team, season, type }: ShirtCardProps) {
  return (
    <View className='justify-center items-start'>
      <View className=''>
        <ShirtImage imageSrc={imageSrc} />
      </View>
      <View className='mt-3 px-2'>
        <Text className='mb-1 text-dark-text-400'>{team}</Text>
        <Text className='text-dark-text-500'>{season}</Text>
        <Text className='text-dark-text-500'>{type}</Text>
      </View>
    </View>
  );
}