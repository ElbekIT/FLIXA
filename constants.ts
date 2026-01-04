
import { Movie, Genre } from './types';

// Fixed: Cast Object.values(Genre) to string[] to ensure type compatibility with Movie.genre
export const GENRES = Object.values(Genre) as string[];

export const MOCK_MOVIES: Movie[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `movie-${i + 1}`,
  title: `Kino Nomi ${i + 1}`,
  originalTitle: `Original Movie Title ${i + 1}`,
  poster: `https://picsum.photos/seed/${i + 100}/400/600`,
  genre: [GENRES[i % GENRES.length], GENRES[(i + 1) % GENRES.length]],
  country: i % 2 === 0 ? "AQSH" : "Janubiy Koreya",
  year: 2020 + (i % 5),
  language: "O'zbek tili",
  duration: "02:15:00",
  ageLimit: i % 3 === 0 ? "18+" : "12+",
  description: "Bu juda qiziqarli va hayajonli film bo'lib, unda bosh qahramon o'zining murakkab hayot yo'lini bosib o'tadi. Uzmovi uslubida tayyorlangan ushbu saytda siz eng so'nggi va sara filmlarni yuqori sifatda tomosha qilishingiz mumkin.",
  telegramVideoUrl: "https://t.me/example_channel/123", // Real applications would use a TG embed link logic
  rating: 4.5 + (Math.random() * 0.5),
  views: Math.floor(Math.random() * 10000)
}));
