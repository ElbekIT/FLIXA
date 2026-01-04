
import React, { useState, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Movie, GENRES } from '../types';
import MovieCard from '../components/MovieCard';

interface GenrePageProps {
  movies: Movie[];
}

const ITEMS_PER_PAGE = 10;

const GenrePage: React.FC<GenrePageProps> = ({ movies }) => {
  const { genreName } = useParams<{ genreName: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMovies = useMemo(() => {
    let result = [...movies];
    
    if (genreName && genreName !== 'Barchasi') {
      result = result.filter(m => m.genres.includes(genreName));
    }
    
    if (searchQuery) {
      result = result.filter(m => 
        m.title.toLowerCase().includes(searchQuery) || 
        m.description.toLowerCase().includes(searchQuery)
      );
    }
    
    return result;
  }, [movies, genreName, searchQuery]);

  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span className="text-blue-500">#{genreName || 'Katalog'}</span>
            <span className="text-gray-500 text-sm font-normal">({filteredMovies.length} film)</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {searchQuery ? `"${searchQuery}" so'rovi bo'yicha natijalar` : `${genreName} janridagi barcha filmlar to'plami.`}
          </p>
        </div>
        
        {/* Genre Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {GENRES.slice(0, 6).map(g => (
            <a 
              key={g} 
              href={`#/genre/${g}`}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                genreName === g ? 'bg-blue-600 border-blue-500 text-white' : 'glass-morphism border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {g}
            </a>
          ))}
        </div>
      </div>

      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {paginatedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center glass-morphism rounded-3xl">
          <svg className="w-16 h-16 text-gray-800 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-500">Hech narsa topilmadi</h2>
          <p className="text-gray-600 mt-1">Boshqa kalit so'zlar bilan qidirib ko'ring yoki katalogimizni ko'zdan kechiring.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12 pb-12">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="w-10 h-10 flex items-center justify-center rounded-xl glass-morphism disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-600/20 transition-all border border-gray-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-xl font-bold transition-all border ${
                currentPage === i + 1 ? 'bg-blue-600 border-blue-500 text-white' : 'glass-morphism border-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-xl glass-morphism disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-600/20 transition-all border border-gray-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default GenrePage;
