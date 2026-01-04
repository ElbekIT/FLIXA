
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from '../types';

interface MovieDetailPageProps {
  movies: Movie[];
}

const MovieDetailPage: React.FC<MovieDetailPageProps> = ({ movies }) => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const found = movies.find(m => m.id === id);
    if (found) setMovie(found);
  }, [id, movies]);

  if (!movie) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-pulse text-blue-500 text-2xl font-bold">Yuklanmoqda...</div>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Detail Header Section */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Poster */}
        <div className="w-full lg:w-1/3 xl:w-1/4 shrink-0">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border border-gray-800">
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-auto object-cover" />
            <div className="absolute top-4 right-4 bg-yellow-500 text-black font-black px-3 py-1 rounded text-sm shadow-xl">
              HD 1080p
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex-grow space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
              {movie.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map(g => (
                <span key={g} className="text-blue-500 text-sm font-bold uppercase tracking-widest">{g}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 glass-morphism p-6 rounded-3xl border border-gray-800">
            <div className="flex justify-between border-b border-gray-800/50 pb-2">
              <span className="text-gray-500">Chiqqan yili:</span>
              <span className="font-bold text-white">{movie.year}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800/50 pb-2">
              <span className="text-gray-500">Mamlakat:</span>
              <span className="font-bold text-white">{movie.country}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800/50 pb-2">
              <span className="text-gray-500">Til:</span>
              <span className="font-bold text-white">{movie.language}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800/50 pb-2">
              <span className="text-gray-500">Davomiyligi:</span>
              <span className="font-bold text-white">{movie.duration}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800/50 pb-2">
              <span className="text-gray-500">Yoshi:</span>
              <span className="font-bold text-white">{movie.ageRating}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800/50 pb-2">
              <span className="text-gray-500">Sifat:</span>
              <span className="font-bold text-blue-400">Full HD</span>
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed text-lg italic">
            {movie.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => setShowPlayer(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-blue-600/30 transition-all flex items-center gap-3 active:scale-95"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              ONLAYN KO'RISH
            </button>
            <button className="glass-morphism hover:bg-white/5 text-white px-10 py-4 rounded-2xl font-bold text-lg border border-gray-700 transition-all flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              YUKLAB OLISH
            </button>
          </div>
        </div>
      </div>

      {/* Player Section */}
      {showPlayer && (
        <section id="player" className="space-y-6 pt-12 scroll-mt-20">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              Onlayn Pleyer
            </h2>
            <button 
              onClick={() => setShowPlayer(false)}
              className="text-gray-500 hover:text-white flex items-center gap-1 text-sm font-bold uppercase tracking-wider"
            >
              Pleyerni yopish [X]
            </button>
          </div>
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black border border-gray-800 shadow-2xl ring-1 ring-blue-500/20">
            {/* Telegram video embed logic simulation */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-gray-400 font-bold">Video Telegram serveridan yuklanmoqda...</p>
              <p className="text-blue-500 text-xs font-mono">{movie.videoUrl}</p>
              <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
              </div>
            </div>
            
            {/* In a real scenario, we might use an iframe to a TG embed bridge or a special JS player */}
            {/* <iframe src={`https://t.me/${movie.videoUrl}?embed=1`} className="w-full h-full border-none"></iframe> */}
          </div>
          
          <div className="glass-morphism p-6 rounded-2xl flex items-center justify-between">
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-xl font-bold">{movie.likes}</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Likelar</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{movie.views}</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Views</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-800 text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-800 text-gray-500 hover:bg-red-600 hover:text-white transition-all shadow-xl">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MovieDetailPage;
