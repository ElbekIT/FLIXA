
import React from 'react';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProfilePageProps {
  user: User | null;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Profilni ko'rish uchun tizimga kiring</h2>
        <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold">
          Asosiy sahifa
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="glass-morphism rounded-[40px] overflow-hidden border border-gray-800 shadow-2xl">
        <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <img 
              src={user.photoURL || 'https://picsum.photos/400'} 
              className="w-32 h-32 rounded-[32px] border-4 border-[#0a0a0b] shadow-2xl object-cover" 
              alt="Profile" 
            />
          </div>
        </div>
        
        <div className="pt-20 pb-12 px-8 text-center">
          <h1 className="text-3xl font-black text-white mb-2">{user.displayName}</h1>
          <p className="text-gray-500 font-medium mb-8">{user.email}</p>
          
          <div className="flex justify-center gap-4 mb-12">
            <div className="glass-morphism px-6 py-4 rounded-3xl border border-gray-800">
              <p className="text-2xl font-black text-blue-500">12</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Sevimli filmlar</p>
            </div>
            <div className="glass-morphism px-6 py-4 rounded-3xl border border-gray-800">
              <p className="text-2xl font-black text-indigo-500">45</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Ko'rilganlar</p>
            </div>
          </div>

          <div className="space-y-4 max-w-sm mx-auto">
            {user.role === 'owner' && (
              <button 
                onClick={() => navigate('/admin')}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-600/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                ADMIN PANELGA O'TISH
              </button>
            )}
            
            <button className="w-full glass-morphism hover:bg-white/5 text-white py-4 rounded-2xl font-bold transition-all border border-gray-700 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              PROFILNI TAHRIRLASH
            </button>
            
            <button 
              onClick={onLogout}
              className="w-full text-gray-500 hover:text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
            >
              CHIQISH (LOGOUT)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
