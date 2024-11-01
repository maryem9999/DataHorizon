
export interface Employee {
  id: string | number; // requis
  age?: string | number | null; // facultatif
  dob?: string; // facultatif
  email?: string; // facultatif
  salary?: string | number | null; // facultatif
  address?: string | null; // facultatif
  adress?: string | null; 
  imageUrl?: string; // facultatif
  lastName?: string; // facultatif
  firstName?: string; // facultatif
  contactNumber?: string | number | null; // facultatif
  isDeleting?: boolean; // facultatif
  [key: string]: any; 
}



