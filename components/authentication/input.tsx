import { TextInput, TextInputProps } from "react-native";

export default function AuthInput({ keyboardType, onChangeText, placeholder, secureTextEntry, value }: TextInputProps) {
  return (
    <TextInput
      autoCapitalize="none"
      className="w-full bg-dark-background-300 text-dark-text rounded-xl p-5 mb-4"
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#94b5e1"
      secureTextEntry={secureTextEntry}
      value={value}
    />
  );
}