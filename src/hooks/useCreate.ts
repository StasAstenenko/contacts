import { db } from '@/firebase/client';
import { Teg } from '@/types/createType';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';

interface UseCreateContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  teg: Teg;
}

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
  }: UseCreateContact) => {
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
