import { InputProps } from "@/types/inputProps";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Text, TextInput, View } from "react-native";

export default function SingleIconInputWithLabel(
  { errorMessage, firstIcon, isValid, keyboardType, label, maxLength, onChangeText, placeholder, value }:
    InputProps & { errorMessage: string, isValid: boolean, maxLength?: number, label: string }) {
  return (
    <View className="flex-1 gap-2">
      <Text className="font-Lexend font-bold text-white/70 ml-1">{label}</Text>
      <View className="relative">
        {
          firstIcon === "hashtag"
            ? <FontAwesome6 className="absolute left-4 top-1/2 -translate-y-1/2 z-50" name={firstIcon} size={16} color='rgb(141 157 180)' />
            : <Ionicons className="absolute left-4 top-1/2 -translate-y-1/2 z-50" name={firstIcon} size={16} color='rgb(141 157 180)' />
        }
        <TextInput
          className="w-full rounded-xl bg-dark-secondaryBackground h-14 pl-12 placeholder:text-dark-placeholder text-white/70 text-base font-Lexend"
          keyboardType={keyboardType}
          maxLength={maxLength}
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
        />
      </View>

      {!isValid && (
        <Text className='font-Lexendfont-medium ml-1 text-lg text-red-500'>{errorMessage}</Text>
      )}
    </View>
  );
}