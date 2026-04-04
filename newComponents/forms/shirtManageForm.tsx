import Dropdown from "@/components/details/dropdown";
import { useAuth } from "@/contexts/authContext";
import { useShirtStore } from "@/stores/shirtStore";
import { useUserStatisticsStore } from "@/stores/statisticsStore";
import formatInputWithSlash from "@/utils/formatInputWithSlash";
import { handleShirtAddition, handleShirtUpdate } from "@/utils/handleShirtOperations";
import { useForm } from "@tanstack/react-form";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import SingleIconInputWithLabel from "../inputs/singleIconInputWithLabel";

export default function ShirtManageForm({ data, mode, shirt }: { data: ReferenceData, mode: 'add' | 'edit', shirt: Shirt | null }) {
  const { session } = useAuth();
  const { addShirt, updateShirt } = useShirtStore((state) => state);
  const { setHasChanged } = useUserStatisticsStore((state) => state);

  const shirtForm = useForm({
    defaultValues: {
      team: shirt?.team || '',
      season: shirt?.season || '',
      type: shirt?.type || '',
      condition: shirt?.condition || '',
      printName: shirt?.print_name || '',
      printNumber: shirt?.print_number ? String(shirt.print_number) : '',
      size: shirt?.size || '',
      value: shirt?.value ? String(shirt.value) : ''
    },
    onSubmit: async ({ value }) => {
      if (!data || !session) return; // Guard clause instead of early return

      const newShirt: Partial<Shirt> = {
        team: value.team,
        team_key: data.teams.find((team) => value.team === team.name)?.key || shirt?.team_key,
        league_key: data.teams.find((team) => value.team === team.name)?.leagueKey || shirt?.league_key,
        season: value.season,
        type: value.type,
        condition: value.condition || null,
        print_name: value.printName || null,
        print_number: parseInt(value.printNumber) || null,
        size: value.size || null,
        value: parseFloat(value.value.replace(',', '.')) || null
      }

      if (mode === 'add') await handleShirtAddition(session, newShirt, addShirt, setHasChanged);
      else if (mode === 'edit' && shirt) await handleShirtUpdate(session, shirt.id, newShirt, updateShirt, setHasChanged);

      router.back();
    }
  });

  return (
    <ScrollView
      className="px-2 py-8"
      contentContainerStyle={{ paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
    >
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
      <View className="flex-row mt-4">
        <shirtForm.Field
          name='season'
          validators={{
            onChange: ({ value }) => !value ? 'A season is required!' :
              !(value.length >= 4) ? 'Season must atleast be 4 characters long' : undefined
          }}
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
          name='condition'
          validators={{}}
        >
          {(field) => (
            <Dropdown
              title='Zustand'
              placeholder='Wähle den Zus...'
              value={field.state.value}
              onSelection={field.handleChange}
              isValid={field.state.meta.isValid}
              errorMessage={field.state.meta.errors.join(', ')}
              options={['Frisch aus der Verpackung (★★★★★)', 'Wie neu (★★★★)', 'Leicht benutzt (★★★)', 'Deutliche Verbrauchsspuren (★★)', 'Starke Verbrauchsspuren (★)']}
              withSearch={false}
            />
          )}
        </shirtForm.Field>
      </View>
      <View className="flex-row gap-3 mt-5">
        <shirtForm.Field
          name='printName'
          validators={{}}
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
              placeholder='e. g. Ronaldo'
              value={field.state.value}
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
            <SingleIconInputWithLabel
              errorMessage={field.state.meta.errors.join(', ')}
              firstIcon="hashtag"
              isValid={field.state.meta.isValid}
              keyboardType='numeric'
              label='Flock Nummer'
              maxLength={2}
              onChangeText={field.handleChange}
              placeholder='e. g. 7'
              value={field.state.value}
            />
          )}
        </shirtForm.Field>
      </View>
    </ScrollView>
  );
}