import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Play } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="group relative flex flex-col rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_-15px_rgba(225,29,72,0.4)]"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={movie.poster} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          alt={movie.title}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-150 group-hover:scale-100 duration-500">
          <div className="bg-rose-600 p-5 rounded-full shadow-2xl">
            <Play className="w-8 h-8 fill-white" />
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 border border-white/10">
          <Star className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span className="text-[11px] font-black">{movie.rating?.toFixed(1) || '8.5'}</span>
        </div>

        {/* Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
           <h3 className="text-xl font-black brand-font italic uppercase leading-tight line-clamp-2">{movie.title}</h3>
           <div className="flex items-center gap-2 mt-2 text-[10px] font-black text-rose-500 uppercase tracking-widest">
              <span>{movie.year}</span>
              <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
              <span>{movie.genre?.[0]}</span>
           </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;