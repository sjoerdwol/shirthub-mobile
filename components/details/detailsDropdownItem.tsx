import { Text, TouchableOpacity } from "react-native";

export default function DetailsDropdownItem(
  { isActive, option, onSelection }: { isActive: boolean, option: string, onSelection: (option: string) => void }) {

  return (
    <TouchableOpacity
      onPress={() => onSelection(option)}
      className={`py-2 px-2 rounded-lg mb-2 ${isActive ? 'bg-dark-background-300' : 'bg-transparent'}`}
    >
      <Text className={`text-lg ${isActive ? 'text-dark-text-400 font-semibold' : 'text-dark-text-400'}`}>
        {option}
      </Text>
    </TouchableOpacity>
  );
}