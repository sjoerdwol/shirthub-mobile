import { InputProps } from "@/types/inputProps";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

export default function SingleIconInput({ firstIcon, keyboardType, onChangeText, placeholder, value }: InputProps) {
  return (
    <View className="relative">
      <Ionicons className="absolute left-4 top-1/2 -translate-y-1/2" name={firstIcon} color='#6C584C' size={16} />
      <TextInput
        className="w-full rounded-xl border border-ashBrown/20 bg-white/50 h-14 pl-12 placeholder:text-ashBrown/40 text-ashBrown text-base font-Lexend"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
}