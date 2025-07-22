import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

export default function HeaderIcon({ name, color, size, onPress }: React.ComponentProps<typeof Ionicons>) {
  return (
    <Pressable className="mr-4" onPress={onPress}>
      <Ionicons
        name={name}
        color={color}
        size={size}
      />
    </Pressable>
  );
}