// /api/updateContact.ts
import { db } from '@/firebase/client';
import { Contacts } from '@/types/contactsType';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export const updateContact = async (data: Contacts) => {
  const { id, firstName, lastName, email, phone, company, teg } = data;

  try {
    if (!id) throw new Error('ID контакту не заданий');
    const contactRef = doc(db, 'contacts', id);

    await updateDoc(contactRef, {
      firstName,
      lastName,
      email,
      phone,
      company,
      teg,
      updatedAt: serverTimestamp(),
    });

    return { success: true, message: '✅ Контакт успішно оновлено!' };
  } catch (error) {
    console.error('Помилка оновлення контакту:', error);
    return { success: false, message: '❌ Не вдалося оновити контакт' };
  }
};
