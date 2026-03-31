import DropdownSearch from "@/components/details/dropdownSearch";
import { useAuth } from "@/contexts/authContext";
import { useShirtStore } from "@/stores/shirtStore";
import { useUserStatisticsStore } from "@/stores/statisticsStore";
import { handleShirtAddition, handleShirtUpdate } from "@/utils/handleShirtOperations";
import { useForm } from "@tanstack/react-form";
import { router } from "expo-router";
import { ScrollView } from "react-native";

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
        validators={{
          onChange: ({ value }) => !value ? 'A team name is required!' : undefined
        }}
      >
        {(field) => (
          <DropdownSearch
            title='Club / Team Name'
            placeholder='Wähle ein Team'
            value={field.state.value}
            onSelection={field.handleChange}
            isValid={field.state.meta.isValid}
            errorMessage={field.state.meta.errors.join(', ')}
            options={data.teams.map((team) => team.name).sort()}
          />
        )}
      </shirtForm.Field>
    </ScrollView>
  );
}