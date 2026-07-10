import DetailBox from "@/components/details/detailBox";
import ShirtImage from "@/components/ui/shirtImage";
import convertSize from "@/utils/convertSize";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Text, View } from "react-native";

export default function OtherUserShirtDetailView({ shirt }: { shirt: FriendShirtDetail }) {
  return (
    <View className="flex-1 p-4 mt-2">
      <ShirtImage
        imageSrc={require('../assets/images/exampleshirt.png')}
        type="detailAndManage"
      />
      <View className="px-2 py-6">
        <Text className="text-white/80 text-3xl font-LexendBold">{shirt.team}</Text>
        <Text className="text-white/70 text-lg font-LexendMedium">{shirt.season} • {shirt.type} Jersey</Text>
      </View>
      <View className="flex-row items-center py-4 px-6 mx-2 rounded-lg border border-dark-border">
        <Ionicons name="heart" color='rgb(141, 157, 180)' size={24} />
        <Text className="font-LexendMedium text-base text-white/70 ml-4">{shirt.likeCount} {shirt.likeCount === 1 ? 'Like' : 'Likes'}</Text>
      </View>
      <View className="flex-row flex-wrap items-center justify-start px-4 my-6 gap-x-[5%] gap-y-2">
        {shirt.value && <DetailBox
          icon="money-bill"
          tag="Wert"
          value={shirt.value.toString() + '€'}
        />}
        {shirt.size && <DetailBox
          icon="ruler-horizontal"
          tag="Größe"
          value={convertSize(shirt.size)}
        />}
        {shirt.printName && <DetailBox
          icon="person"
          tag="Name"
          value={shirt.printName}
        />}
        {shirt.printNumber && <DetailBox
          icon="hashtag"
          tag="Nummer"
          value={shirt.printNumber.toString()}
        />}
        {shirt.condition && <DetailBox
          icon="star"
          tag="Zustand"
          value={`${String(shirt.condition)}/10`}
        />}
      </View>
    </View>
  );
}
