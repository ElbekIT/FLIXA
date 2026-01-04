
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar, Play, Share2, Download, Info, Clapperboard, Zap, ExternalLink, Loader2, Sparkles } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
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

  // Telegram linkini embed formatiga o'tkazish funksiyasi
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('t.me/')) {
      const parts = url.split('t.me/')[1];
      return `https://t.me/${parts}?embed=1`;
    }
    return url;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <Loader2 className="w-12 h-12 text-rose-600 animate-spin" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] px-6 text-center">
        <div className="space-y-6">
          <Clapperboard className="w-20 h-20 text-slate-800 mx-auto" />
          <h2 className="text-3xl font-black text-white uppercase italic">Film topilmadi</h2>
          <button onClick={() => navigate('/')} className="px-10 py-4 bg-rose-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs">Bosh sahifaga qaytish</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-1000 bg-[#020617] pb-20">
      
      {/* Cinematic Hero Header */}
      <div className="relative h-[65vh] lg:h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#020617] via-transparent to-transparent"></div>
        <img src={movie.poster} className="w-full h-full object-cover scale-110 blur-2xl opacity-20" alt="" />
        
        <div className="absolute inset-0 z-20 flex items-center lg:items-end">
           <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full pb-10 lg:pb-24">
              <div className="flex flex-col lg:flex-row items-center lg:items-end gap-10 lg:gap-20">
                 
                 {/* Poster Card */}
                 <div className="w-44 sm:w-56 lg:w-80 aspect-[2/3] rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] border-4 border-white/5 shrink-0 group">
                    <img src={movie.poster} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={movie.title} />
                 </div>

                 {/* Movie Info */}
                 <div className="flex-1 space-y-6 lg:space-y-10 text-center lg:text-left">
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                      {movie.genre?.map(g => (
                        <span key={g} className="px-5 py-2 bg-rose-600/20 text-rose-500 border border-rose-600/30 text-[10px] lg:text-xs font-black rounded-xl uppercase tracking-widest">
                          {g}
                        </span>
                      ))}
                    </div>
                    
                    <h1 className="text-4xl sm:text-6xl lg:text-9xl font-black text-white tracking-tighter uppercase italic leading-[0.85] font-heading drop-shadow-2xl">
                       {movie.title}
                    </h1>

                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 lg:gap-12 text-slate-300 font-bold text-sm lg:text-xl">
                       <span className="flex items-center gap-2 text-rose-500 bg-rose-600/10 px-5 py-2.5 rounded-2xl border border-rose-600/20">
                         <Star className="w-5 h-5 lg:w-6 lg:h-6 fill-rose-500" /> {movie.rating || '8.5'}
                       </span>
                       <span className="flex items-center gap-3"><Clock className="w-5 lg:w-7 h-5 lg:h-7 text-rose-500" /> {movie.duration}</span>
                       <span className="flex items-center gap-3"><Calendar className="w-5 lg:w-7 h-5 lg:h-7 text-rose-500" /> {movie.year}</span>
                    </div>

                    <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-4">
                       <button 
                         onClick={() => {
                           setIsPlaying(true);
                           document.getElementById('player')?.scrollIntoView({ behavior: 'smooth' });
                         }}
                         className="px-10 lg:px-14 py-5 lg:py-6 bg-white text-slate-950 font-black rounded-3xl uppercase tracking-widest text-xs lg:text-base flex items-center gap-4 hover:bg-rose-600 hover:text-white transition-all active:scale-95 shadow-2xl shadow-white/10"
                       >
                          <Play className="w-6 h-6 fill-current" /> HOZIR KO'RISH
                       </button>
                       <button className="p-5 lg:p-6 bg-white/5 border border-white/10 rounded-3xl text-white hover:bg-white/10 transition-all active:scale-95">
                          <Share2 className="w-6 h-6" />
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          <div className="lg:col-span-8 space-y-20">
            
            {/* Professional Video Player Section */}
            <div id="player" className="space-y-10 scroll-mt-32">
              <div className="flex items-center gap-5">
                <div className="w-3 h-10 bg-rose-600 rounded-full shadow-[0_0_25px_rgba(244,63,94,0.6)]"></div>
                <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter font-heading">Online Tomosha</h2>
              </div>

              <div className="relative aspect-video glass rounded-[3rem] lg:rounded-[4rem] overflow-hidden border border-white/10 player-glow bg-black">
                {!isPlaying ? (
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                    onClick={() => setIsPlaying(true)}
                  >
                     <img src={movie.poster} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-1000" alt="Preview" />
                     <div className="absolute inset-0 bg-[#020617]/60"></div>
                     <div className="relative z-10 bg-rose-600 p-10 lg:p-14 rounded-full shadow-[0_0_80px_rgba(244,63,94,0.8)] transform group-hover:scale-110 transition-all duration-500">
                        <Play className="w-12 lg:w-20 h-12 lg:h-20 text-white fill-current" />
                     </div>
                  </div>
                ) : (
                  <div className="w-full h-full">
                     {movie.telegramVideoUrl.includes('t.me/') ? (
                       <iframe 
                         src={getEmbedUrl(movie.telegramVideoUrl)} 
                         className="w-full h-full border-none"
                         allowFullScreen
                       ></iframe>
                     ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 p-10 text-center">
                           <Clapperboard className="w-20 h-20 text-rose-500 mb-8 animate-bounce" />
                           <h3 className="text-3xl font-black mb-4 uppercase italic">FLIXA PLAYER</h3>
                           <p className="text-slate-500 max-w-md text-lg mb-10">Video Telegram manzilidan yuklanmoqda...</p>
                           <a href={movie.telegramVideoUrl} target="_blank" rel="noreferrer" className="px-12 py-5 bg-rose-600 text-white font-black rounded-3xl flex items-center gap-3">
                              <ExternalLink className="w-6 h-6" /> TELEGRAMDAN KO'RISH
                           </a>
                        </div>
                     )}
                  </div>
                )}
              </div>
            </div>

            {/* Synopsis Section */}
            <div className="glass p-12 lg:p-20 rounded-[3.5rem] border border-white/5 space-y-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-16 opacity-[0.02] pointer-events-none group-hover:opacity-10 transition-opacity duration-1000">
                <Clapperboard className="w-80 h-80 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white flex items-center gap-5 uppercase tracking-widest font-heading">
                <Zap className="w-8 lg:w-10 h-8 lg:h-10 text-rose-500 fill-rose-500" /> Kino Mazmuni
              </h2>
              <p className="text-slate-400 leading-[1.8] text-lg lg:text-2xl font-medium relative z-10 first-letter:text-5xl first-letter:font-black first-letter:text-rose-500 first-letter:mr-3 first-letter:float-left">
                {movie.description}
              </p>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="lg:col-span-4 space-y-12">
            <div className="glass rounded-[3.5rem] p-10 lg:p-12 border border-white/5 space-y-10 sticky top-32">
               <div className="space-y-8">
                  <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.5em] border-b border-white/5 pb-5">Texnik Ma'lumotlar</h4>
                  <div className="space-y-6">
                     <DetailRow label="Original Nomi" value={movie.originalTitle || movie.title} />
                     <DetailRow label="Ishlab chiqarilgan" value={movie.country || 'Noma\'lum'} />
                     <DetailRow label="Film Tili" value={movie.language || "O'zbek tili"} />
                     <DetailRow label="Video Sifati" value="4K ULTRA HD" highlight />
                     <DetailRow label="Yosh Chegarasi" value={movie.ageLimit || '16+'} />
                  </div>
               </div>

               <div className="pt-10 space-y-5">
                  <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-6 rounded-3xl shadow-2xl shadow-rose-600/40 flex items-center justify-center gap-4 transition-all active:scale-95 text-sm uppercase tracking-widest">
                    <Download className="w-7 h-7" /> YUKLAB OLISH
                  </button>
                  <button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black py-6 rounded-3xl flex items-center justify-center gap-4 transition-all text-sm uppercase tracking-widest">
                    <Share2 className="w-7 h-7" /> ULASHISH
                  </button>
               </div>

               {/* AI Recommendations */}
               {recommendations.length > 0 && (
                 <div className="mt-16 space-y-8">
                   <h3 className="text-rose-500 font-black flex items-center gap-3 uppercase tracking-[0.3em] text-[10px]">
                     <Sparkles className="w-4 h-4" /> FLIXA AI Tavsiyalari
                   </h3>
                   <div className="space-y-4">
                     {recommendations.slice(0, 3).map((rec, i) => (
                       <div key={i} className="bg-white/5 border border-white/10 px-6 py-5 rounded-[2rem] text-xs font-black text-slate-300 flex items-center gap-5 group cursor-default hover:bg-rose-600/5 hover:border-rose-600/30 transition-all">
                         <div className="w-2 h-2 bg-rose-600 rounded-full group-hover:scale-150 transition-transform"></div>
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
  <div className="flex flex-col space-y-1.5">
    <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{label}</span>
    <span className={`text-base lg:text-lg font-black tracking-tight ${highlight ? 'text-rose-500' : 'text-slate-200'}`}>{value}</span>
  </div>
);

export default MovieDetail;
