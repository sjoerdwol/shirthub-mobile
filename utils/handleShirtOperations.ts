import { addShirt, deleteShirt, getShirts, updateShirt } from '@/services/shirthub_backend';
import { Session } from '@supabase/supabase-js';
import convertShirtResponse from './convertShirtResponse';

export async function handleShirtAddition(session: Session, newShirt: Partial<Shirt>, addShirtToStore: (shirt: Shirt) => void): Promise<void> {
  try {
    const response = await addShirt(session, newShirt);
    const newShirtStore = convertShirtResponse([response])[0];
    addShirtToStore(newShirtStore);
  } catch (error) {
    console.error('Error creating shirt: ', error);
  }
}

export async function handleShirtDeletion(session: Session, shirtId: string, deleteShirtFromStore: (id: string) => void): Promise<void> {
  try {
    await deleteShirt(session, shirtId);
    deleteShirtFromStore(shirtId);
  } catch (error) {
    console.error('Error deleting shirt: ', error);
  }
}

export async function handleShirtInitialFetch(session: Session, setInitialShirts: (shirts: Array<Shirt>) => void): Promise<void> {
  try {
    const response = await getShirts(session);
    const initialShirts = convertShirtResponse(response);
    setInitialShirts(initialShirts);
  } catch (error) {
    console.error('Error fetching shirts: ', error);
  }
}

export async function handleShirtUpdate(session: Session, shirtId: string, updatedShirt: Partial<Shirt>, updateShirtInStore: (shirtId: string, updatedShirt: Partial<Shirt>) => void): Promise<void> {
  try {
    const response = await updateShirt(session, shirtId, updatedShirt);
    const updatedShirtStore = convertShirtResponse([response])[0];
    updateShirtInStore(shirtId, updatedShirtStore);
  } catch (error) {
    console.error('Error creating shirt: ', error);
  }
}