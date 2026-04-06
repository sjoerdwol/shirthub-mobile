import { getUserStatistics } from "@/services/shirthub_statistics";
import { Session } from "@supabase/supabase-js";

export function calculateAverageCondition(shirts: Array<Shirt>): number {
  const average = 0;
  return average;
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