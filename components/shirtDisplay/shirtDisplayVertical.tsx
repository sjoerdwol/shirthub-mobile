import ShirtImage from "@/components/ui/shirtImage";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router, type Href } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ShirtDisplayVertical({ shirt, friendOwnerId }: { shirt: Shirt, friendOwnerId?: string }) {
  // A friend's shirt opens the friend-facing detail view; the user's own shirt
  // opens the owner detail view. Both routes share the same visibility gate.
  const target: Href = friendOwnerId ? `/users/${friendOwnerId}/shirts/${shirt.id}` : `/shirts/${shirt.id}`;

  return (
    <Pressable
      className="active:scale-98 transition-transform"
      onPress={() => router.navigate(target)}
    >
      <View className="rounded-2xl p-4 gap-5 flex-row shadow-sm border border-dark-border">
        <ShirtImage
          imageSrc={require('../../assets/images/exampleshirt.png')}
          type="displayVertical"
        />
        <View className="flex-1 justify-between py-0.5">
          <View>
            <View className="flex-row items-center justify-between">
              <Text className="text-lg text-white/80 leading-tight font-LexendBold">{shirt.team}</Text>
              {
                shirt.is_favorite &&
                <Ionicons name="star" color='rgb(15, 115, 255)' size={18} testID="favorite_star" />
              }
            </View>
            <Text className="text-base text-white/70 font-LexendMedium">{shirt.season} • {shirt.type}</Text>
          </View>
          <View className="flex-row items-center justify-end">
            {
              shirt.size &&
              <Text className="text-xs font-LexendBold bg-dark-highlight text-white px-2.5 py-1 rounded-lg uppercase">Size {shirt.size}</Text>
            }
          </View>
        </View>
      </View>
    </Pressable>
  );
}