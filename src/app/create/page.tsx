'use client';

import { useCreateContact } from '@/hooks/useCreate';
import dynamic from 'next/dynamic';
const CreateContacts = dynamic(
  () => import('@/components/CreateContacts/CreateContacts'),
  { ssr: false }
);

const CreatePage = () => {
  const { loading, message, handleSubmit } = useCreateContact();

  return (
    <CreateContacts
      loading={loading}
      message={message}
      onSubmit={handleSubmit}
    />
  );
};

export default CreatePage;
