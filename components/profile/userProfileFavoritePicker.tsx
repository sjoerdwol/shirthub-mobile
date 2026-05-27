import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function UserProfileFavoritePicker() {
  return (
    <View className="rounded-xl p-6 shadow-sm border border-dark-border">
      <Text className="text-white/80 text-2xl font-bold font-Lexend mb-6">Mein Lieblingstrikot</Text>
      <View className="relative aspect-video rounded-lg overflow-hidden items-center justify-center border-2 border-dashed border-dark-border active:border-dark-highlight transition-allr">
        <View className="bg-dark-highlight size-14 rounded-full shadow-lg items-center justify-center">
          <Ionicons name="add" color='#FFF' size={30} />
        </View>
        <Text className="text-white/70 text-sm tracking-r font-semibold font-Lexend mt-3">Trikot hinzufügen</Text>
      </View>
    </View>
  );
}