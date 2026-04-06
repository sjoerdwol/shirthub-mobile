import { Text, View } from 'react-native';

export default function StatBox({ currencyVisible, icon, subtitle, title, value }: StatBoxProps) {
  return (
    <View className='border border-dark-border flex-1 h-30 p-6 rounded-2xl'>
      <Text className="font-Lexend font-medium text-white/50 text-lg">{title}</Text>
      <Text className="font-Lexend font-bold mb-3 text-white/80 text-2xl">
        {currencyVisible
          ? Number(value).toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 })
          : value}
      </Text>
      {
        icon && subtitle &&
        <View className='flex-row items-center gap-2'>
          {icon}
          <Text className="font-Lexend font-medium text-white/50">{subtitle}</Text>
        </View>
      }
    </View>
  );
}
