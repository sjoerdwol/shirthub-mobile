import ShirtCard from "@/components/ui/shirtCard";
import { useShirtStore } from "@/stores/shirtStore";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";

export default function Collection() {
  const router = useRouter();
  const shirts = useShirtStore((state) => state.shirts);

  return (
    <View className="flex-1 bg-dark-background-400 p-4 items-center">
      <FlatList
        data={shirts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <ShirtCard
            imageSize='large'
            shirt={item}
          />
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{ gap: 20 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
