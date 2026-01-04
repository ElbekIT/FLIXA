import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Menu, X, LogOut, ChevronDown, PlusCircle } from 'lucide-react';
import { User, loginWithGoogle, logout, OWNER_EMAIL } from '../firebase';
import { GENRES } from '../constants';
import AdminModal from './AdminModal';

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const currentGenre = searchParams.get('genre');

  return (
    <>
      <nav className="sticky top-0 z-[100] h-24 flex items-center glass-panel border-b-0">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-rose-600 p-2.5 rounded-xl shadow-lg shadow-rose-600/40">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-3xl lg:text-4xl font-black brand-font italic uppercase tracking-tighter">
              FLIX<span className="text-rose-600">A</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            <div className="relative group">
              <button 
                onClick={() => setIsGenreOpen(!isGenreOpen)}
                className={`flex items-center gap-2 font-black uppercase text-xs tracking-widest transition-all ${currentGenre ? 'text-rose-600' : 'text-slate-400 hover:text-white'}`}
              >
                {currentGenre || 'Janrlar'} <ChevronDown className="w-4 h-4" />
              </button>
              {isGenreOpen && (
                <div className="absolute top-full left-0 mt-6 w-64 glass-panel rounded-2xl p-4 shadow-2xl animate-in zoom-in-95">
                  <div className="grid grid-cols-1 gap-1">
                    {GENRES.map(genre => (
                      <Link 
                        key={genre} 
                        to={`/?genre=${genre}`} 
                        onClick={() => setIsGenreOpen(false)}
                        className="px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-rose-600 transition-all"
                      >
                        {genre}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link to="/" className="text-slate-400 hover:text-white font-black uppercase text-xs tracking-widest transition-all">Filmlar</Link>
            <Link to="/" className="text-slate-400 hover:text-white font-black uppercase text-xs tracking-widest transition-all">Seriallar</Link>
          </div>

          {/* Search & Profile */}
          <div className="flex items-center gap-6">
            <form onSubmit={handleSearch} className="hidden xl:block relative group">
              <input 
                type="text" 
                placeholder="Qidiruv..." 
                className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3.5 w-64 focus:w-80 transition-all focus:outline-none focus:ring-2 focus:ring-rose-600 focus:bg-white/10 font-bold text-sm"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-rose-600" />
            </form>

            {user?.email === OWNER_EMAIL && (
              <button onClick={() => setIsAdminOpen(true)} className="bg-rose-600 p-3.5 rounded-2xl hover:scale-110 transition-transform shadow-lg shadow-rose-600/30">
                <PlusCircle className="w-5 h-5" />
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
                <img src={user.photoURL || ''} className="w-10 h-10 rounded-xl border border-rose-600/30" alt="Avatar" />
                <button onClick={() => logout()} className="p-3 hover:bg-rose-600 rounded-xl transition-all"><LogOut className="w-4 h-4" /></button>
              </div>
            ) : (
              <button onClick={() => loginWithGoogle()} className="bg-white text-black px-8 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-rose-600 hover:text-white transition-all">Kirish</button>
            )}

            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2"><Menu className="w-7 h-7" /></button>
          </div>
        </div>
      </nav>

      {/* Admin Modal */}
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-[#030712] p-8 flex flex-col space-y-10 animate-in slide-in-from-right">
          <div className="flex justify-between items-center">
            <span className="text-3xl font-black brand-font italic">MENYU</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-white/5 rounded-2xl"><X className="w-8 h-8" /></button>
          </div>
          <form onSubmit={handleSearch} className="relative">
            <input 
              type="text" 
              placeholder="Kino qidirish..." 
              className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-6 font-bold text-lg"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-rose-600" />
          </form>
          <div className="grid grid-cols-2 gap-4">
            {GENRES.map(genre => (
              <Link 
                key={genre} 
                to={`/?genre=${genre}`} 
                onClick={() => setIsMenuOpen(false)}
                className="bg-white/5 p-6 rounded-[2rem] text-center font-black uppercase text-[10px] tracking-widest hover:bg-rose-600 transition-colors"
              >
                {genre}
              </Link>
            ))}
          </div>
          <div className="mt-auto">
            {user ? (
              <button onClick={logout} className="w-full bg-white/5 py-5 rounded-3xl font-bold text-slate-500 uppercase">Chiqish</button>
            ) : (
              <button onClick={loginWithGoogle} className="w-full bg-white text-black py-6 rounded-3xl font-black uppercase tracking-widest">KIRISH</button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;