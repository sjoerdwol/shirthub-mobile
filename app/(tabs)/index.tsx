import StatBox from "@/components/home/statBox";
import ShirtCard from "@/components/ui/shirtCard";
import { useAuth } from "@/contexts/authContext";
import { getShirts } from "@/services/shirthub_backend";
import { useShirtStore } from "@/stores/shirtStore";
import convertShirtResponse from "@/utils/convertShirtResponse";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function Index() {
  const { session } = useAuth();
  const shirts = useShirtStore((state) => state.shirts);
  const setShirts = useShirtStore((state) => state.setShirts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShirts = async () => {
      try {
        setLoading(true);
        // Session has to be defined otherwise index would not be displayed in the first place
        const shirtResponses: ShirtResponse[] = await getShirts(session!);
        const convertedShirts = convertShirtResponse(shirtResponses);
        setShirts(convertedShirts);
      } catch (error) {
        console.error('Failed to fetch shirts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShirts();
  }, [session, setShirts]);

  return (
    <>
      {
        loading ?
          (
            <View className="flex-1 bg-dark-background-400 justify-center items-center" >
              <Text className="text-dark-text-400">Loading...</Text>
            </View>
          ) : (<View className="flex-1 bg-dark-background-400">
            <View className="h-12 bg-dark-accent">
              {/* TODO: HEADER IMAGE */}
            </View>
            <View className="p-4">
              <View>
                <View className="flex-row justify-between">
                  <StatBox title="Total Value" value={1500} />
                  <StatBox title="Total Shirts" value={shirts.length} />
                </View>
                <StatBox title="Average Value per Shirt" value={shirts.length > 0 ? 150 : 0} size="large" />
              </View>
              <View>
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
                />
              </View>
            </View>
          </View>)
      }
    </>
  );
}
