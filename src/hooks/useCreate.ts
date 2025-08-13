import { db } from '@/firebase/client';
import { Contacts } from '@/types/contactsType';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';

export const useCreateContact = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async ({
    company,
    email,
    firstName,
    lastName,
    phone,
    teg,
  }: Omit<Contacts, 'id'>) => {
    try {
      setLoading(true);
      setMessage('');

      await addDoc(collection(db, 'contacts'), {
        company,
        email,
        firstName,
        lastName,
        phone,
        teg,
      });
    } catch (error) {
      setMessage('❌ Не вдалося додати контакт');
      return error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    message,
    setLoading,
    setMessage,
    handleSubmit,
  };
};
