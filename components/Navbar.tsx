
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, GENRES } from '../types';

interface NavbarProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogin, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Simplistic navigation for demo
      navigate(`/genre/Barchasi?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl italic text-white shadow-lg shadow-blue-500/20">
            U
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent hidden sm:block">
            UZMOVI PRO
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-grow max-w-md mx-4 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Film qidirish..."
              className="w-full bg-gray-900/50 border border-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:border-blue-500 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </form>

        {/* Links & Auth */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
            <Link to="/" className="hover:text-white transition-colors">Bosh sahifa</Link>
            <div className="relative group">
              <button className="hover:text-white transition-colors flex items-center gap-1">
                Janrlar
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 glass-morphism rounded-xl overflow-hidden hidden group-hover:block border border-gray-800 shadow-2xl">
                {GENRES.map(genre => (
                  <Link 
                    key={genre} 
                    to={`/genre/${genre}`} 
                    className="block px-4 py-3 hover:bg-blue-600/20 text-gray-300 hover:text-white transition-colors"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2 group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{user.displayName}</p>
                  <p className="text-xs text-gray-500">Mening profilim</p>
                </div>
                <img 
                  src={user.photoURL || 'https://picsum.photos/100'} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-blue-500 transition-all"
                />
              </Link>
            </div>
          ) : (
            <button 
              onClick={onLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Kirish
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
