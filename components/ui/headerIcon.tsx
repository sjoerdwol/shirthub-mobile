import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

export default function HeaderIcon({ name, color, size, className, onPress }: React.ComponentProps<typeof Ionicons>) {
  return (
    <Pressable className={className} onPress={onPress}>
      <Ionicons
        name={name}
        color={color}
        size={size}
      />
    </Pressable>
  );
}