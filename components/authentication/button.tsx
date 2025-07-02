import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export default function AuthButton({ children, onPress }: TouchableOpacityProps) {
  return (
    <TouchableOpacity className="w-full bg-dark-accent rounded-lg py-3 mb-4" onPress={onPress}>
      <Text className="text-center text-dark-text-400 text-lg font-bold">{children}</Text>
    </TouchableOpacity>
  );
}