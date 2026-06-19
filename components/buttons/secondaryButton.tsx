import { ActivityIndicator, Pressable, Text } from "react-native";

export default function SecondaryButton({ loading, onPress, text }: { loading: boolean, onPress: () => void, text: string }) {
  return (
    <Pressable
      className="w-full items-center justify-center rounded-xl h-14 bg-dark-secondaryBackground active:scale-98 transition-transform"
      disabled={loading}
      onPress={onPress}
      testID="secondary_button"
    >
      {
        loading
          ? <ActivityIndicator color="#fff" size="small" />
          : <Text className="font-LexendBold text-xl text-white">{text}</Text>
      }
    </Pressable>
  );
}