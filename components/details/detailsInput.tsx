import { Text, TextInput, TextInputProps, View } from "react-native";

export default function DetailsInput(
  { errorMessage, isValid, keyboardType, maxLength, onChangeText, placeholder, title, value }:
    TextInputProps & { errorMessage: string, isValid: boolean, title: string }) {
  return (
    <View className="border-b border-solid border-b-dark-background-250 flex-1 gap-1.5 py-4">
      <Text className="text-dark-text-500">{title}</Text>
      <View className="flex-row items-center justify-center">
        <TextInput
          autoCapitalize="none"
          className="flex-1 font-semibold text-dark-text-400 text-lg"
          keyboardType={keyboardType}
          maxLength={maxLength}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#aeb3b8"
          value={value}
        />
      </View>
      {!isValid && (
        <Text className='font-medium mt-2 text-lg text-red-500'>{errorMessage}</Text>
      )}
    </View>
  );
}