import { InputProps } from "@/types/inputProps";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Text, TextInput, View } from "react-native";

export default function SingleIconInputWithLabel(
  { errorMessage, firstIcon, isValid, keyboardType, label, maxLength, onChangeText, placeholder, value }:
    InputProps & { errorMessage: string, isValid: boolean, maxLength?: number, label: string }) {
  return (
    <View className="flex-1 gap-2">
      <Text className="font-LexendBold text-white/70 ml-1">{label}</Text>
      <View className="relative">
        {
          firstIcon === "hashtag" || firstIcon === 'money-bill'
            ? <FontAwesome6 iconStyle="solid" className="absolute left-4 top-1/2 -translate-y-1/2 z-50" name={firstIcon} size={16} color='rgb(141 157 180)' />
            : <Ionicons className="absolute left-4 top-1/2 -translate-y-1/2 z-50" name={firstIcon as React.ComponentProps<typeof Ionicons>["name"]} size={16} color='rgb(141 157 180)' />
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
        <Text className='font-LexendMedium ml-1 text-lg text-red-500'>{errorMessage}</Text>
      )}
    </View>
  );
}