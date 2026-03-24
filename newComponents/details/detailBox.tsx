import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function DetailBox({ icon, tag, value }: { icon: React.ComponentProps<typeof Ionicons>["name"] | React.ComponentProps<typeof FontAwesome6>["name"], tag: string, value: string }) {
  return (
    <View className="w-[30%] items-center p-4 rounded-xl border border-fadedCopper/20">
      {
        icon === "ruler-horizontal" || icon === "hashtag" || icon === "money-bill"
          ? <FontAwesome6 className="mb-2" name={icon} size={24} color='#606C38' />
          : <Ionicons className="mb-2" name={icon} size={24} color='#606C38' />
      }
      <Text className="font-Lexend font-semibold text-sm text-ashBrown/70 uppercase">{tag}</Text>
      <Text className="font-Lexend font-bold text-base text-ashBrown">{value}</Text>
    </View>
  );
}