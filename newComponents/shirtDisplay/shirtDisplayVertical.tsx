import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function ShirtDisplayVertical({ shirt }: { shirt: Shirt }) {
  return (
    <Pressable className="active:scale-98 transition-transform" onPress={() => router.navigate(`/shirts/${shirt.id}`)}>
      <View className="bg-cream rounded-2xl p-4 gap-5 flex-row shadow-sm border border-blackForest/15">
        <View className="w-24 h-24 rounded-xl overflow-hidden bg-mutedOlive/10">
          <Image
            source={require('../../assets/images/exampleshirt.png')}
            className="w-full h-full bg-cover bg-center"
          />
        </View>
        <View className="flex-1 justify-between py-0.5">
          <View>
            <Text className="font-bold text-lg text-ashBrown leading-tight font-Lexend">{shirt.team}</Text>
            <Text className="text-base font-medium text-ashBrown/70 font-Lexend">{shirt.season} • {shirt.type} Jersey</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-1">
              <Ionicons name="heart" color='rgb(108,88,76 / 0.6)' size={18} />
              <Text className="text-sm text-ashBrown/60 font-bold font-Lexend">128 Likes</Text>
            </View>
            {
              shirt.size &&
              <Text className="text-xs font-bold font-Lexend bg-mutedOlive/20 text-ashBrown px-2.5 py-1 rounded-lg uppercase">Size {shirt.size}</Text>
            }
          </View>
        </View>
      </View>
    </Pressable>
  );
}