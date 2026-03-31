import SingleIconInputWithButton from "@/newComponents/inputs/singleIconInputWithButton";
import { Ionicons } from "@expo/vector-icons";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import DropdownItem from "./dropdownItem";

export default function DropdownModal({ handleSelect, isVisible, options, query, setIsVisible, setQuery, title, value }:
  { handleSelect: (param: string) => void, isVisible: boolean, options: string[], query: string, setIsVisible: (param: boolean) => void, setQuery: (param: string) => void, title: string, value: string }) {

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsVisible(false)}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-dark-background rounded-t-3xl h-[65%] pb-16">
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-dark-background">
            <Text className="text-white/70 text-lg font-bold">{title}</Text>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Ionicons name="close" size={24} color="rgb(141, 157, 180)" />
            </TouchableOpacity>
          </View>

          <View className="px-5 w-full">
            <SingleIconInputWithButton
              firstIcon="search"
              keyboardType="default"
              onChangeText={setQuery}
              placeholder="Suche nach einem Team ..."
              secondIcon={query.length > 0 ? 'close-circle' : null}
              setButtonState={() => setQuery('')}
              value={query}
            />
          </View>

          <ScrollView className="p-6 pt-4 pb-16">
            {options.length === 0 ? (
              <Text className="font-Lexend text-white/70">Keine Ergebnisse ...</Text>
            ) : (
              options.map((option) => (
                <DropdownItem
                  key={option}
                  option={option}
                  onSelection={handleSelect}
                  isActive={value === option}
                />
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}