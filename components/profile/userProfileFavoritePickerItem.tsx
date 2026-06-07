import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function UserProfileFavoritePickerItem({ isLast, loading, onPress, shirt }: { isLast: boolean, loading: boolean, onPress: (shirtId: string) => void, shirt: Shirt }) {
  return (
    <Pressable
      key={shirt.id}
      className={isLast ? "flex-row items-center justify-between mx-2 py-3" : "flex-row items-center justify-between mx-2 py-3 border-b border-dark-border"}
      disabled={loading}
      onPress={() => onPress(shirt.id)}
      testID={`favorite_option_${shirt.id}`}
    >
      <View className="flex-1">
        <Text className="font-bold text-base text-white/70 font-Lexend">{shirt.team}</Text>
        <Text className="text-sm font-medium text-white/50 font-Lexend">{shirt.season} • {shirt.type}</Text>
      </View>
      <Ionicons
        name={shirt.is_favorite ? 'star' : 'star-outline'}
        color={shirt.is_favorite ? 'rgb(15, 115, 255)' : 'rgb(141, 157, 180)'}
        size={22}
      />
    </Pressable>
  );
}