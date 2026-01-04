
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Play, Zap, ArrowRight, Loader2, SearchX } from 'lucide-react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const MOVIES_PER_PAGE = 12;

  const selectedGenre = searchParams.get('genre');
  const searchQuery = searchParams.get('q');

  useEffect(() => {
    setLoading(true);
    // Firestore'dan filmlarni vaqt bo'yicha tartiblab olish
    const q = query(collection(db, "movies"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const movieData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as Movie));
      setMovies(movieData);
      setLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredMovies = useMemo(() => {
    let result = movies;
    if (selectedGenre) {
      result = result.filter(m => m.genre && m.genre.includes(selectedGenre as any));
    }
    if (searchQuery) {
      result = result.filter(m => 
        m.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.originalTitle?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [movies, selectedGenre, searchQuery]);

  const displayedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
    return filteredMovies.slice(startIndex, startIndex + MOVIES_PER_PAGE);
  }, [filteredMovies, currentPage]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-rose-600 animate-spin" />
          <div className="absolute inset-0 bg-rose-600/20 blur-2xl rounded-full"></div>
        </div>
        <p className="mt-6 text-slate-500 font-black uppercase tracking-[0.5em] text-xs animate-pulse">FLIXA Yuklanmoqda</p>
      </div>
    );
  }

  return (
    <main className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 py-8 lg:py-12">
      
      {/* Hero Section - Faqat asosiy sahifada */}
      {!searchQuery && !selectedGenre && movies.length > 0 && (
        <section className="mb-16 lg:mb-24 relative rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden group min-h-[400px] lg:h-[600px] flex items-end">
          <div className="absolute inset-0 z-0">
            <img 
              src={movies[0].poster} 
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 blur-sm brightness-50" 
              alt="Featured" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 p-8 lg:p-20 space-y-6 max-w-4xl">
             <div className="flex items-center gap-3 bg-rose-600/20 backdrop-blur-xl border border-rose-600/30 w-fit px-4 py-2 rounded-2xl">
                <Zap className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Eng so'nggi premyera</span>
             </div>
             <h1 className="text-4xl lg:text-8xl font-black text-white leading-[0.9] uppercase italic font-heading drop-shadow-2xl">
                {movies[0].title}
             </h1>
             <p className="text-slate-300 text-sm lg:text-xl font-medium max-w-xl line-clamp-3 lg:line-clamp-none">
               {movies[0].description}
             </p>
             <div className="flex flex-wrap items-center gap-4 pt-4">
                <button className="bg-white text-slate-950 px-8 lg:px-12 py-4 lg:py-5 rounded-2xl lg:rounded-3xl font-black uppercase text-xs lg:text-sm tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-2xl flex items-center gap-3 active:scale-95">
                   <Play className="w-5 h-5 fill-current" /> Ko'rishni boshlash
                </button>
                <div className="flex items-center gap-2 text-white/60 font-bold text-sm lg:text-base">
                  <span className="w-12 h-[2px] bg-white/20"></span>
                  4K ULTRA HD
                </div>
             </div>
          </div>
        </section>
      )}

      {/* Content Grid Header */}
      <div className="mb-10 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="w-3 h-10 bg-rose-600 rounded-full shadow-[0_0_20px_rgba(244,63,94,0.5)]"></div>
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tighter uppercase font-heading">
              {searchQuery ? `Natija: "${searchQuery}"` : selectedGenre ? `${selectedGenre}` : "Barcha Kinolar"}
            </h2>
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] lg:text-xs">Flixa Premium Katalogi</p>
        </div>
        
        <div className="flex items-center gap-6 overflow-x-auto pb-2 no-scrollbar">
           {["Yangi", "Mashhur", "Kutilmoqda"].map((tab) => (
             <button key={tab} className="whitespace-nowrap text-xs lg:text-sm font-black text-slate-500 uppercase tracking-widest hover:text-rose-500 transition-colors">
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-10">
        {displayedMovies.length > 0 ? (
          displayedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <div className="col-span-full py-24 lg:py-48 text-center glass rounded-[3rem] border-dashed border-2 border-white/5 flex flex-col items-center">
            <div className="w-20 lg:w-32 h-20 lg:h-32 bg-rose-600/5 rounded-full flex items-center justify-center mb-8">
               <SearchX className="w-10 lg:w-16 h-10 lg:h-16 text-slate-700" />
            </div>
            <h3 className="text-2xl lg:text-4xl font-black text-white mb-4 uppercase tracking-tighter">Hech narsa topilmadi</h3>
            <p className="text-slate-500 max-w-sm mx-auto font-medium lg:text-lg">Kechirasiz, qidiruvingiz bo'yicha hech qanday film topilmadi. Boshqa so'zdan foydalanib ko'ring.</p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalMovies={filteredMovies.length}
        moviesPerPage={MOVIES_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </main>
  );
};

export default Home;
