import { Contacts } from '@/types/contactsType';
import { Delete, Edit } from '@mui/icons-material';
import {
  Avatar,
  Chip,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

interface ContactItemProps {
  contact: Contacts;
  onDelete: (id: string) => void;
}

const ContactItem = ({ contact, onDelete }: ContactItemProps) => {
  const navigate = useRouter();
  const initials = `${contact.firstName?.[0] || ''}${
    contact.lastName?.[0] || ''
  }`;

  const handleDelete = (e: FormEvent) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      `Ви дійсно хочете видалити контакт ${contact.firstName} ${contact.lastName}?`
    );
    if (confirmed) {
      onDelete(contact.id);
    }
  };

  return (
    <ListItem
      disablePadding
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        mb: 1,
        boxShadow: 1,
        '&:hover': {
          boxShadow: 4,
          transform: 'scale(1.01)',
          transition: 'all 0.2s ease-in-out',
        },
      }}
    >
      <ListItemButton sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 'bold' }}>
          {initials.toUpperCase()}
        </Avatar>

        <Box
          sx={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
          }}
        >
          <Box color='black'>
            <Typography fontWeight={600}>
              {contact.firstName} {contact.lastName}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {contact.email}
            </Typography>
          </Box>
          <ListItemText
            primary={contact.phone}
            primaryTypographyProps={{ color: 'text.primary', fontWeight: 500 }}
          />
          <ListItemText
            primary={contact.company}
            primaryTypographyProps={{ color: 'text.primary', fontWeight: 500 }}
          />
          <Chip
            label={contact.teg}
            color='secondary'
            size='small'
            sx={{ fontWeight: 'bold' }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            color='primary'
            onClick={(e) => {
              e.stopPropagation();
              navigate.push(`/edit/${contact.id}`);
            }}
          >
            <Edit />
          </IconButton>
          <IconButton color='error' onClick={handleDelete}>
            <Delete />
          </IconButton>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default ContactItem;
