import { Text } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function HomepageView() {
  return (
    <Animated.View
      className="flex-1"
      entering={FadeIn.duration(500)}
    >

    </Animated.View>
  );
}