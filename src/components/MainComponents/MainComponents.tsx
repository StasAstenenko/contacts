'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Stack,
  Box,
  Button,
  Select,
  MenuItem,
  useTheme,
  Chip,
  OutlinedInput,
  Pagination,
} from '@mui/material';
import { Contacts } from '@/types/contactsType';
import { getAllContacts } from '@/api/getContacts';
import { useRouter } from 'next/navigation';
import ContactItem from '../ContactItem/ContactItem';
import SearchBar from '../SearchBar/SearchBar';
import { ITEMS_PER_PAGE } from '@/constants/constants';

const MainComponents = () => {
  const theme = useTheme();
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [mounted, setMounted] = useState(false);

  const [sortBy, setSortBy] = useState<'name' | 'company'>('name');
  const [query, setQuery] = useState('');

  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [page, setPage] = useState(1);

  const navigate = useRouter();

  useEffect(() => {
    setMounted(true);
    const unsubscribe = getAllContacts({
      onData: (contacts) => setContacts(contacts),
    });
    return () => unsubscribe();
  }, []);

  const handleCreateContact = () => navigate.push('/create');
  const handleDelete = (id: string) => console.log('Delete contact', id);
  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const companies = useMemo(
    () => Array.from(new Set(contacts.map((c) => c.company).filter(Boolean))),
    [contacts]
  );

  const tags = useMemo(
    () => Array.from(new Set(contacts.flatMap((c) => (c.teg ? c.teg : [])))),
    [contacts]
  );

  const filteredContacts = useMemo(() => {
    return contacts.filter((item) => {
      const matchQuery = query
        ? `${item.firstName} ${item.lastName}`
            .toUpperCase()
            .includes(query.toUpperCase())
        : true;

      const matchCompany = selectedCompany
        ? (item.company || '').toLowerCase() === selectedCompany.toLowerCase()
        : true;

      const matchTags =
        selectedTags.length > 0
          ? selectedTags.every((tag) => item.teg?.includes(tag))
          : true;

      return matchQuery && matchCompany && matchTags;
    });
  }, [contacts, query, selectedCompany, selectedTags]);

  const sortedContacts = useMemo(() => {
    return [...filteredContacts].sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        return nameA.localeCompare(nameB);
      }
      if (sortBy === 'company') {
        return (a.company || '')
          .toLowerCase()
          .localeCompare((b.company || '').toLowerCase());
      }
      return 0;
    });
  }, [filteredContacts, sortBy]);

  const paginatedContacts = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return sortedContacts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedContacts, page]);

  const totalPages = Math.ceil(sortedContacts.length / ITEMS_PER_PAGE);

  if (!mounted) return null;

  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      <Stack spacing={3}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Button variant='contained' onClick={handleCreateContact}>
            Створити контакт
          </Button>

          <SearchBar onSearch={handleSearch} />

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'company')}
            size='small'
            sx={{
              color: theme.palette.common.white,
              backgroundColor: theme.palette.grey[900],
              minWidth: 180,
            }}
          >
            <MenuItem value='name'>Сортувати за {`ім'ям`}</MenuItem>
            <MenuItem value='company'>Сортувати за компанією</MenuItem>
          </Select>

          <Select
            value={selectedCompany}
            onChange={(e) => {
              setSelectedCompany(e.target.value);
              setPage(1);
            }}
            displayEmpty
            size='small'
            sx={{
              color: theme.palette.common.white,
              backgroundColor: theme.palette.grey[900],
              minWidth: 180,
            }}
          >
            <MenuItem value=''>Всі компанії</MenuItem>
            {companies.map((comp) => (
              <MenuItem key={comp} value={comp}>
                {comp}
              </MenuItem>
            ))}
          </Select>

          <Select
            multiple
            value={selectedTags}
            onChange={(e) => {
              setSelectedTags(
                typeof e.target.value === 'string'
                  ? e.target.value.split(',')
                  : e.target.value
              );
              setPage(1);
            }}
            input={<OutlinedInput label='Теги' />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} size='small' />
                ))}
              </Box>
            )}
            size='small'
            sx={{
              color: theme.palette.common.white,
              backgroundColor: theme.palette.grey[900],
              minWidth: 180,
            }}
          >
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Stack spacing={2}>
          {paginatedContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onDelete={handleDelete}
            />
          ))}
        </Stack>

        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color='primary'
            sx={{
              alignSelf: 'center',
              mt: 2,
              backgroundColor: '#1e1e1e',
              padding: '8px 16px',
              borderRadius: '12px',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              '& .MuiPaginationItem-root': {
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              },
              '& .Mui-selected': {
                backgroundColor: '#1976d2',
                color: '#fff',
                border: 'none',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              },
            }}
          />
        )}
      </Stack>
    </Container>
  );
};

export default MainComponents;
