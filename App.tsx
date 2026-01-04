import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, User, auth } from './firebase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';

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
      <div className="fixed inset-0 bg-[#030712] flex items-center justify-center z-[999]">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-rose-600/20 border-t-rose-600 rounded-full animate-spin"></div>
          <h1 className="text-4xl font-black brand-font tracking-tighter animate-pulse">
            FLIX<span className="text-rose-600">A</span>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex-1 flex flex-col bg-[#030712] selection:bg-rose-600 selection:text-white">
        <Navbar user={user} />
        <main className="flex-1 min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/search" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;