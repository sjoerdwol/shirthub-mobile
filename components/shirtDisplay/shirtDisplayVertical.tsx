import ShirtImage from "@/components/ui/shirtImage";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router, type Href } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ShirtDisplayVertical({ shirt, readOnly = false, friendOwnerId }: { shirt: Shirt, readOnly?: boolean, friendOwnerId?: string }) {
  // A friend's shirt opens the friend-facing detail view; the user's own shirt
  // opens the owner detail view. Read-only cards without a friend owner are inert.
  const target: Href = friendOwnerId ? `/users/${friendOwnerId}/shirts/${shirt.id}` : `/shirts/${shirt.id}`;
  const disabled = readOnly && !friendOwnerId;

  return (
    <Pressable
      className={disabled ? "" : "active:scale-98 transition-transform"}
      disabled={disabled}
      onPress={disabled ? undefined : () => router.navigate(target)}
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
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-1">
              <Ionicons name="heart-outline" color='rgb(141, 157, 180)' size={18} />
              <Text className="text-sm text-white/50 font-LexendBold">128 Likes</Text>
            </View>
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