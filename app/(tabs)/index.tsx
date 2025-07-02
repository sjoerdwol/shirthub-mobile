import StatBox from "@/components/home/statBox";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-dark-background-400">
      <View className="h-12 bg-dark-accent">
        {/* TODO: HEADER IMAGE */}
      </View>
      <View className="p-5">
        <View>
          <View className="flex-row justify-between">
            <StatBox title="Total Value" value={1500} />
            <StatBox title="Total Shirts" value={10} />
          </View>
          <StatBox title="Average Value per Shirt" value={150} size="large" />
        </View>
        <View>
          <Text className="text-dark-text-400">Recently Added</Text>
        </View>
      </View>
    </View>
  );
}
