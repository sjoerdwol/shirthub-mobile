import { Ionicons } from "@expo/vector-icons";
import { TextInputProps } from "react-native";

interface InputProps {
  buttonState?: any;
  firstIcon: React.ComponentProps<typeof Ionicons>["name"];
  keyboardType: TextInputProps['keyboardType'];
  onChangeText: TextInputProps['onChangeText'];
  placeholder: TextInputProps['placeholder'];
  secureTextEntry?: TextInputProps['secureTextEntry'];
  secondIcon?: React.ComponentProps<typeof Ionicons>["name"];
  setButtonState?: React.Dispatch<React.SetStateAction<any>>;
  value: TextInputProps['value'];
}