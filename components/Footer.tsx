import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#030712] border-t border-white/5 py-20 mt-20">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
        <div className="flex flex-col items-center gap-6 mb-12">
          <h2 className="text-4xl lg:text-6xl font-black brand-font italic uppercase tracking-tighter">
            FLIX<span className="text-rose-600">A</span>
          </h2>
          <p className="max-w-xl text-slate-500 text-lg font-medium leading-relaxed">
            Premium online kinoteatr. Siz uchun maxsus tanlangan 
            eng so'nggi filmlar va seriallar olami.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-10 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-white/5 pb-12">
          <Link to="/" className="hover:text-rose-600">Yordam</Link>
          <Link to="/" className="hover:text-rose-600">Xavfsizlik</Link>
          <Link to="/" className="hover:text-rose-600">Maxfiylik</Link>
          <Link to="/" className="hover:text-rose-600">Telegram Bot</Link>
        </div>
        
        <div className="pt-12 text-[10px] font-black text-slate-700 uppercase tracking-[0.5em]">
          &copy; {new Date().getFullYear()} FLIXA PLATFORMASI. BARCHA HUQUQLAR HIMOYA QILINGAN.
        </div>
      </div>
    </footer>
  );
};

export default Footer;