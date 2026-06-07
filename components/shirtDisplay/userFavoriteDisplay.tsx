import { Text, View } from "react-native";
import IconButton from "../buttons/iconButton";
import ShirtImage from "../ui/shirtImage";

export default function UserFavoriteDisplay({ favorite, onDelete, onEdit }: { favorite: Shirt, onDelete: (shirtId: string) => void, onEdit: (isVisible: boolean) => void }) {
  return (
    <View className="flex-row items-center gap-3 p-2">
      <ShirtImage
        imageSrc={require('../../assets/images/exampleshirt.png')}
        type="favorite"
      />
      <View className="flex-1 w-[50%] items-center">
        <Text className="font-bold text-lg text-white/80 leading-tight font-Lexend">{favorite.team}</Text>
        <Text className="text-base font-medium text-white/70 font-Lexend">{favorite.season} • {favorite.type}</Text>
        <View className="flex-row mt-6 gap-3">
          <IconButton
            icon="pencil"
            onPress={() => onEdit(true)}
          />
          <IconButton
            deleteButton
            icon="trash-can"
            onPress={() => onDelete(favorite.id)}
          />
        </View>
      </View>
    </View>
  );
}