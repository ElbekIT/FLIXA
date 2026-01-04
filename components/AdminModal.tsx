
import React, { useState } from 'react';
import { X, Film, Link as LinkIcon, Type, Image as ImageIcon, Check, Globe, Calendar, Clock, Star, ShieldCheck, Info } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Genre } from '../types';

// Helper component for form input groups
// Fixed: Defined InputGroup at the top to ensure types are resolved before use in JSX.
const InputGroup = ({ label, icon, children }: { label: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <div className="space-y-3">
    <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-[0.3em] ml-2">
      {icon} {label}
    </label>
    {children}
  </div>
);

// Custom Loader component
const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
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
        views: Math.floor(Math.random() * 1000)
      });
      alert("FLIXA: Yangi film muvaffaqiyatli tizimga kiritildi!");
      onClose();
    } catch (error) {
      console.error("Owner Error:", error);
      alert("Xatolik: Ma'lumotlarni yozishda xato yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  const genres = Object.values(Genre);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl" onClick={onClose}></div>
      <div className="relative w-full max-w-3xl bg-slate-900 border border-white/10 rounded-[3rem] shadow-[0_0_100px_rgba(244,63,94,0.15)] overflow-hidden max-h-[95vh] flex flex-col animate-in zoom-in duration-500">
        
        {/* Header */}
        <div className="p-8 lg:p-10 border-b border-white/5 flex items-center justify-between bg-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><ShieldCheck className="w-24 h-24" /></div>
          <div className="flex items-center gap-5">
            <div className="p-4 bg-rose-600 rounded-2xl shadow-lg shadow-rose-600/30"><Film className="w-6 h-6 text-white" /></div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter font-heading">Film Studio <span className="text-rose-600">Panel</span></h2>
              <p className="text-[10px] font-black text-rose-500/60 uppercase tracking-[0.3em] mt-1">Owner: qoriyevagavharoy@gmail.com</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all border border-transparent hover:border-white/5"><X className="w-8 h-8" /></button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 lg:p-12 overflow-y-auto space-y-10 no-scrollbar">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Title */}
            <InputGroup label="Film Nomi" icon={<Type className="w-4 h-4" />}>
              <input required className="input-flixa" placeholder="Masalan: Qasoskorlar" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </InputGroup>

            {/* Poster */}
            <InputGroup label="Poster URL" icon={<ImageIcon className="w-4 h-4" />}>
              <input required className="input-flixa" placeholder="https://rasm-manzili.jpg" value={formData.poster} onChange={e => setFormData({...formData, poster: e.target.value})} />
            </InputGroup>

            {/* TG Link */}
            <InputGroup label="Telegram Video Manzili" icon={<LinkIcon className="w-4 h-4" />}>
              <input required className="input-flixa" placeholder="https://t.me/kanal/123" value={formData.telegramVideoUrl} onChange={e => setFormData({...formData, telegramVideoUrl: e.target.value})} />
            </InputGroup>

            {/* Rating */}
            <InputGroup label="Reyting (1-10)" icon={<Star className="w-4 h-4" />}>
              <input type="number" step="0.1" className="input-flixa" value={formData.rating} onChange={e => setFormData({...formData, rating: parseFloat(e.target.value)})} />
            </InputGroup>

            {/* Year */}
            <InputGroup label="Chiqarilgan Yili" icon={<Calendar className="w-4 h-4" />}>
              <input type="number" className="input-flixa" value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value)})} />
            </InputGroup>

            {/* Language */}
            <InputGroup label="Film Tili" icon={<Globe className="w-4 h-4" />}>
              <input className="input-flixa" value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})} />
            </InputGroup>

            {/* Duration */}
            <InputGroup label="Davomiyligi" icon={<Clock className="w-4 h-4" />}>
              <input className="input-flixa" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
            </InputGroup>

            {/* Age */}
            <InputGroup label="Yosh Chegarasi" icon={<ShieldCheck className="w-4 h-4" />}>
              <select className="input-flixa appearance-none" value={formData.ageLimit} onChange={e => setFormData({...formData, ageLimit: e.target.value})}>
                {["6+", "12+", "16+", "18+"].map(a => <option key={a} value={a} className="bg-slate-900">{a}</option>)}
              </select>
            </InputGroup>
          </div>

          {/* Genres */}
          <div className="space-y-4">
             <label className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Film Janrlarini Tanlang</label>
             <div className="flex flex-wrap gap-3 p-6 glass rounded-3xl border border-white/5">
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
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${formData.genre.includes(g as any) ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-600/30' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}
                  >
                    {g}
                  </button>
                ))}
             </div>
          </div>

          {/* Description */}
          {/* Fixed: Info icon was missing in imports, added to lucide-react import list. */}
          <InputGroup label="Film Haqida Tavsif" icon={<Info className="w-4 h-4" />}>
            <textarea rows={4} className="input-flixa resize-none py-4" placeholder="Film syujeti haqida qisqacha..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </InputGroup>

          {/* Submit */}
          <button 
            disabled={loading} 
            type="submit" 
            className="w-full py-6 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-800 rounded-3xl font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all shadow-2xl shadow-rose-600/30 active:scale-95 group"
          >
            {loading ? (
              <Loader2 className="w-7 h-7 animate-spin" />
            ) : (
              <>
                <Check className="w-7 h-7 group-hover:scale-125 transition-transform" /> 
                FLIXA'ga JOYLASHTIRISH
              </>
            )}
          </button>
        </form>
      </div>

      <style>{`
        .input-flixa {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.25rem;
          padding: 1rem 1.25rem;
          color: white;
          font-weight: 700;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          outline: none;
        }
        .input-flixa:focus {
          border-color: #f43f5e;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 20px rgba(244, 63, 94, 0.1);
        }
      `}</style>
    </div>
  );
};

export default AdminModal;
