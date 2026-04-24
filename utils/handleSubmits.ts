import { handleShirtAddition, handleShirtUpdate } from "@/utils/handleShirtOperations";
import { Session } from "@supabase/supabase-js";

export async function handleShirtFormSubmit(
  addShirt: (shirt: Shirt) => void, data: ReferenceData, mode: 'add' | 'edit', session: Session, setHasChanged: (hasChanged: boolean) => void, shirt: Shirt | null, updateShirt: (id: string, updateShirt: Partial<Shirt>) => void,
  value: { team: string; season: string; type: string; condition: number; printName: string; printNumber: string; size: string; value: string; }): Promise<void> {

  const newShirt: Partial<Shirt> = {
    team: value.team,
    team_key: data.teams.find((team) => value.team === team.name)?.key || shirt?.team_key,
    league_key: data.teams.find((team) => value.team === team.name)?.leagueKey || shirt?.league_key,
    season: value.season,
    type: value.type,
    condition: value.condition,
    print_name: value.printName || null,
    print_number: parseInt(value.printNumber) || null,
    size: value.size || null,
    value: parseFloat(value.value.replace(',', '.')) || null
  }

  if (mode === 'add') await handleShirtAddition(session, newShirt, addShirt, setHasChanged);
  else if (mode === 'edit' && shirt) await handleShirtUpdate(session, shirt.id, newShirt, updateShirt, setHasChanged);
}