
import React from 'react';
import { Clapperboard } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="bg-rose-600 p-2 rounded-xl">
            <Clapperboard className="text-white w-6 h-6" />
          </div>
          <span className="text-3xl font-black tracking-tighter text-white uppercase italic">
            FLIX<span className="text-rose-600">A</span>
          </span>
        </div>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10 font-medium">
          Eng so'nggi va sara filmlar online kinoteatri. 
          Siz uchun maxsus saralangan premium kontentlar faqat FLIXA platformasida.
        </p>
        <div className="flex flex-wrap justify-center gap-10 text-sm font-black text-slate-400 mb-12 uppercase tracking-widest">
          <a href="#" className="hover:text-rose-500 transition-colors">Yordam</a>
          <a href="#" className="hover:text-rose-500 transition-colors">Xavfsizlik</a>
          <a href="#" className="hover:text-rose-500 transition-colors">Kinoqidiruv</a>
          <a href="#" className="hover:text-rose-500 transition-colors">Telegram Bot</a>
        </div>
        <div className="pt-10 border-t border-white/5 text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} FLIXA MEDIA GROUP. BARCHA HUQUQLAR HIMOYA OSTIDA.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
