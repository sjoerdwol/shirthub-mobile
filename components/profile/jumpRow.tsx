import Ionicons from "@react-native-vector-icons/ionicons";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

// A tappable row that jumps to one of a user's detail sub-pages.
export default function JumpRow({ icon, label, onPress, testID }: { icon: ReactNode, label: string, onPress: () => void, testID?: string }) {
  return (
    <Pressable
      className="border border-dark-border flex-row items-center justify-between p-4 rounded-2xl active:scale-98 transition-transform"
      onPress={onPress}
      testID={testID}
    >
      <View className="flex-row items-center gap-3">
        {icon}
        <Text className="font-LexendSemiBold text-lg text-white/80">{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color='rgb(141, 157, 180)' />
    </Pressable>
  );
}
