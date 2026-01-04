import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Movie } from '../types';
import { Play, Star, Clock, Calendar, Download, Share2, Info, ChevronLeft, Loader2, ExternalLink } from 'lucide-react';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, "movies", id));
        if (snap.exists()) setMovie({ id: snap.id, ...snap.data() } as Movie);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
    window.scrollTo(0, 0);
  }, [id]);

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('t.me/')) {
      const parts = url.split('t.me/')[1];
      return `https://t.me/${parts}?embed=1`;
    }
    return url;
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#030712]"><Loader2 className="w-12 h-12 text-rose-600 animate-spin" /></div>;
  if (!movie) return <div className="h-screen flex flex-col items-center justify-center gap-6"><h2 className="text-4xl font-black uppercase">Topilmadi</h2><button onClick={() => navigate('/')} className="bg-rose-600 px-8 py-3 rounded-2xl">Orqaga</button></div>;

  return (
    <div className="animate-in fade-in duration-1000 bg-[#030712]">
      {/* Background Blur Hero */}
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0 z-0">
          <img src={movie.poster} className="w-full h-full object-cover brightness-[0.2] blur-3xl" alt="Blur" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 h-full flex flex-col lg:flex-row items-center lg:items-end pb-12 gap-12 lg:gap-20">
          <div className="w-48 sm:w-64 lg:w-96 aspect-[2/3] rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] border-4 border-white/5 shrink-0 mt-20 lg:mt-0">
            <img src={movie.poster} className="w-full h-full object-cover" alt={movie.title} />
          </div>

          <div className="flex-1 space-y-6 lg:space-y-10 text-center lg:text-left">
            <h1 className="text-4xl sm:text-6xl lg:text-9xl font-black brand-font italic uppercase leading-none drop-shadow-2xl">
              {movie.title}
            </h1>
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 lg:gap-12 text-slate-300 font-bold text-sm lg:text-xl">
               <span className="flex items-center gap-2 text-rose-500 bg-rose-600/10 px-5 py-2.5 rounded-2xl border border-rose-600/20">
                 <Star className="w-6 h-6 fill-rose-500" /> {movie.rating || '8.5'}
               </span>
               <span className="flex items-center gap-3"><Clock className="w-7 h-7 text-rose-500" /> {movie.duration}</span>
               <span className="flex items-center gap-3"><Calendar className="w-7 h-7 text-rose-500" /> {movie.year}</span>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button onClick={() => setIsPlaying(true)} className="px-14 py-6 bg-white text-black font-black rounded-3xl uppercase tracking-widest text-sm flex items-center gap-4 hover:bg-rose-600 hover:text-white transition-all shadow-2xl">
                <Play className="w-6 h-6 fill-current" /> HOZIR KO'RISH
              </button>
              <button className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all"><Share2 className="w-6 h-6" /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-8 space-y-20">
          {/* Player */}
          <section id="player" className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-3 h-10 bg-rose-600 rounded-full"></div>
              <h2 className="text-3xl lg:text-5xl font-black brand-font uppercase italic">Online Player</h2>
            </div>
            <div className="aspect-video glass-panel rounded-[3rem] lg:rounded-[4rem] overflow-hidden bg-black shadow-2xl">
              {!isPlaying ? (
                <div onClick={() => setIsPlaying(true)} className="w-full h-full flex items-center justify-center cursor-pointer relative group">
                  <img src={movie.poster} className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Preview" />
                  <div className="relative bg-rose-600 p-12 rounded-full shadow-[0_0_60px_rgba(225,29,72,0.6)] group-hover:scale-110 transition-all">
                    <Play className="w-16 h-16 fill-white" />
                  </div>
                </div>
              ) : (
                <iframe 
                  src={getEmbedUrl(movie.telegramVideoUrl)} 
                  className="w-full h-full border-none"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </section>

          {/* Description */}
          <div className="glass-panel p-10 lg:p-20 rounded-[4rem] border border-white/5">
            <h3 className="text-2xl font-black uppercase mb-8 flex items-center gap-4 tracking-widest">
              <Info className="w-6 h-6 text-rose-500" /> Kino Mazmuni
            </h3>
            <p className="text-slate-400 leading-[2] text-xl font-medium first-letter:text-5xl first-letter:font-black first-letter:text-rose-600 first-letter:mr-3 first-letter:float-left">
              {movie.description}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          <div className="glass-panel p-10 rounded-[3rem] border border-white/5 space-y-10 sticky top-32">
            <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.5em] border-b border-white/5 pb-5">Texnik Ma'lumotlar</h4>
            <div className="space-y-6">
              <DetailRow label="Original Nom" value={movie.originalTitle || movie.title} />
              <DetailRow label="Ishlab chiqarilgan" value={movie.country || 'USA'} />
              <DetailRow label="Film Tili" value={movie.language || "O'zbek tili"} />
              <DetailRow label="Sifat" value="4K ULTRA HD" highlight />
              <DetailRow label="Yosh" value={movie.ageLimit || '16+'} />
            </div>
            <button className="w-full bg-rose-600 py-6 rounded-3xl font-black uppercase text-sm flex items-center justify-center gap-4 hover:bg-rose-700 transition-all">
              <Download className="w-6 h-6" /> Yuklab Olish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{label}</span>
    <span className={`text-base font-black ${highlight ? 'text-rose-600' : 'text-slate-200'}`}>{value}</span>
  </div>
);

export default MovieDetail;