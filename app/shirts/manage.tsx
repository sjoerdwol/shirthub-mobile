import AuthButton from '@/components/authentication/button';
import DetailsDropdown from '@/components/details/detailsDropdown';
import DetailsInput from '@/components/details/detailsInput';
import DetailsRow from '@/components/details/detailsRow';
import ShirtImage from '@/components/ui/shirtImage';
import { useShirtStore } from '@/stores/shirtStore';
import formatInputWithSlash from '@/utils/formatInputWithSlash';
import { useForm } from '@tanstack/react-form';
import { router, useLocalSearchParams } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

export default function ManageShirt() {
  const { mode, shirt } = useLocalSearchParams();
  let shirtObj: Shirt | null = null;
  const addShirt = useShirtStore((state) => state.addShirt);
  const updateShirt = useShirtStore((state) => state.updateShirt);

  if (typeof shirt === 'string') shirtObj = JSON.parse(shirt);
  else if (Array.isArray(shirt) && shirt.length > 0) shirtObj = JSON.parse(shirt[0]);

  const shirtForm = useForm({
    defaultValues: {
      team: shirtObj?.team || '',
      season: shirtObj?.season || '',
      type: shirtObj?.type || '',
      condition: shirtObj?.condition || '',
      printName: shirtObj?.print_name || '',
      printNumber: shirtObj?.print_number ? String(shirtObj.print_number) : '',
      size: shirtObj?.size || '',
      value: shirtObj?.value ? String(shirtObj.value) : ''
    },
    onSubmit: async ({ value }) => {
      if (mode === 'add') {
        const shirt: Shirt = {
          id: Math.floor((Math.random() * 1000)).toString(),
          team: value.team,
          season: value.season,
          type: value.type,
          condition: value.condition || null,
          print_name: value.printName || null,
          print_number: parseInt(value.printNumber) || null,
          size: value.size || null,
          value: parseFloat(value.value.replace(',', '.')) || null,
          imageSrc: '',
          created_at: new Date(),
          updated_at: new Date()
        }
        addShirt(shirt)
      } else if (mode === 'edit' && shirtObj) {
        const updatedShirt: Partial<Shirt> = {
          team: value.team,
          season: value.season,
          type: value.type,
          condition: value.condition || null,
          print_name: value.printName || null,
          print_number: parseInt(value.printNumber) || null,
          size: value.size || null,
          value: parseFloat(value.value.replace(',', '.')) || null,
        };
        updateShirt(shirtObj.id, updatedShirt);
      }

      router.back();
    }
  });

  return (
    <KeyboardAvoidingView
      className="bg-dark-background-400 flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode='interactive'
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
                <shirtForm.Field
                  name='team'
                  validators={{
                    onChange: ({ value }) => !value ? 'A team name is required!' : undefined
                  }}
                >
                  {(field) => (
                    <DetailsInput
                      title='Team'
                      placeholder='Real Madrid'
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      isValid={field.state.meta.isValid}
                      errorMessage={field.state.meta.errors.join(', ')}
                      maxLength={30}
                    />
                  )}
                </shirtForm.Field>
                <shirtForm.Field
                  name='season'
                  validators={{
                    onChange: ({ value }) => !value ? 'A season is required!' :
                      !(value.length >= 4) ? 'Season must atleast be 4 characters long' : undefined
                  }}
                >
                  {(field) => (
                    <DetailsInput
                      title='Season'
                      placeholder='2024 or 2024/2025'
                      value={field.state.value}
                      onChangeText={(newText) => field.handleChange(formatInputWithSlash(newText, field.state.value))}
                      isValid={field.state.meta.isValid}
                      errorMessage={field.state.meta.errors.join(', ')}
                      keyboardType='numeric'
                      maxLength={9}
                    />
                  )}
                </shirtForm.Field>
              </DetailsRow>
              <DetailsRow>
                <shirtForm.Field
                  name='type'
                  validators={{
                    onChange: ({ value }) =>
                      !value ? 'A type is required!' : undefined
                  }}
                >
                  {(field) => (
                    <DetailsDropdown
                      title='Type'
                      placeholder='Select a type'
                      value={field.state.value}
                      onSelection={field.handleChange}
                      isValid={field.state.meta.isValid}
                      errorMessage={field.state.meta.errors.join(', ')}
                      options={['Home', 'Away', 'Third', 'Special']}
                    />
                  )}
                </shirtForm.Field>
                <shirtForm.Field
                  name='condition'
                  validators={{}}
                >
                  {(field) => (
                    <DetailsDropdown
                      title='Condition'
                      placeholder='Select a condition'
                      value={field.state.value}
                      onSelection={field.handleChange}
                      isValid={field.state.meta.isValid}
                      errorMessage={field.state.meta.errors.join(', ')}
                      options={['Brand New', 'Like New', 'Used', 'Well Worn', 'Worn Out']}
                    />
                  )}
                </shirtForm.Field>
              </DetailsRow>
              <DetailsRow>
                <shirtForm.Field
                  name='printName'
                  validators={{}}
                >
                  {(field) => (
                    <DetailsInput
                      title='Print Name'
                      placeholder='e. g. Ronaldo'
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      isValid={field.state.meta.isValid}
                      errorMessage={field.state.meta.errors.join(', ')}
                      maxLength={30}
                    />

                  )}
                </shirtForm.Field>
                <shirtForm.Field
                  name='printNumber'
                  validators={{
                    onChange: ({ value }) => !value ? undefined :
                      !(parseInt(value) > 0) ? 'Number must atleast be 1' : undefined
                  }}
                >
                  {(field) => (
                    <DetailsInput
                      title='Print Number'
                      placeholder='e. g. 7'
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      isValid={field.state.meta.isValid}
                      errorMessage={field.state.meta.errors.join(', ')}
                      keyboardType='numeric'
                      maxLength={2}
                    />
                  )}
                </shirtForm.Field>
              </DetailsRow>
              <DetailsRow>
                <shirtForm.Field
                  name='size'
                  validators={{}}
                >
                  {(field) => (
                    <DetailsDropdown
                      title='Size'
                      placeholder='Select a size'
                      value={field.state.value}
                      onSelection={field.handleChange}
                      isValid={field.state.meta.isValid}
                      errorMessage={field.state.meta.errors.join(', ')}
                      options={['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL']}
                    />
                  )}
                </shirtForm.Field>
                <shirtForm.Field
                  name='value'
                  validators={{
                    onChange: ({ value }) => !value ? undefined :
                      !(parseFloat(value) > 0) ? 'Value must be positive' :
                        !(parseFloat(value) <= 500) ? 'A value above 500 is not realistic' : undefined
                  }}
                >
                  {(field) => (
                    <DetailsInput
                      title='Value'
                      placeholder='e. g. 69,99'
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      isValid={field.state.meta.isValid}
                      errorMessage={field.state.meta.errors.join(', ')}
                      keyboardType='numeric'
                    />
                  )}
                </shirtForm.Field>
              </DetailsRow>
            </View>
          </View>
          <View className='px-8 mb-10'>
            <AuthButton loading={false} onPress={shirtForm.handleSubmit} >
              <Text>{mode === 'edit' ? 'Save Changes' : 'Add Shirt'}</Text>
            </AuthButton>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
