
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar, Globe, Play, Share2, Download, Info, Clapperboard, ChevronLeft, Zap, ExternalLink } from 'lucide-react';
import { doc, getDoc, collection, query, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Movie } from '../types';
import { getMovieRecommendations } from '../services/geminiService';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, "movies", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMovie({ id: docSnap.id, ...docSnap.data() } as Movie);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (movie) {
      getMovieRecommendations(movie.genre?.[0] || 'Kino').then(setRecommendations);
    }
  }, [movie]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-12 h-12 border-4 border-rose-600/20 border-t-rose-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto">
             <Clapperboard className="w-12 h-12 text-slate-700" />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Film topilmadi</h2>
          <button onClick={() => navigate('/')} className="px-8 py-4 bg-rose-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs">Bosh sahifaga qaytish</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-1000 bg-slate-950 pb-20">
      
      {/* Hero Header */}
      <div className="relative h-[60vh] lg:h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/90 via-transparent to-transparent"></div>
        <img src={movie.poster} className="w-full h-full object-cover scale-110 blur-xl opacity-20" alt="" />
        
        <div className="absolute inset-0 z-20 flex items-center lg:items-end">
           <div className="max-w-[1800px] mx-auto px-6 lg:px-12 w-full pb-10 lg:pb-24">
              <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10 lg:gap-16">
                 
                 {/* Poster */}
                 <div className="w-48 sm:w-64 lg:w-80 aspect-[2/3] rounded-[2rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border-4 border-white/5 relative group shrink-0">
                    <img src={movie.poster} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={movie.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </div>

                 {/* Movie Info */}
                 <div className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left">
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                      {movie.genre?.map(g => (
                        <span key={g} className="px-4 py-1.5 bg-rose-600 text-white text-[10px] lg:text-xs font-black rounded-xl uppercase tracking-widest shadow-lg shadow-rose-600/30">
                          {g}
                        </span>
                      ))}
                    </div>
                    
                    <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.9] font-heading drop-shadow-2xl">
                       {movie.title}
                    </h1>

                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 lg:gap-10 text-slate-300 font-bold text-sm lg:text-lg">
                       <span className="flex items-center gap-2 text-rose-500 bg-rose-500/10 px-4 py-2 rounded-2xl border border-rose-500/20">
                         <Star className="w-5 h-5 fill-rose-500" /> {movie.rating || '8.5'}
                       </span>
                       <span className="flex items-center gap-2"><Clock className="w-5 lg:w-6 h-5 lg:h-6 text-rose-500" /> {movie.duration || '02:00:00'}</span>
                       <span className="flex items-center gap-2"><Calendar className="w-5 lg:w-6 h-5 lg:h-6 text-rose-500" /> {movie.year}</span>
                    </div>

                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                       <button 
                         onClick={() => setIsPlaying(true)}
                         className="px-10 py-5 bg-white text-slate-950 font-black rounded-3xl uppercase tracking-widest text-xs lg:text-sm flex items-center gap-3 hover:bg-rose-600 hover:text-white transition-all active:scale-95 shadow-2xl shadow-white/10"
                       >
                          <Play className="w-5 h-5 fill-current" /> HOZIR KO'RISH
                       </button>
                       <button className="p-5 bg-white/5 border border-white/10 rounded-3xl text-white hover:bg-white/10 transition-all active:scale-95">
                          <Share2 className="w-5 h-5" />
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8 space-y-16">
            
            {/* Player Section */}
            <div id="player" className="space-y-8 scroll-mt-32">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl lg:text-4xl font-black text-white flex items-center gap-4 uppercase tracking-tighter font-heading">
                  <div className="w-3 h-8 lg:h-10 bg-rose-600 rounded-full shadow-[0_0_20px_rgba(244,63,94,0.5)]"></div>
                  Premium Player
                </h2>
              </div>

              <div className="relative aspect-video glass rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden border border-white/10 player-glow group">
                {!isPlaying ? (
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                    onClick={() => setIsPlaying(true)}
                  >
                     <img src={`https://picsum.photos/seed/${movie.id}/1920/1080`} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000" alt="Preview" />
                     <div className="absolute inset-0 bg-slate-950/50"></div>
                     <div className="relative z-10 bg-rose-600 p-8 lg:p-12 rounded-full shadow-[0_0_60px_rgba(244,63,94,0.7)] transform group-hover:scale-110 transition-all duration-500">
                        <Play className="w-10 lg:w-16 h-10 lg:h-16 text-white fill-current" />
                     </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 p-6 lg:p-20 text-center">
                     <div className="relative mb-10">
                        <div className="absolute inset-0 bg-rose-600 blur-3xl opacity-30 animate-pulse"></div>
                        <div className="relative p-6 bg-rose-600/10 rounded-full border border-rose-600/20">
                          <Clapperboard className="w-16 lg:w-24 h-16 lg:h-24 text-rose-500" />
                        </div>
                     </div>
                     <h3 className="text-4xl lg:text-6xl font-black mb-6 uppercase tracking-tighter italic font-heading">FLIXA STREAM</h3>
                     <p className="text-slate-500 max-w-xl text-lg lg:text-2xl font-medium leading-relaxed mb-10">
                       Ushbu video Telegram kanaldan olinmoqda. 
                       Davom etish uchun quyidagi tugmani bosing.
                     </p>
                     
                     <div className="flex flex-col sm:flex-row gap-4">
                       <a 
                         href={movie.telegramVideoUrl} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="px-12 py-5 bg-rose-600 text-white font-black rounded-3xl uppercase tracking-widest text-sm flex items-center gap-3 hover:bg-rose-700 transition-all shadow-2xl shadow-rose-600/40"
                       >
                         <ExternalLink className="w-5 h-5" /> TELEGRAMDA KO'RISH
                       </a>
                       <button 
                         onClick={() => setIsPlaying(false)}
                         className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-3xl uppercase tracking-widest text-sm hover:bg-white/10 transition-all"
                       >
                         TAVSIFGA QAYTISH
                       </button>
                     </div>
                  </div>
                )}
              </div>
            </div>

            {/* Synopsis */}
            <div className="glass p-10 lg:p-16 rounded-[3rem] lg:rounded-[4rem] border border-white/5 space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <Info className="w-64 h-64 text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-black text-white flex items-center gap-4 uppercase tracking-widest">
                <Zap className="w-6 lg:w-8 h-6 lg:h-8 text-rose-500 fill-rose-500" /> Mazmuni
              </h2>
              <p className="text-slate-400 leading-[1.8] text-lg lg:text-2xl font-medium relative z-10">{movie.description}</p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            {/* Meta Card */}
            <div className="glass rounded-[3rem] p-10 border border-white/5 space-y-8 sticky top-32">
               <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] border-b border-white/5 pb-4">Film texnik ma'lumotlari</h4>
               <div className="space-y-6">
                  <DetailRow label="Original Nomi" value={movie.originalTitle || movie.title} />
                  <DetailRow label="Davlat" value={movie.country || 'Noma\'lum'} />
                  <DetailRow label="Til" value={movie.language || "O'zbek tili"} />
                  <DetailRow label="Sifat" value="4K ULTRA HD" highlight />
                  <DetailRow label="Yosh chegarasi" value={movie.ageLimit || '16+'} />
                  <DetailRow label="Janrlar" value={movie.genre?.join(', ') || 'Noma\'lum'} />
               </div>

               <div className="pt-8 space-y-4">
                  <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-6 rounded-3xl shadow-2xl shadow-rose-600/30 flex items-center justify-center gap-4 transition-all active:scale-95 text-sm uppercase tracking-widest">
                    <Download className="w-6 h-6" /> YUKLAB OLISH
                  </button>
               </div>

               {/* AI Recommendations - Smart Sidebar */}
               {recommendations.length > 0 && (
                 <div className="mt-12 space-y-6">
                   <h3 className="text-rose-500 font-black flex items-center gap-3 uppercase tracking-[0.2em] text-xs">
                     <Sparkles className="w-4 h-4" /> AI Tavsiyalari
                   </h3>
                   <div className="space-y-3">
                     {recommendations.slice(0, 3).map((rec, i) => (
                       <div key={i} className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-xs font-bold text-slate-300 flex items-center gap-4 group cursor-default">
                         <div className="w-1.5 h-1.5 bg-rose-600 rounded-full group-hover:scale-150 transition-transform"></div>
                         {rec.replace(/^\d+\.\s*/, '')}
                       </div>
                     ))}
                   </div>
                 </div>
               )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{label}</span>
    <span className={`text-sm lg:text-base font-black tracking-tight ${highlight ? 'text-rose-500' : 'text-slate-200'}`}>{value}</span>
  </div>
);

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

export default MovieDetail;
