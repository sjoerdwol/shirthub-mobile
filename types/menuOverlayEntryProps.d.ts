import { Ionicons } from "@expo/vector-icons";
type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

interface MenuOverlayEntryProps {
  color: string;
  iconName: IoniconsName;
  size: number;
  onPress: () => void;
  text: string;
}