import { Ionicons } from "@expo/vector-icons";
import { OpaqueColorValue } from "react-native";

export default function TabBarIcon({ name, color, size }: { name: any, color: string | OpaqueColorValue, size: number }) {
  return (
    <Ionicons
      name={name}
      color={color}
      size={size}
    />
  );
}
