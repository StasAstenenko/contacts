'use client';

import { getContactById } from '@/api/getContactById';
import { updateContact } from '@/api/updateContact';
import { Teg } from '@/types/createType';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, FormEvent } from 'react';

const EditComponent = () => {
  const theme = useTheme();
  const navigate = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [teg, setTeg] = useState<Teg>('work');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchContact = async () => {
      setLoading(true);
      const contact = await getContactById(id);
      if (contact) {
        setFirstName(contact.firstName);
        setLastName(contact.lastName);
        setEmail(contact.email);
        setPhone(contact.phone);
        setCompany(contact.company);
        setTeg(contact.teg);
      }
      setLoading(false);
    };

    fetchContact();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setLoading(true);
    setMessage('');

    const result = await updateContact({
      id,
      firstName,
      lastName,
      email,
      phone,
      company,
      teg,
    });

    setMessage(result.message);
    if (result.success) {
      navigate.push('/main');
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: theme.palette.background.default,
        p: 2,
      }}
    >
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          p: 4,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
          bgcolor: theme.palette.background.paper,
          width: '100%',
          maxWidth: 500,
        }}
      >
        <Typography variant='h5' fontWeight={700} color='primary'>
          Редагувати контакт
        </Typography>

        <TextField
          label="Ім'я"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label='Прізвище'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label='Емейл'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label='Телефон'
          type='tel'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label='Компанія'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          fullWidth
          required
        />
        <TextField
          select
          label='Категорія'
          value={teg}
          onChange={(e) => setTeg(e.target.value as Teg)}
        >
          <MenuItem value='friend'>Друзі</MenuItem>
          <MenuItem value='work'>Робота</MenuItem>
          <MenuItem value='family'>{`Сім'я`}</MenuItem>
        </TextField>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={loading}
          sx={{ alignSelf: 'flex-end', width: 150 }}
        >
          {loading ? 'Завантаження...' : 'Зберегти'}
        </Button>

        {message && (
          <Typography
            variant='body2'
            sx={{
              mt: 2,
              color: message.includes('✅') ? 'success.main' : 'error.main',
              fontWeight: 500,
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default EditComponent;
