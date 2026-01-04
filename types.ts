
export interface Movie {
  id: string;
  title: string;
  originalTitle: string;
  poster: string;
  genre: string[];
  country: string;
  year: number;
  language: string;
  duration: string;
  ageLimit: string;
  description: string;
  telegramVideoUrl: string;
  rating: number;
  views: number;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export enum Genre {
  Jangari = "Jangari",
  Drama = "Drama",
  Komediya = "Komediya",
  // Fixed: Identifier cannot contain a single quote. Renamed Qo'rqinchli to Qorqinchli.
  Qorqinchli = "Qo'rqinchli",
  Sarguzasht = "Sarguzasht",
  Fantastika = "Fantastika",
  Detektiv = "Detektiv",
  Multfilm = "Multfilm"
}
