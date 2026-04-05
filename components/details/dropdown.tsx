import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DropdownModal from './dropdownModal';
import DropdownSearchModal from './dropdownSearchModal';

export default function Dropdown({ title, placeholder, value, onSelection, isValid, errorMessage, options, withSearch }: DropdownProps) {
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
    <View className="flex-1 gap-2">
      <Text className="font-Lexend font-bold text-white/70 ml-1">{title}</Text>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="flex-row items-center justify-between border border-dark-border p-3.5 rounded-xl"
      >
        <Text className={`flex-1 font-Lexend font-semibold text-lg ${value ? 'text-white/70' : 'text-dark-placeholder'}`}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="rgb(141, 157, 180)" />
      </TouchableOpacity>

      {!isValid && (
        <Text className='font-Lexend font-medium ml-1 text-lg text-red-500'>{errorMessage}</Text>
      )}

      {
        withSearch
          ? <DropdownSearchModal
            handleSelect={handleSelectOption}
            isVisible={isModalVisible}
            options={filteredOptions}
            query={query}
            setIsVisible={setIsModalVisible}
            setQuery={setQuery}
            title={title}
            value={value}
          />
          : <DropdownModal
            handleSelect={handleSelectOption}
            isVisible={isModalVisible}
            options={options}
            setIsVisible={setIsModalVisible}
            title={title}
            value={value}
          />
      }
    </View>
  );
}