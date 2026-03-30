import { InputProps } from "@/types/inputProps";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

export default function SingleIconInput({ firstIcon, keyboardType, onChangeText, placeholder, value }: InputProps) {
  return (
    <View className="relative">
      <Ionicons className="absolute left-4 top-1/2 -translate-y-1/2 z-50" name={firstIcon} color='rgb(141 157 180)' size={16} />
      <TextInput
        className="w-full rounded-xl bg-dark-secondaryBackground h-14 pl-12 placeholder:text-dark-placeholder text-white/70 text-base font-Lexend"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
}