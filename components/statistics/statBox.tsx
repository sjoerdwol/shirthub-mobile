import { Text, View } from 'react-native';

export default function StatBox({ currencyVisible, title, value, icon }: StatBoxProps) {
  return (
    <View className='bg-dark-background-250 rounded-2xl p-6 w-[48%] justify-between h-30'>
      <View className='flex-row items-center text-center mb-2'>
        <View>
          {icon}
        </View>
        <Text className="text-dark-text-400 text-base font-medium">{title}</Text>
      </View>
      <Text className="text-dark-text-400 text-2xl font-bold">
        {currencyVisible
          ? Number(value).toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 })
          : value}
      </Text>
    </View>
  );
}
