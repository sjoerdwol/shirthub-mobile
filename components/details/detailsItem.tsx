import { Text, View } from "react-native";

export default function DetailsItem({ content, title }: { content: number | string | null, title: string }) {
  return (
    <View className="border-b border-solid border-b-dark-background-250 flex-1 gap-1.5 py-4">
      <Text className="text-dark-text-500">{title}</Text>
      <Text className="font-semibold text-dark-text-400 text-lg">{content ? content : 'not provided'}</Text>
    </View>
  );
}