
import React, { useState } from 'react';
import { Search, User as UserIcon, LogOut, Menu, X, ChevronDown, PlusCircle, ShieldCheck } from 'lucide-react';
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
    }
  };

  const currentGenre = searchParams.get('genre');

  return (
    <>
      <nav className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-24">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-rose-600 blur-xl opacity-40 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative bg-rose-600 p-2.5 rounded-2xl">
                   <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
              </div>
              <span className="text-4xl font-black tracking-tighter text-white uppercase italic font-heading">
                FLIX<span className="text-rose-600">A</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center space-x-10">
              <div className="relative">
                <button 
                  onClick={() => setIsGenreOpen(!isGenreOpen)}
                  className={`flex items-center space-x-2 font-bold tracking-tight text-lg transition-all ${isGenreOpen || currentGenre ? 'text-rose-500' : 'text-slate-400 hover:text-white'}`}
                >
                  <span>{currentGenre || 'Katalog'}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isGenreOpen ? 'rotate-180' : ''}`} />
                </button>
                {isGenreOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[400px] glass rounded-[2rem] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                    <div className="grid grid-cols-2 gap-3">
                      <Link to="/" onClick={() => setIsGenreOpen(false)} className="px-4 py-3 text-sm font-bold bg-white/5 hover:bg-rose-600 rounded-xl transition-all">Hammasi</Link>
                      {GENRES.map(genre => (
                        <Link key={genre} to={`/?genre=${genre}`} onClick={() => setIsGenreOpen(false)} className={`px-4 py-3 text-sm font-bold rounded-xl transition-all ${currentGenre === genre ? 'bg-rose-600 text-white' : 'bg-white/5 hover:bg-white/10 text-slate-300'}`}>{genre}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link to="/" className="text-slate-400 hover:text-white font-bold text-lg transition-colors">Tredndagilar</Link>
              <Link to="/" className="text-slate-400 hover:text-white font-bold text-lg transition-colors">Premyeralar</Link>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-12 hidden lg:block">
              <form onSubmit={handleSearch} className="relative group">
                <input type="text" placeholder="Kinolar dunyosidan qidirish..." className="w-full bg-white/5 border border-white/10 text-white pl-14 pr-6 py-4 rounded-3xl focus:outline-none focus:ring-2 focus:ring-rose-600 focus:bg-white/10 transition-all font-medium text-lg" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-rose-600 w-5 h-5 transition-colors" />
              </form>
            </div>

            {/* User & Admin */}
            <div className="flex items-center space-x-6">
              {isOwner && (
                <button 
                  onClick={() => setIsAdminOpen(true)}
                  className="hidden md:flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-rose-600/30"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Qo'shish</span>
                </button>
              )}

              {user ? (
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 rounded-2xl">
                  <div className="flex items-center space-x-3 px-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-black text-white">{user.displayName?.split(' ')[0]}</p>
                      {isOwner && <p className="text-[9px] text-rose-500 font-black uppercase flex items-center justify-end gap-1"><ShieldCheck className="w-3 h-3" /> Owner</p>}
                    </div>
                    <img src={user.photoURL || ''} alt="User" className="w-10 h-10 rounded-xl border-2 border-rose-600/50 p-0.5" />
                  </div>
                  <button onClick={() => logout()} className="p-3 bg-white/5 hover:bg-rose-600 rounded-xl transition-all group">
                    <LogOut className="w-5 h-5 text-slate-500 group-hover:text-white" />
                  </button>
                </div>
              ) : (
                <button onClick={() => loginWithGoogle()} className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all">Kirish</button>
              )}

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="xl:hidden text-white p-2">
                {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Modal Component */}
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl px-8 pt-24 space-y-8 animate-in slide-in-from-top duration-500">
             {isOwner && (
               <button onClick={() => { setIsAdminOpen(true); setIsMenuOpen(false); }} className="w-full flex items-center justify-center space-x-3 bg-rose-600 py-5 rounded-3xl font-black uppercase text-xl tracking-tighter">
                 <PlusCircle className="w-6 h-6" /> <span>Film Qo'shish</span>
               </button>
             )}
             <div className="grid grid-cols-2 gap-4">
                {GENRES.map(genre => (
                  <Link key={genre} to={`/?genre=${genre}`} onClick={() => setIsMenuOpen(false)} className="bg-white/5 py-6 rounded-3xl text-center font-bold text-lg hover:bg-rose-600 transition-colors uppercase tracking-widest text-[10px]">{genre}</Link>
                ))}
             </div>
             {user ? (
               <button onClick={() => logout()} className="w-full text-slate-500 font-black py-4">Tizimdan Chiqish</button>
             ) : (
               <button onClick={loginWithGoogle} className="w-full bg-white text-slate-950 py-5 rounded-3xl font-black uppercase">Kirish</button>
             )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
