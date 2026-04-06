import { Text, View } from 'react-native';

export default function StatBox({ currencyVisible, title, value, icon }: StatBoxProps) {
  return (
    <View className='border border-dark-border flex-1 h-30 justify-between p-6 rounded-2xl'>
      <View className='flex-row items-center mb-1'>
        <View>
          {icon}
        </View>
        <Text className="font-Lexend font-medium text-white/50">{title}</Text>
      </View>
      <Text className="font-Lexend font-bold text-white/70 text-2xl">
        {currencyVisible
          ? Number(value).toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 })
          : value}
      </Text>
    </View>
  );
}
