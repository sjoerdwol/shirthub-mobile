import { addShirt, deleteShirt, getShirts, setIsFavorite, updateShirt } from '@/services/shirthub_crud';
import { Session } from '@supabase/supabase-js';
import convertShirtResponse from './convertShirtResponse';

export async function handleDeleteFavorite(session: Session, shirtId: string, updateShirtInStore: (shirtId: string, updatedShirt: Partial<Shirt>) => void): Promise<void> {
  try {
    const response = await setIsFavorite(session, shirtId, false);
    const removedFavorite = convertShirtResponse([response])[0];
    updateShirtInStore(shirtId, removedFavorite);
  } catch (error) {
    console.error('Error removing favorite shirt: ', error);
  }
}

export async function handleSetFavorite(session: Session, shirtId: string, previousFavoriteId: string | null, updateShirtInStore: (shirtId: string, updatedShirt: Partial<Shirt>) => void): Promise<void> {
  try {
    const response = await setIsFavorite(session, shirtId, true);
    const newFavorite = convertShirtResponse([response])[0];
    // Only after a successful backend call: clear the previous favorite in the store
    if (previousFavoriteId && previousFavoriteId !== shirtId) {
      updateShirtInStore(previousFavoriteId, { is_favorite: false });
    }
    // Apply the new favorite returned by the backend
    updateShirtInStore(newFavorite.id, newFavorite);
  } catch (error) {
    console.error('Error setting favorite shirt: ', error);
  }
}

export async function handleShirtAddition(session: Session, newShirt: Partial<Shirt>, addShirtToStore: (shirt: Shirt) => void, setHasChanged: (hasChanged: boolean) => void): Promise<void> {
  try {
    const response = await addShirt(session, newShirt);
    const newShirtStore = convertShirtResponse([response])[0];
    addShirtToStore(newShirtStore);
    setHasChanged(true);
  } catch (error) {
    console.error('Error creating shirt: ', error);
  }
}

export async function handleShirtDeletion(session: Session, shirtId: string, deleteShirtFromStore: (id: string) => void, setHasChanged: (hasChanged: boolean) => void): Promise<void> {
  try {
    await deleteShirt(session, shirtId);
    deleteShirtFromStore(shirtId);
    setHasChanged(true);
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

export async function handleShirtUpdate(session: Session, shirtId: string, updatedShirt: Partial<Shirt>, updateShirtInStore: (shirtId: string, updatedShirt: Partial<Shirt>) => void, setHasChanged: (hasChanged: boolean) => void): Promise<void> {
  try {
    const response = await updateShirt(session, shirtId, updatedShirt);
    const updatedShirtStore = convertShirtResponse([response])[0];
    updateShirtInStore(shirtId, updatedShirtStore);
    setHasChanged(true);
  } catch (error) {
    console.error('Error creating shirt: ', error);
  }
}