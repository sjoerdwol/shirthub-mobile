import { MenuOverlayEntryProps } from "@/types/menuOverlayEntryProps";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

export default function MenuOverlayEntry({ color, iconName, size, onPress, text }: MenuOverlayEntryProps) {
  return (
    <Pressable
      className='flex-row items-center px-4 py-3 rounded-lg'
      onPress={onPress}
    >
      <Ionicons
        name={iconName}
        color={color}
        size={size}
        className='mr-3'
      />
      <Text className='text-base' style={{ color }}>{text}</Text>
    </Pressable>
  );
}