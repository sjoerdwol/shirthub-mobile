import ShirtDisplayVertical from "@/components/shirtDisplay/shirtDisplayVertical";
import { FlatList, Text } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function OtherUserCollectionView({ shirts, ownerId }: { shirts: Shirt[], ownerId: string }) {
  return (
    <Animated.View
      className="flex-1 p-4"
      entering={FadeIn.duration(500)}
    >
      <FlatList
        className="rounded-2xl"
        data={shirts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <ShirtDisplayVertical readOnly friendOwnerId={ownerId} shirt={item} />
        )}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ gap: 14 }}
        ListEmptyComponent={<Text className="text-white/70 font-Lexend text-center mt-8">Dieser Nutzer hat noch keine Trikots in seiner Sammlung.</Text>
        }
      />
    </Animated.View>
  );
}
