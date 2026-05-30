import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function CustomToggle({ label, value, onValueChange, description }: { label: string, value: boolean, onValueChange: (value: boolean) => void, description?: string }) {

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(value ? 24 : 0, { duration: 150 }) }]
  }));

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-1 pr-4">
        <Text className="font-Lexend font-bold text-white/70 ml-1">{label}</Text>
        {description && (
          <Text className="font-Lexend text-sm text-white/50 ml-1 mt-1">{description}</Text>
        )}
      </View>
      <Pressable
        className={`w-14 h-8 rounded-full justify-center px-1 ${value ? 'bg-dark-highlight' : 'bg-dark-secondaryBackground'}`}
        onPress={() => onValueChange(!value)}
        testID="custom_toggle"
      >
        <Animated.View className="w-6 h-6 rounded-full bg-white" style={thumbStyle} />
      </Pressable>
    </View>
  );
}
