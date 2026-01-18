
import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Profil Mata Pelajaran PKWU</h1>
        <p className="text-slate-600">Membangun Karakter Wirausaha Muda yang Inovatif dan Berbudaya.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
              <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-3 text-lg">💡</span>
              Apa itu PKWU?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Prakarya dan Kewirausahaan (PKWU) adalah mata pelajaran yang membekali siswa dengan pengetahuan dan keterampilan praktis untuk menciptakan produk kreatif serta menumbuhkan jiwa entrepreneurship. Di kelas 12, fokus utama kita adalah bagaimana mengembangkan produk pangan lokal agar bisa naik kelas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
              <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-3 text-lg">🎯</span>
              Capaian Pembelajaran (CP)
            </h2>
            <ul className="space-y-3">
              {[
                "Mengeksplorasi potensi modifikasi makanan khas daerah.",
                "Menyusun rencana usaha kuliner secara terstruktur.",
                "Membuat dan mengemas produk modifikasi yang estetik.",
                "Menganalisis hasil produksi dan strategi pemasaran."
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-indigo-500 mr-2">✓</span>
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Mengapa Kurikulum Merdeka?</h3>
            <p className="text-sm text-slate-600">
              Kurikulum Merdeka memberikan kebebasan bagi siswa untuk berekspresi dan berinovasi sesuai minat bakat masing-masing. Di sini, kita tidak hanya belajar teori, tapi belajar dari realitas pasar dan kearifan lokal.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
