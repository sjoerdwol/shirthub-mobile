import IconButton from "@/newComponents/buttons/iconButton";
import DetailBox from "@/newComponents/details/detailBox";
import convertSize from "@/utils/convertSize";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export default function ShirtDetailView({ handleDelete, handleEdit, shirt }: { handleDelete: () => void, handleEdit: () => void, shirt: Shirt }) {
  return (
    <View className="flex-1 p-4 mt-2">
      <View className="bg-ashBrown/50 overflow-hidden h-72 w-full rounded-xl">
        <Image
          source={require('../assets/images/exampleshirt.png')}
          className="w-full h-full object-cover"
        />
      </View>
      <View className="px-2 py-6">
        <Text className="text-ashBrown text-3xl font-bold font-Lexend">{shirt.team}</Text>
        <Text className="text-ashBrown/80 text-lg font-Lexend font-medium">{shirt.season} • {shirt.type} Jersey</Text>
      </View>
      <View className="flex-row items-center py-4 px-6 mx-2 bg-mutedOlive/20 rounded-lg border border-ashBrown/5">
        <Ionicons name="heart" color='rgb(108,88,76 / 0.6)' size={24} />
        <Text className="font-Lexend font-medium text-base text-ashBrown ml-4">Geliked von <Text className="font-bold">Jonas</Text> und 127 Anderen</Text>
      </View>
      <View className="flex-row flex-wrap items-center justify-start px-4 my-6 gap-x-[5%] gap-y-2">
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
          value={shirt.condition}
        />}
        {shirt.value && <DetailBox
          icon="money-bill"
          tag="Wert"
          value={shirt.value.toString() + '€'}
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