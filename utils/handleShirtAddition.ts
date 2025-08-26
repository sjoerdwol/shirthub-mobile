import { addShirt } from '@/services/shirthub_backend';
import { Session } from '@supabase/supabase-js';
import convertShirtResponse from './convertShirtResponse';

export default async function handleShirtAddition(session: Session, newShirt: Partial<Shirt>, addShirtToStore: (shirt: Shirt) => void): Promise<void> {
  try {
    const response = await addShirt(session, newShirt);
    const newShirtStore = convertShirtResponse([response])[0];
    addShirtToStore(newShirtStore);
  } catch (error) {
    console.error('Error creating shirt: ', error);
  }
}