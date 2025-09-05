import StatBox from "@/components/home/statBox";
import ShirtCard from "@/components/ui/shirtCard";
import { useAuth } from "@/contexts/authContext";
import { useShirtStore } from "@/stores/shirtStore";
import { handleShirtInitialFetch } from "@/utils/handleShirtOperations";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function Index() {
  const { session } = useAuth();
  const { shirts, setShirts } = useShirtStore((state) => state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShirts = async () => {
      setLoading(true);
      await handleShirtInitialFetch(session!, setShirts);
      setLoading(false);
    };

    fetchShirts();
  }, [session, setShirts]);

  return (
    <>
      {
        loading ?
          (
            <View className="flex-1 bg-dark-background-400 justify-center items-center" testID="loading-container" >
              <Text className="text-dark-text-400">Loading...</Text>
            </View>
          ) : (<View className="flex-1 bg-dark-background-400" testID="main-container" >
            <View className="h-12 bg-dark-accent" testID="header-section" >
              {/* TODO: HEADER IMAGE */}
            </View>
            <View className="p-4">
              <View testID="stats-section">
                <View className="flex-row justify-between">
                  <StatBox title="Total Value" value={1500} />
                  <StatBox title="Total Shirts" value={shirts.length} />
                </View>
                <StatBox title="Average Value per Shirt" value={shirts.length > 0 ? 150 : 0} size="large" />
              </View>
              <View testID="recently-added-section">
                <Text className="font-bold text-xl my-5 text-dark-text-400">Recently Added</Text>
                <FlatList
                  data={shirts}
                  horizontal
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item }) => (
                    <ShirtCard
                      imageSize='small'
                      shirt={item}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingRight: 4, gap: 10 }}
                  testID="recently-added-flatlist"
                />
              </View>
            </View>
          </View>)
      }
    </>
  );
}
