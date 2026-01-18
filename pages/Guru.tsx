
import React from 'react';

const Guru: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">Tentang Guru Pengampu</h1>
        <p className="text-slate-500 mt-2">Mari berdiskusi dan berkembang bersama.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
            <img 
              src="https://picsum.photos/seed/teacher-pkwu/400/500" 
              alt="Profil Guru" 
              className="rounded-2xl w-full grayscale hover:grayscale-0 transition-all duration-500 shadow-inner"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-slate-800">Nama Guru, S.Pd.</h3>
              <p className="text-indigo-600 text-sm font-semibold">Guru PKWU SMA</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Visi Mengajar</h3>
              <p className="text-slate-600 leading-relaxed italic">
                "Menciptakan ekosistem belajar yang memerdekakan pikiran siswa, mengasah kreativitas tanpa batas, dan menumbuhkan kemandirian ekonomi melalui wirausaha."
              </p>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-xs text-slate-400 uppercase font-bold mb-1">Pendidikan</p>
                <p className="text-sm text-slate-700 font-semibold">S1 Pendidikan Ekonomi</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-xs text-slate-400 uppercase font-bold mb-1">Pengalaman</p>
                <p className="text-sm text-slate-700 font-semibold">8+ Tahun Mengajar</p>
              </div>
            </section>

            <section className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Hubungi Saya</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-600">
                  <span className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">📧</span>
                  <span>guru@sma-contoh.sch.id</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600">
                  <span className="w-8 h-8 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center">📸</span>
                  <span>@guru_pkwu_keren</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guru;
