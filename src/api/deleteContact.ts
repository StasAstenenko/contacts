import { db } from '@/firebase/client';
import { deleteDoc, doc } from 'firebase/firestore';

export const deleteContact = async (id: string) => {
  await deleteDoc(doc(db, 'contacts', id));
};
