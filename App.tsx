
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import { onAuthStateChanged, User, auth } from './firebase';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-6">
        <div className="relative">
           <div className="w-20 h-20 border-4 border-rose-600/20 border-t-rose-600 rounded-full animate-spin"></div>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-rose-600 rounded-lg animate-pulse"></div>
           </div>
        </div>
        <span className="text-rose-600 font-black tracking-[0.4em] text-2xl animate-pulse">FLIXA</span>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-rose-600 selection:text-white">
        <Navbar user={user} />
        <div className="min-h-[70vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/search" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
