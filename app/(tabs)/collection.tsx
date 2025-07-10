import ShirtCard from "@/components/ui/shirtCard";
import { FlatList, View } from "react-native";

const testdata = [
  {
    imageSrc: '../../assets/images/exampleshirt.png',
    team: 'Arsenal',
    season: '2022/2023',
    type: 'Home'
  },
  {
    imageSrc: '../../assets/images/exampleshirt.png',
    team: 'Arsenal',
    season: '2022/2023',
    type: 'Home'
  },
  {
    imageSrc: '../../assets/images/exampleshirt.png',
    team: 'Arsenal',
    season: '2022/2023',
    type: 'Home'
  },
  {
    imageSrc: '../../assets/images/exampleshirt.png',
    team: 'Arsenal',
    season: '2022/2023',
    type: 'Home'
  }
]

export default function Collection() {
  return (
    <View className="flex-1 bg-dark-background-400 p-4 items-center">
      <FlatList
        data={testdata}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <ShirtCard
            imageSrc={require('../../assets/images/exampleshirt.png')}
            team={item.team}
            season={item.season}
            type={item.type}
            size="large"
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
