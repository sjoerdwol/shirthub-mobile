import { Ionicons } from '@expo/vector-icons';
import { Image, Text, View } from "react-native";

export default function Notification() {
  return (
    <View className="bg-white/85 rounded-xl p-4 shadow-sm border border-blackForest/15">
      <View className="flex-row items-start gap-3">
        <Image
          source={require('../../assets/images/exampleavatar.png')}
          className="h-12 w-12 rounded-full object-cover border-2 border-mutedOlive"
        />
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-bold font-Lexend text-ashBrown">Lukas</Text>
            <Text className="text-[10px] uppercase tracking-wider text-ashBrown/40 font-medium font-Lexend">2m ago</Text>
          </View>
          <Text className="text-base text-ashBrown/80 mt-1 font-Lexend">hat ein <Text className="font-bold font-Lexend text-oliveLeaf">2006 Germany Home Jersey</Text> zu seiner Sammlung hinzugefügt.</Text>
          <View className="mt-3 relative aspect-video overflow-hidden rounded-lg bg-vanillaCream">
            <Image
              source={require('../../assets/images/exampleshirt.png')}
              className="w-full h-full object-cover"
            />
          </View>
        </View>
      </View>
      <View className="mt-3 flex-row items-center gap-4 pt-3 border-t border-ashBrown/10">
        <View className='flex-row items-center justify-center gap-1'>
          <Ionicons name='heart' size={18} color="rgb(108,88,76 / 0.7)" />
          <Text className='text-sm text-ashBrown/70 font-Lexend'>12</Text>
        </View>
        <View className='flex-row items-center gap-1 justify-center'>
          <Ionicons name='chatbox' size={18} color="rgb(108,88,76 / 0.7)" />
          <Text className='text-sm text-ashBrown/70 font-Lexend'>3</Text>
        </View>
      </View>
    </View>
  );
}