import { TextInput, TextInputProps, View } from "react-native";

export default function DetailsInput({ onChangeText, placeholder, value }: TextInputProps) {
  return (
    <View className="border-b border-solid border-b-dark-background-250 flex-1 justify-center pb-2.5 pt-4">
      <TextInput
        autoCapitalize="none"
        className="font-semibold text-lg w-full bg-dark-background-200 text-dark-text-400 rounded-xl p-4"
        onChangeText={onChangeText}
        placeholder={'Enter ' + placeholder}
        placeholderTextColor="#aeb3b8"
        value={value}
      />
    </View>
  );
}