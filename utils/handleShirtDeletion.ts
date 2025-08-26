import { deleteShirt } from '@/services/shirthub_backend';
import { Session } from '@supabase/supabase-js';

export default async function handleShirtDeletion(session: Session, shirtId: string, deleteShirtFromStore: (id: string) => void): Promise<void> {
  try {
    await deleteShirt(session, shirtId);
    deleteShirtFromStore(shirtId);
  } catch (error) {
    console.error('Error deleting shirt: ', error);
  }
}