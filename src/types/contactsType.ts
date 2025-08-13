import { Teg } from './createType';

export interface Contacts {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  teg: Teg;
}
