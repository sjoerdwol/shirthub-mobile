import IconButton from "@/components/buttons/iconButton";
import DetailBox from "@/components/details/detailBox";
import ShirtImage from "@/components/ui/shirtImage";
import convertSize from "@/utils/convertSize";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Text, View } from "react-native";

export default function ShirtDetailView({ handleDelete, handleEdit, shirt, likeCount = 0, likers = [] }: { handleDelete: () => void, handleEdit: () => void, shirt: Shirt, likeCount?: number, likers?: Liker[] }) {
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
        <Text className="font-LexendMedium text-base text-white/70 ml-4">
          {
            likeCount === 0
              ? 'Noch keine Likes'
              : likers.length > 0
                ? <>Geliked von <Text className="font-bold">{likers[0].username}</Text>{likeCount > 1 ? ` und ${likeCount - 1} ${likeCount - 1 === 1 ? 'Anderem' : 'Anderen'}` : ''}</>
                : `${likeCount} Likes`
          }
        </Text>
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
        {shirt.print_name && <DetailBox
          icon="person"
          tag="Name"
          value={shirt.print_name}
        />}
        {shirt.print_number && <DetailBox
          icon="hashtag"
          tag="Nummer"
          value={shirt.print_number.toString()}
        />}
        {shirt.condition && <DetailBox
          icon="star"
          tag="Zustand"
          value={`${String(shirt.condition)}/10`}
        />}
      </View>
      <View className="flex-row gap-3 justify-end px-2 py-3">
        <IconButton icon="share-nodes" onPress={() => { }} />
        <IconButton icon="pencil" onPress={handleEdit} />
        <IconButton deleteButton icon="trash-can" onPress={handleDelete} />
      </View>
    </View>
  );
}