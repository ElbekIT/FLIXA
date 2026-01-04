
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { User, Movie, OWNER_EMAIL } from './types';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import GenrePage from './pages/GenrePage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';

// Dummy data for initial development
const INITIAL_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Qasoskorlar: Intiho',
    posterUrl: 'https://picsum.photos/seed/avengers/600/900',
    videoUrl: 'https://t.me/example/1',
    genres: ['Jangari', 'Fantastika'],
    year: 2019,
    country: 'AQSH',
    language: "O'zbek",
    duration: '3s 2m',
    ageRating: '12+',
    description: 'Yovuz Thanos dunyoning yarmini yo\'q qilganidan so\'ng, qolgan Qasoskorlar oxirgi imkoniyatdan foydalanishadi.',
    likes: 1200,
    views: 45000,
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'Interstellar',
    posterUrl: 'https://picsum.photos/seed/interstellar/600/900',
    videoUrl: 'https://t.me/example/2',
    genres: ['Fantastika', 'Drama'],
    year: 2014,
    country: 'AQSH',
    language: "O'zbek",
    duration: '2s 49m',
    ageRating: '12+',
    description: 'Insoniyat kelajagi xavf ostida qolganda, bir guruh kosmonavtlar yangi uy izlab qora tuynuk orqali sayohat qilishadi.',
    likes: 2500,
    views: 68000,
    createdAt: Date.now() - 100000
  },
  {
    id: '3',
    title: 'Sheryurak',
    posterUrl: 'https://picsum.photos/seed/braveheart/600/900',
    videoUrl: 'https://t.me/example/3',
    genres: ['Drama', 'Jangari'],
    year: 1995,
    country: 'Shotlandiya',
    language: "O'zbek",
    duration: '2s 58m',
    ageRating: '16+',
    description: 'Shotlandiya mustaqilligi uchun kurashgan afsonaviy qahramon Uilyam Uolles haqida doston.',
    likes: 1800,
    views: 32000,
    createdAt: Date.now() - 200000
  }
];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  // Initialize data
  useEffect(() => {
    const storedMovies = localStorage.getItem('uzmovi_movies');
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    } else {
      setMovies(INITIAL_MOVIES);
      localStorage.setItem('uzmovi_movies', JSON.stringify(INITIAL_MOVIES));
    }

    const storedUser = localStorage.getItem('uzmovi_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = () => {
    // Mocking Firebase Google Login
    const mockUser: User = {
      uid: 'user123',
      displayName: 'Gavharoy Qoriyeva',
      email: OWNER_EMAIL, // For testing owner access
      photoURL: 'https://picsum.photos/200',
      role: OWNER_EMAIL === 'qoriyevagavharoy@gmail.com' ? 'owner' : 'user'
    };
    setUser(mockUser);
    localStorage.setItem('uzmovi_user', JSON.stringify(mockUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('uzmovi_user');
  };

  const addMovie = (newMovie: Movie) => {
    const updated = [newMovie, ...movies];
    setMovies(updated);
    localStorage.setItem('uzmovi_movies', JSON.stringify(updated));
  };

  const deleteMovie = (id: string) => {
    const updated = movies.filter(m => m.id !== id);
    setMovies(updated);
    localStorage.setItem('uzmovi_movies', JSON.stringify(updated));
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage movies={movies} />} />
            <Route path="/movie/:id" element={<MovieDetailPage movies={movies} />} />
            <Route path="/genre/:genreName" element={<GenrePage movies={movies} />} />
            <Route path="/profile" element={<ProfilePage user={user} onLogout={handleLogout} />} />
            <Route 
              path="/admin" 
              element={
                user?.role === 'owner' 
                ? <AdminDashboard movies={movies} onAddMovie={addMovie} onDeleteMovie={deleteMovie} /> 
                : <HomePage movies={movies} />
              } 
            />
          </Routes>
        </main>

        <footer className="py-8 border-t border-gray-800 text-center text-gray-500">
          <p>© 2024 UzMovi Pro. Barcha huquqlar himoyalangan.</p>
          <div className="mt-2 flex justify-center gap-4 text-sm">
            <Link to="/" className="hover:text-white transition-colors">Bosh sahifa</Link>
            <Link to="/genre/Barchasi" className="hover:text-white transition-colors">Janrlar</Link>
            {user?.role === 'owner' && <Link to="/admin" className="text-blue-500 hover:text-blue-400">Admin</Link>}
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
