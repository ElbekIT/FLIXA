
export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  videoUrl: string; // Telegram link
  genres: string[];
  year: number;
  country: string;
  language: string;
  duration: string;
  ageRating: string;
  description: string;
  likes: number;
  views: number;
  createdAt: number;
}

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: 'user' | 'owner';
}

export type Genre = 'Barchasi' | 'Jangari' | 'Komediya' | 'Dahshatli' | 'Fantastika' | 'Drama' | 'Sarguzasht' | 'Multfilm';

export const GENRES: Genre[] = [
  'Barchasi',
  'Jangari',
  'Komediya',
  'Dahshatli',
  'Fantastika',
  'Drama',
  'Sarguzasht',
  'Multfilm'
];

export const OWNER_EMAIL = "qoriyevagavharoy@gmail.com";
