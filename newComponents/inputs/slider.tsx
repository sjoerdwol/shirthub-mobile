import Slider from "@react-native-community/slider";
import { Text, View } from "react-native";

export default function CustomSlider({ label, maxValue, minValue, onValueChange, step, value }: { label: string, maxValue: number, minValue: number, onValueChange: (newValue: number) => void, step: number, value: number }) {
  return (
    <View className="gap-2">
      <View className="ml-1 flex-row items-center justify-between">
        <Text className="font-Lexend font-bold text-white/70">{label}</Text>
        <Text className="font-Lexend font-semibold text-white/50">{value}/{maxValue}</Text>
      </View>
      <Slider
        maximumTrackTintColor="#6F839F"
        maximumValue={maxValue}
        minimumTrackTintColor="rgb(15, 115, 255)"
        minimumValue={minValue}
        onValueChange={onValueChange}
        step={step}
        thumbTintColor="rgb(229 231 235)"
        value={value}
      />
    </View>
  );
}