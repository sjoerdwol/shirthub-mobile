import Ionicons from "@react-native-vector-icons/ionicons";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import UserProfileFavoritePickerItem from "./userProfileFavoritePickerItem";

export default function UserProfileFavoritePickerModal({ handleSelect, isVisible, loading, setIsVisible, shirts }: { handleSelect: (shirtId: string) => void, isVisible: boolean, loading: boolean, setIsVisible: (isVisible: boolean) => void, shirts: Shirt[] }) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <View className="flex-1 bg-black/70 justify-center px-6">
        <View className="bg-dark-background rounded-2xl border border-dark-border p-6 max-h-[70%]">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white/80 text-xl font-bold font-Lexend">Lieblingstrikot wählen</Text>
            <Pressable onPress={() => setIsVisible(false)} testID="favorite_modal_close">
              <Ionicons name="close" color='rgb(141, 157, 180)' size={24} />
            </Pressable>
          </View>
          {
            shirts.length === 0
              ? <Text className="text-white/70 font-Lexend py-4">Du hast noch keine Trikots in deiner Sammlung.</Text>
              : (
                <ScrollView>
                  {shirts.map((shirt, index) => (
                    <UserProfileFavoritePickerItem
                      key={shirt.id}
                      isLast={index === shirts.length - 1}
                      loading={loading}
                      onPress={handleSelect}
                      shirt={shirt}
                    />
                  ))}
                </ScrollView>
              )
          }
        </View>
      </View>
    </Modal>
  );
}