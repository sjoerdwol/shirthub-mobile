import { getUserStatistics } from "@/services/shirthub_statistics";
import { Session } from "@supabase/supabase-js";

export function calculateAverageCondition(shirts: Array<Shirt>): number {
  const filtered = shirts.filter(shirt => shirt.condition);
  if (filtered.length === 0) { return 0; }
  return Math.floor(filtered.reduce((count, shirt) => count + shirt.condition, 0) / filtered.length);
}

export async function handleStatisticsFetch(session: Session, setHasChanged: (hasChanged: boolean) => void, setUserStatistics: (stats: UserStatistics) => void): Promise<void> {
  try {
    const userStatistics = await getUserStatistics(session);
    setUserStatistics(userStatistics);
    setHasChanged(false);
  } catch (error) {
    throw new Error(`Error while fetching user statistics: ${error}`);
  }
}