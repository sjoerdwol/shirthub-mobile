import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Text, View } from "react-native";

export default function DetailBox({ icon, tag, value }: { icon: React.ComponentProps<typeof Ionicons>["name"] | Extract<React.ComponentProps<typeof FontAwesome6>, { iconStyle: "solid" }>["name"], tag: string, value: string }) {
  return (
    <View className="w-[30%] items-center p-4 rounded-xl border border-dark-border">
      {
        icon === "ruler-horizontal" || icon === "hashtag" || icon === "money-bill"
          ? <FontAwesome6 iconStyle="solid" className="mb-2" name={icon} size={24} color='rgb(141, 157, 180)' />
          : <Ionicons className="mb-2" name={icon as React.ComponentProps<typeof Ionicons>["name"]} size={24} color='rgb(141, 157, 180)' />
      }
      <Text className="font-Lexend font-semibold text-sm text-white/50 uppercase" testID="detail_box_tag">{tag}</Text>
      <Text className="font-Lexend font-bold text-base text-white/80" testID="detail_box_value">{value}</Text>
    </View>
  );
}