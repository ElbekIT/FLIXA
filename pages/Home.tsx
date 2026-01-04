import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { Play, Zap, Info, Clapperboard } from 'lucide-react';

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const MOVIES_PER_PAGE = 12;

  const genreFilter = searchParams.get('genre');
  const searchQuery = searchParams.get('q');

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "movies"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Movie));
      setMovies(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter(m => {
      const matchesGenre = !genreFilter || (m.genre && m.genre.includes(genreFilter));
      const matchesSearch = !searchQuery || 
        m.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.originalTitle?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesGenre && matchesSearch;
    });
  }, [movies, genreFilter, searchQuery]);

  const displayedMovies = useMemo(() => {
    const start = (currentPage - 1) * MOVIES_PER_PAGE;
    return filteredMovies.slice(start, start + MOVIES_PER_PAGE);
  }, [filteredMovies, currentPage]);

  if (loading) {
    return <div className="h-screen bg-[#030712]"></div>;
  }

  return (
    <div className="pb-20">
      {/* Dynamic Hero Section */}
      {!searchQuery && !genreFilter && movies.length > 0 && (
        <section className="relative h-[80vh] w-full overflow-hidden mb-12">
          <img 
            src={movies[0].poster} 
            className="absolute inset-0 w-full h-full object-cover brightness-50"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/90 to-transparent"></div>
          
          <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col justify-end pb-24 space-y-6">
            <div className="flex items-center gap-3 bg-rose-600 w-fit px-4 py-1.5 rounded-full shadow-lg shadow-rose-600/30">
              <Zap className="w-4 h-4 fill-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">Premyera</span>
            </div>
            <h1 className="text-5xl lg:text-8xl font-black brand-font italic uppercase leading-none drop-shadow-2xl">
              {movies[0].title}
            </h1>
            <p className="max-w-xl text-slate-300 text-lg font-medium line-clamp-3">
              {movies[0].description}
            </p>
            <div className="flex items-center gap-4 pt-4">
              <button className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase text-sm flex items-center gap-3 hover:bg-rose-600 hover:text-white transition-all">
                <Play className="w-5 h-5 fill-current" /> Tomosha Qilish
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl font-black uppercase text-sm flex items-center gap-3 hover:bg-white/20 transition-all">
                <Info className="w-5 h-5" /> Batafsil
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Grid Content */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-5xl font-black brand-font uppercase italic tracking-tighter">
            {searchQuery ? `Natija: "${searchQuery}"` : genreFilter ? genreFilter : "Katalog"}
          </h2>
          <div className="h-1.5 w-24 bg-rose-600 mt-4 rounded-full"></div>
        </div>

        {displayedMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8">
            {displayedMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center flex flex-col items-center glass-panel rounded-[3rem]">
            <Clapperboard className="w-20 h-20 text-slate-700 mb-6" />
            <h3 className="text-2xl font-bold uppercase">Hech narsa topilmadi</h3>
            <p className="text-slate-500 mt-2">Boshqa so'z bilan qidirib ko'ring yoki katalogga qayting.</p>
          </div>
        )}

        <Pagination 
          currentPage={currentPage}
          totalMovies={filteredMovies.length}
          moviesPerPage={MOVIES_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Home;