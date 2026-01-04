
import React, { useState } from 'react';
import { Search, LogOut, Menu, X, ChevronDown, PlusSquare, ShieldCheck } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isOwner = user?.email === OWNER_EMAIL;

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
      <nav className="sticky top-0 z-50 glass border-b border-white/5 h-24 flex items-center">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-12 w-full flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-rose-600 blur-2xl opacity-40 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-rose-600 p-3 rounded-2xl shadow-xl">
                 <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
            </div>
            <span className="text-3xl lg:text-5xl font-black tracking-tighter text-white uppercase italic font-heading">
              FLIX<span className="text-rose-600">A</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center space-x-12">
            <div className="relative">
              <button 
                onClick={() => setIsGenreOpen(!isGenreOpen)}
                className={`flex items-center space-x-2 font-black tracking-[0.1em] text-sm uppercase transition-all ${isGenreOpen || currentGenre ? 'text-rose-500' : 'text-slate-400 hover:text-white'}`}
              >
                <span>{currentGenre || 'Katalog'}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isGenreOpen ? 'rotate-180' : ''}`} />
              </button>
              {isGenreOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-8 w-[450px] glass rounded-[2.5rem] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.6)] animate-in zoom-in duration-200 border border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/" onClick={() => setIsGenreOpen(false)} className="px-5 py-4 text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-rose-600 rounded-2xl transition-all">Barchasi</Link>
                    {GENRES.map(genre => (
                      <Link key={genre} to={`/?genre=${genre}`} onClick={() => setIsGenreOpen(false)} className={`px-5 py-4 text-xs font-black uppercase tracking-widest rounded-2xl transition-all ${currentGenre === genre ? 'bg-rose-600 text-white' : 'bg-white/5 hover:bg-white/10 text-slate-300'}`}>{genre}</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link to="/" className="text-slate-400 hover:text-white font-black text-sm uppercase tracking-widest transition-colors">Trendlar</Link>
            <Link to="/" className="text-slate-400 hover:text-white font-black text-sm uppercase tracking-widest transition-colors">Premyeralar</Link>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-6">
            <form onSubmit={handleSearch} className="relative group hidden lg:block w-64 xl:w-80">
              <input type="text" placeholder="Qidiruv..." className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-6 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-600 focus:bg-white/10 transition-all font-bold text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-rose-600 w-4 h-4" />
            </form>

            {isOwner && (
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="hidden sm:flex items-center gap-2.5 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.1em] transition-all shadow-xl shadow-rose-600/30"
              >
                <PlusSquare className="w-5 h-5" />
                <span>Studio</span>
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1 rounded-2xl">
                <div className="flex items-center gap-3 px-3">
                  <img src={user.photoURL || ''} alt="User" className="w-10 h-10 rounded-xl border border-rose-600/30" />
                  {isOwner && <ShieldCheck className="w-4 h-4 text-rose-500" />}
                </div>
                <button onClick={() => logout()} className="p-3.5 hover:bg-rose-600 rounded-xl transition-all group">
                  <LogOut className="w-5 h-5 text-slate-500 group-hover:text-white" />
                </button>
              </div>
            ) : (
              <button onClick={() => loginWithGoogle()} className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all">Kirish</button>
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="xl:hidden text-white">
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Admin Modal */}
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-950/98 backdrop-blur-3xl xl:hidden p-10 flex flex-col space-y-10 animate-in slide-in-from-right duration-300">
           <div className="flex justify-between items-center mb-10">
              <span className="text-3xl font-black text-white italic">MENU</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-white/5 rounded-2xl"><X className="w-8 h-8" /></button>
           </div>
           
           <form onSubmit={handleSearch} className="relative">
              <input type="text" placeholder="Qidiruv..." className="w-full bg-white/5 border border-white/10 text-white pl-14 py-5 rounded-3xl text-lg font-black" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-600 w-6 h-6" />
           </form>

           <div className="grid grid-cols-2 gap-4 overflow-y-auto">
              {GENRES.map(genre => (
                <Link key={genre} to={`/?genre=${genre}`} onClick={() => setIsMenuOpen(false)} className="bg-white/5 p-6 rounded-3xl text-center font-black uppercase text-[10px] tracking-widest hover:bg-rose-600 transition-colors">{genre}</Link>
              ))}
           </div>

           {isOwner && (
             <button onClick={() => { setIsAdminOpen(true); setIsMenuOpen(false); }} className="w-full bg-rose-600 py-6 rounded-3xl font-black uppercase text-xl tracking-tighter flex items-center justify-center gap-3">
               <PlusSquare className="w-7 h-7" /> STUDIO PANEL
             </button>
           )}

           <div className="mt-auto border-t border-white/5 pt-10">
              {user ? (
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full text-slate-500 font-black py-5 uppercase tracking-widest text-sm">Chiqish</button>
              ) : (
                <button onClick={() => { loginWithGoogle(); setIsMenuOpen(false); }} className="w-full bg-white text-slate-950 py-6 rounded-3xl font-black uppercase tracking-widest">KIRISH</button>
              )}
           </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
