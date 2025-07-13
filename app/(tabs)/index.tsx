import StatBox from "@/components/home/statBox";
import ShirtCard from "@/components/ui/shirtCard";
import { useShirtStore } from "@/stores/shirtStore";
import { FlatList, Text, View } from "react-native";

export default function Index() {
  const shirts = useShirtStore((state) => state.shirts);

  return (
    <View className="flex-1 bg-dark-background-400">
      <View className="h-12 bg-dark-accent">
        {/* TODO: HEADER IMAGE */}
      </View>
      <View className="p-4">
        <View>
          <View className="flex-row justify-between">
            <StatBox title="Total Value" value={1500} />
            <StatBox title="Total Shirts" value={10} />
          </View>
          <StatBox title="Average Value per Shirt" value={150} size="large" />
        </View>
        <View>
          <Text className="font-bold text-xl my-5 text-dark-text-400">Recently Added</Text>
          <FlatList
            data={shirts}
            horizontal
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <ShirtCard
                imageSrc={require('../../assets/images/exampleshirt.png')}
                team={item.team}
                season={item.season}
                type={item.type}
                size="small"
              />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 4, gap: 12 }}
          />
        </View>
      </View>
    </View>
  );
}
