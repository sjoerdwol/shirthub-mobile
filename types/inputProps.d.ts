import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import Ionicons from "@react-native-vector-icons/ionicons";
import { TextInputProps } from "react-native";

// The new @react-native-vector-icons FontAwesome6 component requires an iconStyle
// and types `name` per style. Only solid icons are used in this app.
type FontAwesome6SolidName = Extract<React.ComponentProps<typeof FontAwesome6>, { iconStyle: "solid" }>["name"];

interface InputProps {
  buttonState?: any;
  firstIcon: React.ComponentProps<typeof Ionicons>["name"] | FontAwesome6SolidName;
  keyboardType: TextInputProps['keyboardType'];
  onChangeText: TextInputProps['onChangeText'];
  placeholder: TextInputProps['placeholder'];
  secureTextEntry?: TextInputProps['secureTextEntry'];
  secondIcon?: React.ComponentProps<typeof Ionicons>["name"] | null;
  setButtonState?: React.Dispatch<React.SetStateAction<any>>;
  value: TextInputProps['value'];
}