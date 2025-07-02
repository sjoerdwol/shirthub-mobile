import { TextInput, TextInputProps } from "react-native";

export default function AuthInput({ keyboardType, onChangeText, placeholder, secureTextEntry, value }: TextInputProps) {
  return (
    <TextInput
      autoCapitalize="none"
      className="w-full bg-dark-background-200 text-dark-text-400 rounded-xl p-5 mb-4"
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#aeb3b8"
      secureTextEntry={secureTextEntry}
      value={value}
    />
  );
}