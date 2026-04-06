import { fetchReferenceData } from "@/services/shirthub_ref_data";
import { Session } from "@supabase/supabase-js";

export async function handleReferenceData(session: Session, setReferenceData: (data: ReferenceData) => void) {
  try {
    const response = await fetchReferenceData(session);
    setReferenceData(response);
  } catch (error) {
    throw new Error(`Error while fetching reference data: ${error}`);
  }
}