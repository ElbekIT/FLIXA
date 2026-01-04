
import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="group block relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/50">
      <div className="aspect-[2/3] relative">
        <img 
          src={movie.posterUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            {movie.year}
          </span>
          <span className="bg-yellow-500/90 backdrop-blur-md text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            {movie.ageRating}
          </span>
        </div>
        
        {/* Play button overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
            <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gradient-to-t from-gray-950 to-gray-900/50">
        <h3 className="text-white font-bold truncate group-hover:text-blue-400 transition-colors">{movie.title}</h3>
        <p className="text-gray-500 text-xs mt-1 truncate">{movie.genres.join(', ')}</p>
        
        <div className="mt-3 flex items-center justify-between text-[10px] text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {movie.likes} Like
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {movie.views} Ko'rishlar
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
