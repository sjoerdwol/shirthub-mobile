import Dropdown from "@/components/details/dropdown";
import { useAuth } from "@/contexts/authContext";
import { useShirtStore } from "@/stores/shirtStore";
import { useUserStatisticsStore } from "@/stores/statisticsStore";
import formatInputWithSlash from "@/utils/formatInputWithSlash";
import { handleShirtFormSubmit } from "@/utils/handleSubmits";
import { useForm } from "@tanstack/react-form";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import PrimaryButton from "../buttons/primaryButton";
import SingleIconInputWithLabel from "../inputs/singleIconInputWithLabel";
import CustomSlider from "../inputs/slider";

export default function ShirtManageForm({ data, mode, shirt }: { data: ReferenceData, mode: 'add' | 'edit', shirt: Shirt | null }) {
  const { session } = useAuth();
  const { addShirt, updateShirt } = useShirtStore((state) => state);
  const { setHasChanged } = useUserStatisticsStore((state) => state);
  const [loading, setLoading] = useState(false);

  const shirtForm = useForm({
    defaultValues: {
      team: shirt?.team || '',
      season: shirt?.season || '',
      type: shirt?.type || '',
      condition: shirt?.condition || 5,
      printName: shirt?.print_name || '',
      printNumber: shirt?.print_number ? String(shirt.print_number) : '',
      size: shirt?.size || '',
      value: shirt?.value ? String(shirt.value) : ''
    },
    onSubmit: async ({ value }) => {
      if (!data || !session) return; // Guard clause instead of early return
      setLoading(true);
      await handleShirtFormSubmit(addShirt, data, mode, session, setHasChanged, shirt, updateShirt, value);
      setLoading(false);
      router.back();
    }
  });

  return (
    <View className="px-2 py-8">
      <shirtForm.Field
        name='team'
        validators={{ onChange: ({ value }) => !value ? 'A team name is required!' : undefined }}
      >
        {(field) => (
          <Dropdown
            title='Club / Team Name'
            placeholder='Wähle ein Team'
            value={field.state.value}
            onSelection={field.handleChange}
            isValid={field.state.meta.isValid}
            errorMessage={field.state.meta.errors.join(', ')}
            options={data.teams.map((team) => team.name).sort()}
            withSearch
          />
        )}
      </shirtForm.Field>
      <View className="flex-row gap-3 mt-4">
        <shirtForm.Field
          name='season'
          validators={{ onChange: ({ value }) => !value ? 'A season is required!' : !(value.length >= 4) ? 'Season must atleast be 4 characters long' : undefined }}
        >
          {(field) => (
            <SingleIconInputWithLabel
              errorMessage={field.state.meta.errors.join(', ')}
              firstIcon='calendar'
              isValid={field.state.meta.isValid}
              keyboardType='numeric'
              label='Saison'
              maxLength={9}
              onChangeText={(newText) => field.handleChange(formatInputWithSlash(newText, field.state.value))}
              placeholder='2024 oder 2024/2025'
              value={field.state.value}
            />
          )}
        </shirtForm.Field>
        <shirtForm.Field
          name='value'
          validators={{ onChange: ({ value }) => !value ? undefined : !(parseFloat(value) > 0) ? 'Value must be positive' : !(parseFloat(value) <= 500) ? 'A value above 500 is not realistic' : undefined }}
        >
          {(field) => (
            <SingleIconInputWithLabel
              firstIcon='money-bill'
              label='Wert'
              placeholder='z. B. 69,99'
              value={field.state.value}
              onChangeText={field.handleChange}
              isValid={field.state.meta.isValid}
              errorMessage={field.state.meta.errors.join(', ')}
              keyboardType='numeric'

            />
          )}
        </shirtForm.Field>
      </View>
      <View className="flex-row gap-3 mt-5">
        <shirtForm.Field
          name='type'
          validators={{ onChange: ({ value }) => !value ? 'A type is required!' : undefined }}
        >
          {(field) => (
            <Dropdown
              title='Trikot Typ'
              placeholder='Wähle den Typ'
              value={field.state.value}
              onSelection={field.handleChange}
              isValid={field.state.meta.isValid}
              errorMessage={field.state.meta.errors.join(', ')}
              options={['Heim', 'Auswärts', 'Ausweich', 'Torwart', 'Sondertrikot']}
              withSearch={false}
            />
          )}
        </shirtForm.Field>
        <shirtForm.Field
          name='size'
        >
          {(field) => (
            <Dropdown
              errorMessage={field.state.meta.errors.join(', ')}
              isValid={field.state.meta.isValid}
              onSelection={field.handleChange}
              options={['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL']}
              placeholder='Wähle eine Größe'
              title='Größe'
              value={field.state.value}
              withSearch={false}
            />
          )}
        </shirtForm.Field>
      </View>
      <View className="flex-row gap-3 mt-5">
        <shirtForm.Field
          name='printName'
        >
          {(field) => (
            <SingleIconInputWithLabel
              errorMessage={field.state.meta.errors.join(', ')}
              firstIcon="person"
              isValid={field.state.meta.isValid}
              keyboardType="default"
              label='Flock Name'
              maxLength={30}
              onChangeText={field.handleChange}
              placeholder='z. B. Höler'
              value={field.state.value}
            />

          )}
        </shirtForm.Field>
        <shirtForm.Field
          name='printNumber'
          validators={{ onChange: ({ value }) => !value ? undefined : !(parseInt(value) > 0) ? 'Number must atleast be 1' : undefined }}
        >
          {(field) => (
            <SingleIconInputWithLabel
              errorMessage={field.state.meta.errors.join(', ')}
              firstIcon="hashtag"
              isValid={field.state.meta.isValid}
              keyboardType='numeric'
              label='Flock Nummer'
              maxLength={2}
              onChangeText={field.handleChange}
              placeholder='z. B. 9'
              value={field.state.value}
            />
          )}
        </shirtForm.Field>
      </View>
      <View className="mt-5 w-full">
        <shirtForm.Field
          name="condition">
          {(field) => {
            return (
              <CustomSlider
                maxValue={10}
                minValue={1}
                label="Zustand"
                onValueChange={(newValue) => field.handleChange(newValue)}
                step={1}
                value={field.state.value}
              />
            );
          }}
        </shirtForm.Field>
      </View>
      <View className="px-6 mt-6">
        <PrimaryButton
          loading={loading}
          onPress={shirtForm.handleSubmit}
          text={mode === 'add' ? 'Trikot hinzufügen' : 'Trikot bearbeiten'}
        />
      </View>
    </View>
  );
}