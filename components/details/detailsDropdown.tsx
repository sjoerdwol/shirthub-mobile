import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import DetailsDropdownItem from './detailsDropdownItem';

export default function DetailsDropdown({ title, placeholder, value, onSelection, isValid, errorMessage, options }: DetailsDropdownProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectOption = (option: string) => {
    onSelection(option);
    setIsModalVisible(false);
  };

  return (
    <View className="border-b border-solid border-b-dark-background-250 flex-1 gap-1.5 py-4">
      <Text className="text-dark-text-500">{title}</Text>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="flex-row items-center justify-between"
      >
        <Text className={`flex-1 font-semibold text-lg ${value ? 'text-dark-text-400' : 'text-gray-400'}`}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#aeb3b8" />
      </TouchableOpacity>

      {!isValid && (
        <Text className='font-medium mt-2 text-lg text-red-500'>{errorMessage}</Text>
      )}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-dark-background-200 rounded-t-3xl max-h-96 pb-16">
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-dark-background-250">
              <Text className="text-dark-text-400 text-lg font-bold">{title}</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={24} color="#aeb3b8" />
              </TouchableOpacity>
            </View>
            <ScrollView className="p-6 pt-3 pb-16">
              {options.map((option) => (
                <DetailsDropdownItem
                  key={option}
                  option={option}
                  onSelection={handleSelectOption}
                  isActive={value === option}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
} 
