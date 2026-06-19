import ShirtImage from '@/components/ui/shirtImage';
import Ionicons from "@react-native-vector-icons/ionicons";
import { Text, View } from "react-native";

export default function Notification() {
  return (
    <View className="rounded-xl p-4 shadow-sm border border-dark-border">
      <View className="flex-row items-start gap-3">
        <ShirtImage
          imageSrc={require('../../assets/images/exampleavatar.png')}
          type='avatar'
        />
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-bold font-Lexend text-white/80">Lukas</Text>
            <Text className="text-[10px] uppercase tracking-wider text-white/50 font-medium font-Lexend">Vor 2 min.</Text>
          </View>
          <Text className="text-base text-white/70 mt-1 font-Lexend">hat ein <Text className="font-bold font-Lexend text-dark-highlight">2006 Germany Home Jersey</Text> zu seiner Sammlung hinzugefügt.</Text>
          <ShirtImage
            imageSrc={require('../../assets/images/exampleshirt.png')}
            type='notification'
          />
        </View>
      </View>
      <View className="mt-3 flex-row items-center gap-5 pt-3 border-t border-dark-border">
        <View className='flex-row items-center justify-center gap-1'>
          <Ionicons name='heart-outline' size={18} color="rgb(141, 157, 180)" />
          <Text className='text-sm text-white/50 font-Lexend'>12</Text>
        </View>
        <View className='flex-row items-center gap-1 justify-center'>
          <Ionicons name='chatbox-outline' size={18} color="rgb(141, 157, 180)" />
          <Text className='text-sm text-white/50 font-Lexend'>3</Text>
        </View>
      </View>
    </View>
  );
}