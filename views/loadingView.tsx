import { Text } from "react-native";
import Animated, { FadeOut } from "react-native-reanimated";

export default function LoadingView() {
  return (
    <Animated.View
      className="flex-1 justify-center items-center"
      exiting={FadeOut.duration(500)}
    >
      <Text className="text-ashBrown font-Lexend">Lade ...</Text>
    </Animated.View>
  );
}