
import React, { useMemo } from 'react';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

interface HomePageProps {
  movies: Movie[];
}

const HomePage: React.FC<HomePageProps> = ({ movies }) => {
  const featuredMovies = useMemo(() => [...movies].sort((a, b) => b.views - a.views).slice(0, 3), [movies]);
  const recentMovies = useMemo(() => [...movies].sort((a, b) => b.createdAt - a.createdAt).slice(0, 8), [movies]);

  return (
    <div className="space-y-12">
      {/* Hero Section / Carousel Simulation */}
      <section className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden">
        {featuredMovies.length > 0 && (
          <div className="w-full h-full relative group">
            <img 
              src={featuredMovies[0].posterUrl} 
              className="w-full h-full object-cover" 
              alt="Featured" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-widest">
                Trenddagi Film
              </span>
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
                {featuredMovies[0].title}
              </h1>
              <p className="text-gray-300 max-w-2xl mb-8 line-clamp-3 text-lg">
                {featuredMovies[0].description}
              </p>
              <div className="flex gap-4">
                <Link 
                  to={`/movie/${featuredMovies[0].id}`} 
                  className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all flex items-center gap-2 shadow-xl shadow-white/10"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Hoziroq Ko'rish
                </Link>
                <button className="glass-morphism text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all border border-white/20">
                  Ma'lumot
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Main Content Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold border-l-4 border-blue-600 pl-4 uppercase tracking-wider">
              Yangi Qo'shilganlar
            </h2>
            <div className="h-px bg-gray-800 flex-grow hidden md:block ml-4"></div>
          </div>
          <Link to="/genre/Barchasi" className="text-blue-500 text-sm font-semibold hover:text-blue-400 transition-colors flex items-center gap-1 group">
            Barchasini ko'rish
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {recentMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-gray-900/40 rounded-3xl p-8 border border-gray-800/50">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-400 uppercase tracking-[0.2em]">Ommabop Janrlar</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {['Jangari', 'Drama', 'Komediya', 'Dahshatli', 'Multfilm', 'Sarguzasht', 'Fantastika'].map(genre => (
            <Link 
              key={genre}
              to={`/genre/${genre}`}
              className="glass-morphism p-4 rounded-2xl text-center hover:bg-blue-600/20 hover:border-blue-500/50 transition-all group"
            >
              <span className="text-sm font-bold text-gray-300 group-hover:text-white">{genre}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
