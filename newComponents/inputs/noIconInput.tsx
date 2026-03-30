import { InputProps } from "@/types/inputProps";
import { TextInput } from "react-native";

export default function NoIconInput({ keyboardType, onChangeText, placeholder, value }: InputProps) {
  return (
    <TextInput
      className="w-full rounded-xl bg-dark-secondaryBackground h-14 pl-12 placeholder:text-dark-placeholder text-white/70 text-base font-Lexend"
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      placeholder={placeholder}
      value={value}
    />
  );
}