import { ActivityIndicator, Pressable, Text } from "react-native";

export default function PrimaryButton({ loading, onPress, text }: { loading: boolean, onPress: () => void, text: string }) {
  return (
    <Pressable
      className="w-full items-center justify-center rounded-xl h-14 bg-dark-highlight active:scale-98 transition-transform"
      disabled={loading}
      onPress={onPress}
    >
      {
        loading
          ? <ActivityIndicator color="#fff" size="small" />
          : <Text className="font-bold font-Lexend text-xl text-white">{text}</Text>
      }
    </Pressable>
  );
}