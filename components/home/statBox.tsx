import { Text, View } from 'react-native';

export default function StatBox({ title, value, size = 'small' }: StatBoxProps) {
  const boxWidth = size === 'large' ? 'w-full' : 'w-[48%]';

  return (
    <View className={`bg-dark-secondary rounded-2xl p-6 mb-4 ${boxWidth} justify-between h-30`}>
      <Text className="text-dark-text text-lg font-medium mb-2">{title}</Text>
      <Text className="text-dark-text text-3xl font-bold">${value}</Text>
    </View>
  );
}
