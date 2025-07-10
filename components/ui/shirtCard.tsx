import { ShirtCardProps } from '@/types/shirtCardProps';
import React from 'react';
import { Text, View } from 'react-native';
import ShirtImage from './shirtImage';

export default function ShirtCard({ imageSrc, team, season, type, size }: ShirtCardProps) {
  return (
    <View className='justify-center items-start'>
      <View className=''>
        <ShirtImage imageSrc={imageSrc} size={size} />
      </View>
      <View className='mt-3 px-2'>
        <Text className='mb-0.5 text-dark-text-400 font-semibold'>{team}</Text>
        <Text className='text-dark-text-500 text-sm'>{season}, {type}</Text>
      </View>
    </View>
  );
}