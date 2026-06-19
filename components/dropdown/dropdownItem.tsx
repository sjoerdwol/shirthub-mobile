import { Text, TouchableOpacity } from "react-native";

export default function DropdownItem({ isActive, option, onSelection }: { isActive: boolean, option: string, onSelection: (option: string) => void }) {
  return (
    <TouchableOpacity
      onPress={() => onSelection(option)}
      className={`py-2 px-2 rounded-lg mb-2 ${isActive ? 'bg-dark-background' : 'bg-transparent'}`}
    >
      <Text className={`text-lg ${isActive ? 'text-white/70 font-LexendSemiBold' : 'text-white/40 font-Lexend'}`}>
        {option}
      </Text>
    </TouchableOpacity>
  );
}