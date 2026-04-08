import ShirtDisplayVertical from "@/components/shirtDisplay/shirtDisplayVertical";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Pressable } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function CollectionView({ shirts }: { shirts: Shirt[] }) {
  return (
    <Animated.View
      className="flex-1 px-4"
      entering={FadeIn.duration(500)}
    >
      <FlatList
        className="rounded-2xl"
        data={shirts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <ShirtDisplayVertical shirt={item} />
        )}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ gap: 14 }}
      />
      <Pressable
        className="absolute bg-dark-highlight size-14 rounded-2xl shadow-lg items-center justify-center active:scale-98 transition-transform right-4 -bottom-[66px]"
        onPress={() => router.navigate({ pathname: '/shirts/manage', params: { mode: 'add' } })}
      >
        <Ionicons name="add" color='#FFF' size={30} />
      </Pressable>
    </Animated.View>
  );
}