import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DetailsDropdownItem from './detailsDropdownItem';

export default function DetailsDropdownSearch({ title, placeholder, value, onSelection, isValid, errorMessage, options }: DetailsDropdownProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [query, setQuery] = useState('');

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery.length === 0) return options;
    return options.filter((option) => option.toLowerCase().includes(normalizedQuery));
  }, [options, query]);

  const handleSelectOption = (option: string) => {
    onSelection(option);
    setIsModalVisible(false);
    setQuery('');
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
          <View className="bg-dark-background-200 rounded-t-3xl h-[65%] pb-16">
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-dark-background-250">
              <Text className="text-dark-text-400 text-lg font-bold">{title}</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)} testID='close_details_dropdown_search_modal'>
                <Ionicons name="close" size={24} color="#aeb3b8" />
              </TouchableOpacity>
            </View>

            <View className="px-6 pt-4">
              <View className="flex-row items-center bg-dark-background-250 rounded-xl px-4 py-3">
                <Ionicons name="search" size={18} color="#aeb3b8" />
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Search"
                  placeholderTextColor="#7a7f85"
                  className="flex-1 ml-2 text-dark-text-400"
                  autoCorrect={false}
                  autoCapitalize='none'
                />
                {query.length > 0 && (
                  <TouchableOpacity onPress={() => setQuery('')} accessibilityRole='button'>
                    <Ionicons name="close-circle" size={18} color="#aeb3b8" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <ScrollView className="p-6 pt-3 pb-16">
              {filteredOptions.length === 0 ? (
                <Text className="text-dark-text-500">No results</Text>
              ) : (
                filteredOptions.map((option) => (
                  <DetailsDropdownItem
                    key={option}
                    option={option}
                    onSelection={handleSelectOption}
                    isActive={value === option}
                  />
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}