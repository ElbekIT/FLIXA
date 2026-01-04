
import React, { useState } from 'react';
import { X, Film, Link as LinkIcon, Type, Image as ImageIcon, Check, Globe, Calendar, Clock, Star, ShieldCheck, Info, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Genre } from '../types';

// Fixed: Explicitly typed InputGroup to resolve "missing children" property error in JSX.
interface InputGroupProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, icon, children }) => (
  <div className="space-y-3">
    <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-[0.3em] ml-2">
      {icon} {label}
    </label>
    {children}
  </div>
);

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    originalTitle: '',
    poster: '',
    telegramVideoUrl: '',
    description: '',
    genre: [Genre.Jangari],
    year: new Date().getFullYear(),
    country: 'AQSH',
    language: "O'zbek tili",
    duration: '02:00:00',
    ageLimit: '16+',
    rating: 8.5
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "movies"), {
        ...formData,
        createdAt: new Date().toISOString(),
        views: Math.floor(Math.random() * 500)
      });
      alert("FLIXA: Film muvaffaqiyatli bazaga qo'shildi!");
      onClose();
    } catch (error) {
      console.error("Owner Error:", error);
      alert("Xatolik: Ma'lumotlarni saqlashda muammo yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  const genres = Object.values(Genre);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-[#020617] border border-white/10 rounded-[3rem] shadow-[0_0_100px_rgba(244,63,94,0.15)] overflow-hidden max-h-[95vh] flex flex-col animate-in zoom-in duration-500">
        
        {/* Header */}
        <div className="p-8 lg:p-12 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-rose-600 rounded-[1.5rem] shadow-xl shadow-rose-600/30"><Film className="w-7 h-7 text-white" /></div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter font-heading">Film Studio <span className="text-rose-600">Pro</span></h2>
              <p className="text-[10px] font-black text-rose-500/60 uppercase tracking-[0.5em] mt-1">Owner Mode: Aktif</p>
            </div>
          </div>
          <button onClick={onClose} className="p-4 hover:bg-white/10 rounded-2xl transition-all"><X className="w-8 h-8" /></button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-10 lg:p-16 overflow-y-auto space-y-12 no-scrollbar">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            
            <InputGroup label="Filmning Asosiy Nomi" icon={<Type className="w-4 h-4" />}>
              <input required className="input-flixa" placeholder="Nomi..." value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </InputGroup>

            <InputGroup label="Original Nom (Agar bo'lsa)" icon={<Globe className="w-4 h-4" />}>
              <input className="input-flixa" placeholder="Avengers..." value={formData.originalTitle} onChange={e => setFormData({...formData, originalTitle: e.target.value})} />
            </InputGroup>

            <InputGroup label="Poster Rasmi URL" icon={<ImageIcon className="w-4 h-4" />}>
              <input required className="input-flixa" placeholder="https://..." value={formData.poster} onChange={e => setFormData({...formData, poster: e.target.value})} />
            </InputGroup>

            <InputGroup label="Telegram Video Manzili" icon={<LinkIcon className="w-4 h-4" />}>
              <input required className="input-flixa" placeholder="https://t.me/channel/123" value={formData.telegramVideoUrl} onChange={e => setFormData({...formData, telegramVideoUrl: e.target.value})} />
            </InputGroup>

            <InputGroup label="Yili" icon={<Calendar className="w-4 h-4" />}>
              <input type="number" className="input-flixa" value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value)})} />
            </InputGroup>

            <InputGroup label="Reyting" icon={<Star className="w-4 h-4" />}>
              <input type="number" step="0.1" className="input-flixa" value={formData.rating} onChange={e => setFormData({...formData, rating: parseFloat(e.target.value)})} />
            </InputGroup>
          </div>

          <div className="space-y-5">
             <label className="text-xs font-black text-slate-500 uppercase tracking-[0.5em] ml-2">Janrlar</label>
             <div className="flex flex-wrap gap-4 p-8 glass rounded-[2.5rem] border border-white/5">
                {genres.map(g => (
                  <button 
                    key={g}
                    type="button"
                    onClick={() => {
                      const newGenres = formData.genre.includes(g as any) 
                        ? formData.genre.filter(item => item !== g)
                        : [...formData.genre, g];
                      setFormData({...formData, genre: newGenres as any});
                    }}
                    className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border ${formData.genre.includes(g as any) ? 'bg-rose-600 border-rose-600 text-white shadow-xl shadow-rose-600/30' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}
                  >
                    {g}
                  </button>
                ))}
             </div>
          </div>

          <InputGroup label="Film Tavsifi" icon={<Info className="w-4 h-4" />}>
            <textarea rows={5} className="input-flixa resize-none py-5" placeholder="Qisqacha mazmuni..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </InputGroup>

          <button 
            disabled={loading} 
            type="submit" 
            className="w-full py-7 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-800 rounded-[2.5rem] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-5 transition-all shadow-2xl shadow-rose-600/40 active:scale-95 text-lg"
          >
            {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : <><Check className="w-8 h-8" /> FILM QO'SHISH</>}
          </button>
        </form>
      </div>

      <style>{`
        .input-flixa {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.5rem;
          padding: 1.25rem 1.5rem;
          color: white;
          font-weight: 800;
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }
        .input-flixa:focus {
          border-color: #f43f5e;
          background: rgba(255, 255, 255, 0.07);
          box-shadow: 0 0 30px rgba(244, 63, 94, 0.15);
        }
      `}</style>
    </div>
  );
};

export default AdminModal;
