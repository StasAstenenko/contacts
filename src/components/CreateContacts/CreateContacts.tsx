'use client';

import { Contacts } from '@/types/contactsType';
import { Teg } from '@/types/createType';
import {
  Button,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

interface CreateContactsProps {
  loading: boolean;
  message: string;
  onSubmit: (data: Omit<Contacts, 'createdAt' | 'id'>) => void;
}

const CreateContacts = ({
  loading,
  message,
  onSubmit,
}: CreateContactsProps) => {
  const theme = useTheme();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [teg, setTeg] = useState<Teg>('work');
  const navigate = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ company, email, firstName, lastName, phone, teg });
    navigate.push('/main');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(3),
          p: theme.spacing(4),
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[2],
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Typography variant='h6' color='black'>
          Створити контакт
        </Typography>

        <TextField
          label="Ім'я"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          required
          sx={{ width: 400 }}
        />

        <TextField
          label='Прізвище'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          required
          sx={{ width: 400 }}
        />

        <TextField
          label='Емейл'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          sx={{ width: 400 }}
        />

        <TextField
          label='Телефон'
          type='tel'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          required
          sx={{ width: 400 }}
        />

        <TextField
          label='Компанія'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          fullWidth
          required
          sx={{ width: 400 }}
        />

        <TextField
          select
          label='Вибір'
          value={teg}
          onChange={(e) => setTeg(e.target.value as Teg)}
        >
          <MenuItem value='friend'>Друзі</MenuItem>
          <MenuItem value='work'>Робота</MenuItem>
          <MenuItem value='family'>{`Сім'я `}</MenuItem>
        </TextField>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={loading}
          sx={{ width: 200 }}
        >
          {loading ? 'Збереження...' : 'Додати контакт'}
        </Button>

        {message && (
          <Typography sx={{ mt: theme.spacing(2) }} color='text.secondary'>
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CreateContacts;
