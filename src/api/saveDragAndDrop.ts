import { db } from '@/firebase/client';
import { doc, updateDoc } from 'firebase/firestore';

export const saveDragAndDrop = async (id: string, index: number) => {
  await updateDoc(doc(db, 'contacts', id), { order: index });
};
