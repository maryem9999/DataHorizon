export interface Employee {
  id: string | number; // Identifiant requis de l'employé, peut être une chaîne ou un nombre
  age?: string | number | null; // Âge facultatif, peut être une chaîne, un nombre ou null
  dob?: string; // Date de naissance facultative sous forme de chaîne
  email?: string; // Email facultatif, sous forme de chaîne
  salary?: string | number | null; // Salaire facultatif, peut être une chaîne, un nombre ou null
  address?: string | null; // Adresse facultative, peut être une chaîne ou null
  adress?: string | null; // Possiblement une erreur de frappe; devrait probablement être 'address'
  imageUrl?: string; // URL d'image facultative, sous forme de chaîne
  lastName?: string; // Nom de famille facultatif, sous forme de chaîne
  firstName?: string; // Prénom facultatif, sous forme de chaîne
  contactNumber?: string | number | null; // Numéro de contact facultatif, peut être une chaîne, un nombre ou null
  isDeleting?: boolean; // Indique si l'employé est en cours de suppression, facultatif
  [key: string]: any; // Permet d'ajouter d'autres propriétés dynamiques de n'importe quel type
}
