import DetailsInput from '@/components/details/detailsInput';
import DetailsRow from '@/components/details/detailsRow';
import ShirtImage from '@/components/ui/shirtImage';
import formatInputWithSlash from '@/utils/formatInputWithSlash';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Button, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

export default function ManageShirt() {
  const { mode, shirt } = useLocalSearchParams();
  let shirtObj: Shirt | null = null;

  if (typeof shirt === 'string') {
    shirtObj = JSON.parse(shirt);
  } else if (Array.isArray(shirt) && shirt.length > 0) {
    shirtObj = JSON.parse(shirt[0]);
  }

  // Form state
  const [team, setTeam] = useState(shirtObj?.team || '');
  const [season, setSeason] = useState(shirtObj?.season || '');
  const [type, setType] = useState(shirtObj?.type || '');
  const [condition, setCondition] = useState(shirtObj?.condition || '');
  const [printName, setPrintName] = useState(shirtObj?.print_name || '');
  const [printNumber, setPrintNumber] = useState(shirtObj?.print_number ? String(shirtObj.print_number) : '');
  const [size, setSize] = useState(shirtObj?.size || '');
  const [value, setValue] = useState(shirtObj?.value ? String(shirtObj.value) : '');

  return (
    <KeyboardAvoidingView
      className="bg-dark-background-400 flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 55 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="p-4">
          <View className='bg-dark-background-200 mb-4 overflow-hidden h-64 w-full rounded-xl'>
            <ShirtImage
              imageSrc={require('../../assets/images/exampleshirt.png')}
              size='maxi'
            />
          </View>
          <View className='p-4'>
            <Text className='font-bold mb-4 text-dark-text-400 text-2xl'>{mode === 'edit' ? 'Edit Shirt' : 'Add Shirt'}</Text>
            <View className='px-1'>
              <DetailsRow>
                <DetailsInput title='Team' placeholder='Team' value={team} onChangeText={setTeam} />
                <DetailsInput title='Season' placeholder='Season' value={season} onChangeText={(newText) => setSeason(formatInputWithSlash(newText, season))} keyboardType='numeric' />
              </DetailsRow>
              <DetailsRow>
                <DetailsInput title='Condition' placeholder='Condition' value={condition} onChangeText={setCondition} />
                <DetailsInput title='Type' placeholder='Type' value={type} onChangeText={setType} />
              </DetailsRow>
              <DetailsRow>
                <DetailsInput title='Print Name' placeholder='Print Name' value={printName} onChangeText={setPrintName} />
                <DetailsInput title='Print Number' placeholder='Print Number' value={printNumber} onChangeText={setPrintNumber} keyboardType='numeric' />
              </DetailsRow>
              <DetailsRow>
                <DetailsInput title='Size' placeholder='Size' value={size} onChangeText={setSize} />
                <DetailsInput title='Value' placeholder='Value' value={value} onChangeText={setValue} keyboardType='numeric' />
              </DetailsRow>
            </View>
          </View>
          <View className='px-1 mb-8'>
            <Button title={mode === 'edit' ? 'Save Changes' : 'Add Shirt'} onPress={() => { }} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}