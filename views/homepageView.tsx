import Notification from "@/components/notifications/notification";
import Animated, { FadeIn } from "react-native-reanimated";

export default function HomepageView() {
  return (
    <Animated.View
      className="flex-1 flex-col gap-4 px-4"
      entering={FadeIn.duration(500)}
    >
      <Notification />
      <Notification />
    </Animated.View>
  );
}