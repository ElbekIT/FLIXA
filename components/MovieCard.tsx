
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, PlayCircle, Eye } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="group relative flex flex-col rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_60px_-15px_rgba(244,63,94,0.4)] movie-card-zoom"
    >
      {/* Poster Container */}
      <div className="relative aspect-[2.5/4] overflow-hidden">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border border-white/20">4K Ultra</span>
        </div>

        {/* Rating Bubble */}
        <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-2xl flex items-center space-x-1.5 border border-white/20 shadow-xl">
          <Star className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span className="text-[11px] font-black text-white">{movie.rating}</span>
        </div>

        {/* Hover Content */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
           <div className="bg-rose-600 p-6 rounded-full shadow-[0_0_40px_rgba(244,63,94,0.6)] transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
              <PlayCircle className="w-12 h-12 text-white fill-white/20" />
           </div>
           
           <div className="absolute bottom-6 left-6 right-6 space-y-2 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 delay-100">
              <div className="flex items-center gap-3 text-[10px] text-white/60 font-black uppercase tracking-widest">
                 <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {movie.views}</span>
                 <span>•</span>
                 <span>{movie.year}</span>
              </div>
              <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tighter font-heading">{movie.title}</h3>
           </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
