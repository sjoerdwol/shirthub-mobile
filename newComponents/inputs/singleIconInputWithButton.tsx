import { InputProps } from "@/types/inputProps";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";

export default function SingleIconInputWithButton({ buttonState, firstIcon, keyboardType, onChangeText, placeholder, secureTextEntry, secondIcon, setButtonState, value }: InputProps) {
  return (
    <View className="relative w-full items-stretch">
      <Ionicons className="absolute left-4 top-1/2 -translate-y-1/2" name={firstIcon} color='#6C584C' size={16} />
      <TextInput
        className="w-full rounded-xl border border-ashBrown/20 bg-white/50 h-14 pl-12 placeholder:text-ashBrown/40 text-ashBrown text-base font-Lexend"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
      />
      {
        secondIcon && secondIcon && setButtonState &&
        <Pressable className="absolute right-4 top-1/2 items-center justify-center" onPress={() => setButtonState(!buttonState)}>
          <Ionicons className="-translate-y-1/2" name={secondIcon} size={20} color='rgb(108 88 76 / 0.4)' />
        </Pressable>
      }
    </View>
  );
}