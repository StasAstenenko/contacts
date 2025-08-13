import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ContactItem from '../ContactItem/ContactItem';
import { Contacts } from '@/types/contactsType';

interface SortableContactItemProps {
  contact: Contacts;
  onDelete: (id: string) => void;
}

const SortableContactItem = ({
  contact,
  onDelete,
}: SortableContactItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: contact.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <ContactItem
        contact={contact}
        onDelete={onDelete}
        dragHandleListeners={listeners}
      />
    </div>
  );
};

export default SortableContactItem;
