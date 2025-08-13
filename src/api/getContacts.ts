import { db } from '@/firebase/client';
import { Contacts } from '@/types/contactsType';
import { Teg } from '@/types/createType';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

interface GetAllContactsProps {
  onData: (contacts: Contacts[]) => void;
}

export const getAllContacts = ({ onData }: GetAllContactsProps) => {
  const q = query(collection(db, 'contacts'), orderBy('firstName', 'desc'));
  const unsubscribeContacts = onSnapshot(q, (snapshot) => {
    const contactsData: Contacts[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      firstName: doc.data().firstName as string,
      lastName: doc.data().lastName as string,
      company: doc.data().company as string,
      phone: doc.data().phone as string,
      email: doc.data().email as string,
      teg: doc.data().teg as Teg,
    }));
    onData(contactsData);
  });

  return unsubscribeContacts;
};
