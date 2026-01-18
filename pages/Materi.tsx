
import React, { useState } from 'react';
import { MATERI_DATA } from '../constants';
import { Materi } from '../types';

const MateriPage: React.FC = () => {
  const [activeMateri, setActiveMateri] = useState<Materi>(MATERI_DATA[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMateri = MATERI_DATA.filter((item) =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.konten.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row gap-12 pb-20">
      {/* Sidebar Materi */}
      <aside className="lg:w-80 order-2 lg:order-1 no-print">
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sticky top-32">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
            <h2 className="text-xl font-extrabold text-slate-800">Modul Belajar</h2>
          </div>

          {/* Search Feature */}
          <div className="mb-6 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari topik materi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {filteredMateri.length > 0 ? (
              filteredMateri.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMateri(item)}
                  className={`w-full text-left px-5 py-4 rounded-2xl transition-all flex items-center group relative overflow-hidden ${
                    activeMateri.id === item.id
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent hover:border-slate-200'
                  }`}
                >
                  <span className={`text-xl mr-4 transition-transform group-hover:scale-125`}>{item.ikon}</span>
                  <span className="text-sm font-bold leading-tight">
                    {item.judul}
                  </span>
                  {activeMateri.id === item.id && (
                     <div className="absolute right-0 top-0 h-full w-1 bg-white/20"></div>
                  )}
                </button>
              ))
            ) : (
              <div className="text-center py-10 px-4">
                <div className="text-4xl mb-3 opacity-20">🔎</div>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  Topik "{searchTerm}" tidak ditemukan. Coba kata kunci lain.
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Konten Materi */}
      <article className="flex-1 order-1 lg:order-2 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="relative h-64 bg-indigo-600 flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="text-[12rem] opacity-10 absolute -right-10 -bottom-10 rotate-12">{activeMateri.ikon}</div>
             <div className="relative z-10 text-center px-12 space-y-4">
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em]">Bab Pokok Bahasan</span>
                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  {activeMateri.judul}
                </h1>
             </div>
          </div>
          
          <div className="p-10 md:p-16 space-y-16">
            {/* Tujuan Pembelajaran */}
            <section className="bg-emerald-50/50 p-10 rounded-[2rem] border border-emerald-100/50">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-emerald-500 rounded-lg text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-emerald-900 font-black uppercase tracking-widest text-sm">Tujuan Pembelajaran</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeMateri.tujuan.map((t, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-6 h-6 bg-white text-emerald-500 rounded-full flex items-center justify-center font-black text-xs shadow-sm">
                      {i + 1}
                    </span>
                    <span className="text-sm text-emerald-800 font-bold leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Materi Ringkas */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                <h3 className="text-slate-900 font-black text-xl">Ulasan Materi</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">
                {activeMateri.konten}
              </p>
            </section>

            {/* Contoh Kontekstual */}
            <section className="bg-amber-50 rounded-[2rem] p-10 border-2 border-dashed border-amber-200 relative">
              <div className="absolute -top-5 left-10 bg-amber-400 px-6 py-2 rounded-xl text-white font-black text-xs uppercase tracking-widest shadow-lg">
                💡 Insight Kasus
              </div>
              <p className="text-amber-900 font-bold leading-relaxed italic text-lg">
                "{activeMateri.contoh}"
              </p>
            </section>

            <div className="pt-12 border-t border-slate-100 flex flex-col md:row justify-between items-center gap-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-slate-300 rounded-full"></span>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">E-Modul PKWU 2024</p>
                </div>
                <div className="flex space-x-3">
                   <button className="flex items-center px-6 py-3 bg-indigo-50 text-indigo-700 text-sm font-black rounded-xl hover:bg-indigo-100 transition-all">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                     </svg>
                     Materi PDF
                   </button>
                </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default MateriPage;
