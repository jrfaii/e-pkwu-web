
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MateriPage from './pages/Materi';
import LKPD from './pages/LKPD';
import Evaluasi from './pages/Evaluasi';
import Guru from './pages/Guru';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'profile': return <Profile />;
      case 'materi': return <MateriPage />;
      case 'lkpd': return <LKPD />;
      case 'evaluasi': return <Evaluasi />;
      case 'guru': return <Guru />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-x-hidden">
      {/* Background Decorative Elements - Blobs */}
      <div className="no-print">
        <div className="bg-blob bg-indigo-400 w-[500px] h-[500px] top-[-100px] right-[-100px] rounded-full"></div>
        <div className="bg-blob bg-emerald-300 w-[400px] h-[400px] bottom-[10%] left-[-150px] rounded-full"></div>
        <div className="bg-blob bg-amber-200 w-[300px] h-[300px] top-[40%] right-[5%] rounded-full"></div>
      </div>

      {/* Background Decorative Elements - Icons (Watermark Style) */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03] flex flex-col justify-between p-20 no-print overflow-hidden">
        <div className="flex justify-between">
          <span className="text-9xl rotate-12">🍳</span>
          <span className="text-9xl -rotate-12 mt-40">💰</span>
        </div>
        <div className="flex justify-center">
          <span className="text-9xl rotate-45">💡</span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-9xl -rotate-12 mb-20">📈</span>
          <span className="text-9xl rotate-12">🍱</span>
        </div>
      </div>

      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-grow pt-24 md:pt-32 relative z-10">
        {/* Page Transition Wrapper */}
        <div 
          key={currentPage} 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out"
        >
          {renderPage()}
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-md border-t border-slate-100 py-16 no-print mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-xl font-black text-slate-800">E-PKWU</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Platform pembelajaran digital interaktif untuk membangun generasi wirausaha kreatif Indonesia.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 uppercase tracking-widest text-xs">Akses Cepat</h4>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setCurrentPage('materi')} className="text-left text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium">Materi</button>
              <button onClick={() => setCurrentPage('lkpd')} className="text-left text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium">LKPD</button>
              <button onClick={() => setCurrentPage('evaluasi')} className="text-left text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium">Evaluasi</button>
              <button onClick={() => setCurrentPage('profile')} className="text-left text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium">Kurikulum</button>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 uppercase tracking-widest text-xs">Informasi</h4>
            <p className="text-sm text-slate-500 font-medium">PKWU SMA Kelas 12<br />Tahun Ajaran 2024/2025</p>
            <p className="text-xs text-slate-400">Dukungan teknis: help@e-pkwu.sch.id</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-100 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-sm text-slate-400 font-medium">
            © 2024 E-PKWU Interactive Learning. Hak Cipta Dilindungi.
          </p>
          <div className="flex space-x-6 text-slate-300">
            <span className="text-xs font-bold uppercase tracking-widest">Inovasi</span>
            <span className="text-xs font-bold uppercase tracking-widest">Kolaborasi</span>
            <span className="text-xs font-bold uppercase tracking-widest">Mandiri</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
