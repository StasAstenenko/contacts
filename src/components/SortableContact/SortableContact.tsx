import { Contacts } from '@/types/contactsType';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ContactItem from '../ContactItem/ContactItem';

interface SortableContactProps {
  contact: Contacts;
  onDelete: (id: string) => void;
}

const SortableContact = ({ contact, onDelete }: SortableContactProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: contact.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ContactItem contact={contact} onDelete={onDelete} />
    </div>
  );
};

export default SortableContact;
