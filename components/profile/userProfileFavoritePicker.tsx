import { useAuth } from "@/contexts/authContext";
import { useShirtStore } from "@/stores/shirtStore";
import { handleDeleteFavorite, handleSetFavorite } from "@/utils/handleShirtOperations";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import UserFavoriteDisplay from "../shirtDisplay/userFavoriteDisplay";
import UserProfileFavoritePickerModal from "./userProfileFavoritePickerModal";

export default function UserProfileFavoritePicker() {
  const { session } = useAuth();
  const { shirts, updateShirt } = useShirtStore((state) => state);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const favorite = shirts.find((shirt) => shirt.is_favorite);

  const handleSelect = async (shirtId: string) => {
    if (!session || loading) { return; }
    setLoading(true);
    await handleSetFavorite(session, shirtId, favorite?.id ?? null, updateShirt);
    setLoading(false);
    setModalVisible(false);
  };

  const handleDelete = async (shirtId: string) => {
    if (!session || loading) { return; }
    setLoading(true);
    await handleDeleteFavorite(session, shirtId, updateShirt);
    setLoading(false);
  }

  return (
    <View className="rounded-xl p-6 shadow-sm border border-dark-border">
      <Text className="text-white/80 text-2xl font-bold font-Lexend mb-6">Mein Lieblingstrikot</Text>
      {
        favorite
          ? (
            <View className="relative aspect-video rounded-lg overflow-hidden items-center justify-center">
              <UserFavoriteDisplay favorite={favorite} onDelete={handleDelete} onEdit={setModalVisible} />
            </View>
          )
          : (
            <Pressable
              className="relative aspect-video rounded-lg overflow-hidden items-center justify-center border-2 border-dashed border-dark-border active:border-dark-highlight transition-allr"
              onPress={() => setModalVisible(true)}
              testID="favorite_picker_trigger"
            >
              <View className="bg-dark-highlight size-14 rounded-full shadow-lg items-center justify-center">
                <Ionicons name="add" color='#FFF' size={30} />
              </View>
              <Text className="text-white/70 text-sm tracking-r font-semibold font-Lexend mt-3">Trikot hinzufügen</Text>
            </Pressable>
          )
      }

      <UserProfileFavoritePickerModal handleSelect={handleSelect} isVisible={modalVisible} loading={loading} setIsVisible={setModalVisible} shirts={shirts} />
    </View >
  );
}
