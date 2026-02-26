import { Pressable, Text } from "react-native";

export default function PrimaryButton({ onPress, text }: { onPress: () => void, text: string }) {
  return (
    <Pressable
      className="w-full items-center justify-center rounded-xl h-14 bg-mutedOlive active:scale-98 transition-transform"
      onPress={onPress}
    >
      <Text className="font-bold font-Lexend text-xl text-white">{text}</Text>
    </Pressable>
  );
}