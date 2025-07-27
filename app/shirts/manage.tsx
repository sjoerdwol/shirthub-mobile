import AuthInput from '@/components/authentication/input';
import DetailsInput from '@/components/details/detailsInput';
import DetailsRow from '@/components/details/detailsRow';
import ShirtImage from '@/components/ui/shirtImage';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

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
    <View className="bg-dark-background-400 flex-1 p-4">
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
            <DetailsInput placeholder='Team' value={team} onChangeText={setTeam} />
            <DetailsInput placeholder='Season' value={season} onChangeText={setSeason} />
          </DetailsRow>
          <DetailsRow>
            <DetailsInput placeholder='Condition' value={condition} onChangeText={setCondition} />
            <DetailsInput placeholder='Type' value={type} onChangeText={setType} />
          </DetailsRow>
          <DetailsRow>
            <DetailsInput placeholder='Print Name' value={printName} onChangeText={setPrintName} />
            <DetailsInput placeholder='Print Number' value={printNumber} onChangeText={setPrintNumber} />
          </DetailsRow>
          <DetailsRow>
            <DetailsInput placeholder='Size' value={size} onChangeText={setSize} />
            <DetailsInput placeholder='Value' value={value} onChangeText={setValue} />
          </DetailsRow>
        </View>
      </View>
      <View className='px-1 mb-8'>
        <Button title={mode === 'edit' ? 'Save Changes' : 'Add Shirt'} onPress={() => { }} />
      </View>
    </View>
  );
}