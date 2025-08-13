import { db } from '@/firebase/client';
import { Contacts } from '@/types/contactsType';
import { doc, getDoc } from 'firebase/firestore';

export const getContactById = async (id: string): Promise<Contacts | null> => {
  if (!id) return null;
  const ref = doc(db, 'contacts', id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data();

  return {
    id: snap.id,
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    phone: data.phone || '',
    company: data.company || '',
    teg: data.teg || 'work',
  };
};
