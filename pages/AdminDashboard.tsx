
import React, { useState } from 'react';
import { Movie, GENRES } from '../types';

interface AdminDashboardProps {
  movies: Movie[];
  onAddMovie: (movie: Movie) => void;
  onDeleteMovie: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ movies, onAddMovie, onDeleteMovie }) => {
  const [formData, setFormData] = useState({
    title: '',
    posterUrl: '',
    videoUrl: '',
    genres: [] as string[],
    year: new Date().getFullYear(),
    country: 'AQSH',
    language: "O'zbek",
    duration: '',
    ageRating: '16+',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMovie: Movie = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      likes: 0,
      views: 0,
      createdAt: Date.now()
    };
    onAddMovie(newMovie);
    setFormData({
      title: '',
      posterUrl: '',
      videoUrl: '',
      genres: [],
      year: new Date().getFullYear(),
      country: 'AQSH',
      language: "O'zbek",
      duration: '',
      ageRating: '16+',
      description: ''
    });
    alert('Film muvaffaqiyatli qo\'shildi!');
  };

  const toggleGenre = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre) 
        ? prev.genres.filter(g => g !== genre) 
        : [...prev.genres, genre]
    }));
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between border-b border-gray-800 pb-6">
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
          ADMIN PANEL
        </h1>
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Tizim egasi</p>
          <p className="text-blue-500 font-bold">Gavharoy Qoriyeva</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Form Section */}
        <div className="glass-morphism p-8 rounded-3xl border border-blue-500/20 shadow-2xl shadow-blue-500/5">
          <h2 className="text-xl font-bold mb-8 text-white flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
            Yangi film qo'shish
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Film nomi</label>
              <input 
                required
                className="w-full bg-black/40 border border-gray-800 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Poster URL</label>
                <input 
                  required
                  placeholder="https://..."
                  className="w-full bg-black/40 border border-gray-800 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all"
                  value={formData.posterUrl}
                  onChange={e => setFormData({...formData, posterUrl: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Telegram Video Link</label>
                <input 
                  required
                  placeholder="https://t.me/..."
                  className="w-full bg-black/40 border border-gray-800 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all"
                  value={formData.videoUrl}
                  onChange={e => setFormData({...formData, videoUrl: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Janrlar</label>
              <div className="flex flex-wrap gap-2 p-4 bg-black/20 rounded-2xl border border-gray-800">
                {GENRES.filter(g => g !== 'Barchasi').map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGenre(g)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                      formData.genres.includes(g) ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-500 hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Yil</label>
                <input 
                  type="number"
                  className="w-full bg-black/40 border border-gray-800 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all"
                  value={formData.year}
                  onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Yosh</label>
                <select 
                  className="w-full bg-black/40 border border-gray-800 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all"
                  value={formData.ageRating}
                  onChange={e => setFormData({...formData, ageRating: e.target.value})}
                >
                  <option>0+</option><option>6+</option><option>12+</option><option>16+</option><option>18+</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Davomiyligi (e.g. 2s 15m)</label>
                <input 
                  className="w-full bg-black/40 border border-gray-800 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all"
                  value={formData.duration}
                  onChange={e => setFormData({...formData, duration: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Film haqida</label>
              <textarea 
                rows={4}
                className="w-full bg-black/40 border border-gray-800 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all resize-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 transition-all transform active:scale-95">
              FILMNI BAZAGA QO'SHISH
            </button>
          </form>
        </div>

        {/* List Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-1 h-6 bg-red-500 rounded-full"></span>
            Mavjud filmlar ({movies.length})
          </h2>
          <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            {movies.map(m => (
              <div key={m.id} className="glass-morphism p-4 rounded-2xl border border-gray-800 flex items-center gap-4 group">
                <img src={m.posterUrl} className="w-16 h-20 object-cover rounded-lg" alt={m.title} />
                <div className="flex-grow">
                  <h3 className="font-bold text-white">{m.title}</h3>
                  <p className="text-xs text-gray-500">{m.year} • {m.genres.join(', ')}</p>
                </div>
                <button 
                  onClick={() => onDeleteMovie(m.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
