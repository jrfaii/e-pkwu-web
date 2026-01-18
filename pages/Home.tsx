
import React from 'react';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-50 to-transparent opacity-40"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl"></div>
        
        <div className="relative flex flex-col lg:flex-row items-center p-8 md:p-20 gap-12">
          <div className="lg:w-3/5 space-y-10 z-10 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-50 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              <span className="text-indigo-700 text-xs font-bold uppercase tracking-widest">Kurikulum Merdeka 2024</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1]">
              Inovasi <span className="text-indigo-600">Kuliner</span> <br />
              Bangun <span className="text-emerald-500">Kemandirian</span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Pelajari seni modifikasi makanan khas daerah dengan strategi bisnis modern. 
              Jadilah wirausahawan muda yang kreatif, inovatif, dan berdaya saing global.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button 
                onClick={() => onNavigate('materi')}
                className="group flex items-center justify-center px-10 py-5 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all"
              >
                <span>Mulai Belajar</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button 
                onClick={() => onNavigate('lkpd')}
                className="px-10 py-5 bg-white text-slate-700 border-2 border-slate-100 font-bold rounded-2xl hover:border-indigo-100 hover:bg-indigo-50 transition-all shadow-sm"
              >
                Rancang Bisnis
              </button>
            </div>
          </div>

          <div className="lg:w-2/5 relative flex justify-center">
            <div className="relative z-10 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Cooking Class" 
                className="rounded-[3rem] w-full max-w-sm aspect-[4/5] object-cover shadow-2xl border-8 border-white"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 flex items-center space-x-4 max-w-[200px]">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 text-2xl">🌱</div>
                <div>
                  <p className="font-extrabold text-slate-800 leading-none">Berbudaya</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Local Wisdom</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 flex items-center space-x-4 max-w-[200px]">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 text-2xl">💰</div>
                <div>
                  <p className="font-extrabold text-slate-800 leading-none">Mandiri</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Entrepreneur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { icon: '🎓', color: 'indigo', title: 'Kurikulum Terbaru', desc: 'Materi terstruktur sesuai Capaian Pembelajaran Kurikulum Merdeka Kelas 12.' },
          { icon: '🥙', color: 'emerald', title: 'Fokus Modifikasi', desc: 'Spesifik mengkaji pengolahan makanan daerah dengan sentuhan inovasi modern.' },
          { icon: '📝', color: 'amber', title: 'Tools Interaktif', desc: 'Lembar kerja digital yang memudahkan penyusunan perencanaan usaha mandiri.' }
        ].map((f, i) => (
          <div key={i} className="group bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className={`w-16 h-16 bg-${f.color}-50 text-${f.color}-600 rounded-2xl flex items-center justify-center mb-8 text-3xl transition-transform group-hover:scale-110`}>
              {f.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-800">{f.title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
          </div>
        ))}
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
