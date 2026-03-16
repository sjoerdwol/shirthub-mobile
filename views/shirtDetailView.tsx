import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export default function ShirtDetailView({ shirt }: { shirt: Shirt }) {
  return (
    <View className="flex-1 p-4 mt-2">
      <View className="bg-ashBrown/50 overflow-hidden h-72 w-full rounded-xl">
        <Image
          source={require('../assets/images/exampleshirt.png')}
          className="w-full h-full object-cover"
        />
      </View>
      <View className="px-2 py-6">
        <Text className="text-ashBrown text-3xl font-bold font-Lexend">{shirt.team}</Text>
        <Text className="text-ashBrown/80 text-lg font-Lexend font-medium">{shirt.season} • {shirt.type} Jersey</Text>
      </View>
      <View className="flex-row items-center py-4 px-6 mx-2 bg-mutedOlive/20 rounded-lg">
        <Ionicons name="heart" color='rgb(108,88,76 / 0.6)' size={24} />
        <Text className="font-Lexend font-medium text-base text-ashBrown ml-4">Geliked von <Text className="font-bold">Jonas</Text> und 127 Anderen</Text>
      </View>
    </View>
  );
}