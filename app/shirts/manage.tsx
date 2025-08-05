import AuthButton from '@/components/authentication/button';
import DetailsInput from '@/components/details/detailsInput';
import DetailsRow from '@/components/details/detailsRow';
import ShirtImage from '@/components/ui/shirtImage';
import { useShirtStore } from '@/stores/shirtStore';
import formatInputWithSlash from '@/utils/formatInputWithSlash';
import { useForm } from '@tanstack/react-form';
import { useLocalSearchParams } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

export default function ManageShirt() {
  const { mode, shirt } = useLocalSearchParams();
  let shirtObj: Shirt | null = null;
  const addShirt = useShirtStore((state) => state.addShirt);

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

      if (mode === 'add') addShirt(shirt)
      else return; // IMPLEMENT UPDATE
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
                    onChange: ({ value }) => !value ? 'A season is required!' : undefined
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
                      !value ? 'A type is required!' :
                        !['Home', 'Away', 'Third', 'Special'].includes(value) ? 'Must be Home, Away, Third or Special' : undefined
                  }}
                >
                  {(field) => (
                    <DetailsInput
                      title='Type'
                      placeholder='Home, Away etc.'
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      isValid={field.state.meta.isValid}
                      errorMessage={field.state.meta.errors.join(', ')}
                    />
                  )}
                </shirtForm.Field>
                <shirtForm.Field
                  name='condition'
                  validators={{}}
                >
                  {(field) => (
                    <DetailsInput
                      title='Condition'
                      placeholder='New, Used etc.'
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      isValid={field.state.meta.isValid}
                      errorMessage={field.state.meta.errors.join(', ')}
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
                    />

                  )}
                </shirtForm.Field>
                <shirtForm.Field
                  name='printNumber'
                  validators={{}}
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
                    <DetailsInput
                      title='Size'
                      placeholder='S, M, L etc.'
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      isValid={field.state.meta.isValid}
                      errorMessage={field.state.meta.errors.join(', ')}
                    />

                  )}
                </shirtForm.Field>
                <shirtForm.Field
                  name='value'
                  validators={{}}
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
