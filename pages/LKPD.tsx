
import React, { useState, useEffect, useRef } from 'react';
import { LKPDData, RowBahan, RowAlat, RowModifikasi, DetailModifikasi } from '../types';

declare var html2pdf: any;

const LKPD: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<LKPDData>({
    nama: '',
    kelas: '',
    tanggal: new Date().toISOString().split('T')[0],
    modifikasiList: [{ id: '1', makananAsli: '', bentukModifikasi: '' }],
    detailModifikasiList: [
      { id: 'd1', makananAsli: '', versiModifikasi: '', perubahanUtama: '', targetPasar: '' },
      { id: 'd2', makananAsli: '', versiModifikasi: '', perubahanUtama: '', targetPasar: '' },
      { id: 'd3', makananAsli: '', versiModifikasi: '', perubahanUtama: '', targetPasar: '' }
    ],
    ideUsaha: '',
    bahanList: [{ id: '1', nama: '', jumlah: '', harga: 0 }],
    alatList: [{ id: '1', nama: '', fungsi: '' }],
    prosesProduksi: '',
    modalTotal: 0,
    hargaJual: 0,
    swot: { s: '', w: '', o: '', t: '' },
    refleksi: ''
  });

  const [isViewMode, setIsViewMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Auto-calculate total modal
  useEffect(() => {
    const total = data.bahanList.reduce((sum, item) => sum + Number(item.harga || 0), 0);
    setData(prev => ({ ...prev, modalTotal: total }));
  }, [data.bahanList]);

  const addRowModifikasi = () => {
    setData({
      ...data,
      modifikasiList: [...data.modifikasiList, { id: Date.now().toString(), makananAsli: '', bentukModifikasi: '' }]
    });
  };

  const addRowBahan = () => {
    setData({
      ...data,
      bahanList: [...data.bahanList, { id: Date.now().toString(), nama: '', jumlah: '', harga: 0 }]
    });
  };

  const addRowAlat = () => {
    setData({
      ...data,
      alatList: [...data.alatList, { id: Date.now().toString(), nama: '', fungsi: '' }]
    });
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    
    setIsGenerating(true);
    
    const element = contentRef.current;
    const opt = {
      margin:       [10, 10, 10, 10],
      filename:     `LKPD-PKWU-${data.nama || 'Siswa'}-${data.kelas || 'XII'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Gagal menghasilkan PDF:", error);
      alert("Maaf, terjadi kesalahan saat mencoba menyimpan PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isViewMode) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-20 print:p-0 print:m-0">
        <div className="flex flex-col md:flex-row justify-between items-center print:hidden bg-indigo-50 p-6 rounded-3xl mb-6 gap-4 border border-indigo-100">
          <div>
            <p className="text-indigo-800 font-extrabold text-lg">Pratinjau Hasil LKPD</p>
            <p className="text-indigo-600 text-xs font-medium">Periksa kembali data sebelum menyimpan ke format PDF.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setIsViewMode(false)}
              className="px-5 py-2.5 bg-white text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Kembali
            </button>
            <button 
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className={`px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Simpan PDF
                </>
              )}
            </button>
            <button 
              onClick={handlePrint}
              className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak
            </button>
          </div>
        </div>

        <div ref={contentRef} className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 print:shadow-none print:border-none">
          <header className="text-center border-b-2 border-slate-900 pb-6 mb-8 flex items-center justify-between">
            <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex-1 text-center px-4">
              <h1 className="text-xl font-black uppercase tracking-tight">Lembar Kerja Peserta Didik (LKPD) Interaktif</h1>
              <p className="text-sm font-bold text-slate-600">Mata Pelajaran: Prakarya dan Kewirausahaan (PKWU) Kelas XII</p>
            </div>
            <div className="w-16 h-16 opacity-0"></div> {/* Spacer for alignment */}
          </header>

          <section className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div><span className="font-bold text-indigo-600 uppercase text-[10px] tracking-widest block mb-1">Nama Siswa</span> <span className="font-extrabold text-slate-800">{data.nama || '-'}</span></div>
            <div><span className="font-bold text-indigo-600 uppercase text-[10px] tracking-widest block mb-1">Kelas</span> <span className="font-extrabold text-slate-800">{data.kelas || '-'}</span></div>
            <div><span className="font-bold text-indigo-600 uppercase text-[10px] tracking-widest block mb-1">Tanggal Pengerjaan</span> <span className="font-extrabold text-slate-800">{data.tanggal || '-'}</span></div>
          </section>

          <div className="space-y-10">
            <section>
              <h2 className="font-black text-indigo-600 text-sm uppercase tracking-[0.2em] mb-4 flex items-center">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                Kegiatan 1: Identifikasi Modifikasi Makanan
              </h2>
              <table className="w-full border-collapse rounded-xl overflow-hidden border border-slate-200">
                <thead className="bg-indigo-600 text-white text-xs uppercase tracking-widest">
                  <tr>
                    <th className="p-4 text-left border-r border-indigo-500">Makanan Khas Daerah Asli</th>
                    <th className="p-4 text-left">Rencana Bentuk Modifikasi</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  {data.modifikasiList.map(item => (
                    <tr key={item.id} className="bg-white">
                      <td className="p-4 font-bold text-slate-700 border-r border-slate-100">{item.makananAsli || '-'}</td>
                      <td className="p-4 text-slate-600 italic">{item.bentukModifikasi || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="font-black text-indigo-600 text-sm uppercase tracking-[0.2em] mb-4 flex items-center">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                Detail Modifikasi Produk Pilihan
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {data.detailModifikasiList.map((item, idx) => (
                  <div key={item.id} className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Produk {idx + 1}</span>
                        <p className="text-sm font-bold text-slate-800">{item.makananAsli || 'Belum diisi'}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Versi Modifikasi</span>
                        <p className="text-sm font-medium text-slate-700 italic">{item.versiModifikasi || '-'}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Perubahan Utama</span>
                        <p className="text-xs text-slate-600">{item.perubahanUtama || '-'}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Target Pasar</span>
                        <p className="text-xs text-slate-600 font-bold">{item.targetPasar || '-'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-black text-indigo-600 text-sm uppercase tracking-[0.2em] mb-4 flex items-center">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                Kegiatan 2: Deskripsi Ide Usaha Kreatif
              </h2>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap italic">
                {data.ideUsaha || 'Deskripsi ide belum diisi.'}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="font-black text-indigo-600 text-sm uppercase tracking-[0.2em] flex items-center">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                Kegiatan 3: Perencanaan Usaha & Pembiayaan
              </h2>
              <div className="grid grid-cols-1 gap-8">
                <div>
                  <h3 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-3">Tabel Analisis Biaya Bahan Baku:</h3>
                  <table className="w-full border-collapse border border-slate-200 text-sm">
                    <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="border border-slate-200 p-3 text-left">Nama Bahan</th>
                        <th className="border border-slate-200 p-3 text-left">Jumlah / Satuan</th>
                        <th className="border border-slate-200 p-3 text-right">Harga Estimasi (Rp)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.bahanList.map(item => (
                        <tr key={item.id}>
                          <td className="border border-slate-200 p-3 font-medium">{item.nama || '-'}</td>
                          <td className="border border-slate-200 p-3">{item.jumlah || '-'}</td>
                          <td className="border border-slate-200 p-3 text-right font-bold">Rp {item.harga.toLocaleString('id-ID')}</td>
                        </tr>
                      ))}
                      <tr className="bg-indigo-50 font-black">
                        <td colSpan={2} className="border border-slate-200 p-3 text-right text-indigo-700 uppercase tracking-widest text-[10px]">Total Investasi Bahan:</td>
                        <td className="border border-slate-200 p-3 text-right text-indigo-700">Rp {data.modalTotal.toLocaleString('id-ID')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-3">Daftar Peralatan & Fungsi:</h3>
                    <table className="w-full border-collapse border border-slate-200 text-sm">
                      <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                        <tr>
                          <th className="border border-slate-200 p-2 text-left">Alat</th>
                          <th className="border border-slate-200 p-2 text-left">Fungsi Utama</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.alatList.map(item => (
                          <tr key={item.id}>
                            <td className="border border-slate-200 p-2 font-medium">{item.nama || '-'}</td>
                            <td className="border border-slate-200 p-2 text-xs">{item.fungsi || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-indigo-600 p-8 rounded-3xl text-white space-y-4 shadow-xl">
                    <div>
                      <h3 className="font-black uppercase tracking-[0.2em] text-[10px] text-indigo-200 mb-1">Target Harga Jual Per Unit:</h3>
                      <p className="text-4xl font-black">Rp {data.hargaJual.toLocaleString('id-ID')}</p>
                    </div>
                    <div>
                      <h3 className="font-black uppercase tracking-[0.2em] text-[10px] text-indigo-200 mb-2">Alur Produksi Singkat:</h3>
                      <p className="text-xs leading-relaxed opacity-90 italic">"{data.prosesProduksi || '-'}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-black text-indigo-600 text-sm uppercase tracking-[0.2em] mb-4 flex items-center">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                Kegiatan 4: Analisis SWOT Strategis
              </h2>
              <div className="grid grid-cols-2 gap-4 text-[11px]">
                <div className="border-2 border-indigo-100 p-4 rounded-2xl bg-indigo-50/30">
                  <span className="font-black block text-indigo-600 uppercase tracking-widest mb-2">Strengths (Kekuatan)</span> 
                  <p className="text-slate-700">{data.swot.s || '-'}</p>
                </div>
                <div className="border-2 border-red-100 p-4 rounded-2xl bg-red-50/30">
                  <span className="font-black block text-red-600 uppercase tracking-widest mb-2">Weaknesses (Kelemahan)</span> 
                  <p className="text-slate-700">{data.swot.w || '-'}</p>
                </div>
                <div className="border-2 border-emerald-100 p-4 rounded-2xl bg-emerald-50/30">
                  <span className="font-black block text-emerald-600 uppercase tracking-widest mb-2">Opportunities (Peluang)</span> 
                  <p className="text-slate-700">{data.swot.o || '-'}</p>
                </div>
                <div className="border-2 border-amber-100 p-4 rounded-2xl bg-amber-50/30">
                  <span className="font-black block text-amber-600 uppercase tracking-widest mb-2">Threats (Ancaman)</span> 
                  <p className="text-slate-700">{data.swot.t || '-'}</p>
                </div>
              </div>
            </section>

            <section className="border-t border-slate-100 pt-8">
              <h2 className="font-black text-indigo-600 text-sm uppercase tracking-[0.2em] mb-4 flex items-center">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                Kegiatan 5: Refleksi Hasil Belajar Siswa
              </h2>
              <p className="font-bold text-slate-800 text-sm leading-relaxed italic bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                "{data.refleksi || 'Belum ada refleksi pengerjaan.'}"
              </p>
            </section>
          </div>

          <div className="mt-16 flex justify-between items-end border-t border-slate-100 pt-10">
            <div className="text-center w-64 space-y-12">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verifikasi Guru Pengampu</p>
              <div className="space-y-1">
                <div className="border-b-2 border-slate-900 w-full"></div>
                <p className="text-[10px] font-bold text-slate-500">NIP. ..................................</p>
              </div>
            </div>
            <div className="text-center w-64 space-y-12">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tanda Tangan Siswa</p>
              <div className="space-y-1">
                <p className="text-xs font-black text-slate-900">{data.nama || '..................................'}</p>
                <div className="border-b-2 border-slate-900 w-full"></div>
                <p className="text-[10px] font-bold text-slate-500">Kelas {data.kelas || '.......'}</p>
              </div>
            </div>
          </div>
          
          <footer className="mt-12 text-center text-[8px] text-slate-300 font-bold uppercase tracking-[0.5em]">
            E-PKWU Interactive Learning Module • SMA Kurikulum Merdeka
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <header className="mb-12 text-center space-y-4 animate-in fade-in duration-700">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-50 rounded-full mb-4">
          <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
          <span className="text-indigo-700 text-[10px] font-black uppercase tracking-widest">Digital Workbook PKWU XII</span>
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Lembar Kerja <br className="hidden md:block"/> Interaktif Siswa</h1>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
          Lengkapi semua kegiatan di bawah ini untuk menyusun perencanaan usaha modifikasi makanan khas daerah yang matang dan terstruktur.
        </p>
      </header>

      <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
        <div className="h-3 bg-gradient-to-r from-indigo-600 via-emerald-500 to-amber-400"></div>

        <form className="p-8 md:p-16 space-y-16">
          {/* Identitas */}
          <section className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 text-xl font-black shadow-inner shadow-indigo-200/50">1</div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Identitas Diri</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Informasi pengerjaan tugas</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Nama Lengkap</label>
                <input 
                  type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-slate-700"
                  placeholder="Masukkan namamu..."
                  value={data.nama} onChange={e => setData({...data, nama: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Kelas & Jurusan</label>
                <input 
                  type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-slate-700"
                  placeholder="Contoh: XII MIPA 4"
                  value={data.kelas} onChange={e => setData({...data, kelas: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Tanggal</label>
                <input 
                  type="date" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-slate-700"
                  value={data.tanggal} onChange={e => setData({...data, tanggal: e.target.value})}
                />
              </div>
            </div>
          </section>

          {/* Kegiatan 1 */}
          <section className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 text-xl font-black shadow-inner shadow-emerald-200/50">2</div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Identifikasi Modifikasi</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Memetakan ide perubahan produk</p>
              </div>
            </div>
            <div className="space-y-4">
              {data.modifikasiList.map((item, idx) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-left duration-300">
                  <div className="relative group">
                    <input 
                      placeholder="Makanan Khas Daerah Asal"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-slate-700"
                      value={item.makananAsli}
                      onChange={e => {
                        const newList = [...data.modifikasiList];
                        newList[idx].makananAsli = e.target.value;
                        setData({...data, modifikasiList: newList});
                      }}
                    />
                  </div>
                  <div className="relative group">
                    <input 
                      placeholder="Ide Modifikasi (Rasa/Bentuk/Kemas)"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-slate-700"
                      value={item.bentukModifikasi}
                      onChange={e => {
                        const newList = [...data.modifikasiList];
                        newList[idx].bentukModifikasi = e.target.value;
                        setData({...data, modifikasiList: newList});
                      }}
                    />
                  </div>
                </div>
              ))}
              <button 
                type="button" onClick={addRowModifikasi}
                className="inline-flex items-center text-emerald-600 font-black text-xs uppercase tracking-widest hover:text-emerald-700 transition-colors bg-emerald-50 px-4 py-2 rounded-xl"
              >
                + Tambah Baris Identifikasi
              </button>
            </div>
          </section>

          {/* New Section: Detail Modifikasi */}
          <section className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 text-xl font-black shadow-inner shadow-indigo-200/50">2.1</div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Rincian Modifikasi Pilihan</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Detail mendalam untuk 3 produk unggulan</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-12">
              {data.detailModifikasiList.map((item, idx) => (
                <div key={item.id} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 space-y-6 relative group">
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black shadow-lg">
                    {idx + 1}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Makanan Asal</label>
                      <input 
                        className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 focus:border-indigo-500 outline-none font-bold text-slate-700 text-sm"
                        placeholder="Misal: Pempek Palembang"
                        value={item.makananAsli}
                        onChange={e => {
                          const newList = [...data.detailModifikasiList];
                          newList[idx].makananAsli = e.target.value;
                          setData({...data, detailModifikasiList: newList});
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Versi Modifikasi</label>
                      <input 
                        className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 focus:border-indigo-500 outline-none font-bold text-slate-700 text-sm italic"
                        placeholder="Misal: Pempek Mozzarella Pelangi"
                        value={item.versiModifikasi}
                        onChange={e => {
                          const newList = [...data.detailModifikasiList];
                          newList[idx].versiModifikasi = e.target.value;
                          setData({...data, detailModifikasiList: newList});
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Perubahan Utama (Resep/Bentuk/Teknik)</label>
                    <textarea 
                      className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 focus:border-indigo-500 outline-none font-medium text-slate-600 text-xs h-20"
                      placeholder="Sebutkan apa saja yang dirubah dari versi aslinya..."
                      value={item.perubahanUtama}
                      onChange={e => {
                        const newList = [...data.detailModifikasiList];
                        newList[idx].perubahanUtama = e.target.value;
                        setData({...data, detailModifikasiList: newList});
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Pasar</label>
                    <input 
                      className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 focus:border-indigo-500 outline-none font-black text-indigo-600 text-sm"
                      placeholder="Misal: Remaja milenial, Pecinta kuliner unik di Jakarta"
                      value={item.targetPasar}
                      onChange={e => {
                        const newList = [...data.detailModifikasiList];
                        newList[idx].targetPasar = e.target.value;
                        setData({...data, detailModifikasiList: newList});
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Kegiatan 2 */}
          <section className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 text-xl font-black shadow-inner shadow-amber-200/50">3</div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Ide Usaha Utama</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Detail produk yang akan dikembangkan</p>
              </div>
            </div>
            <textarea 
              placeholder="Jelaskan produk pilihanmu, keunikannya, dan mengapa kamu memilih memodifikasi makanan tersebut..."
              className="w-full h-40 px-6 py-5 rounded-[2rem] bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-amber-50 focus:bg-white focus:border-amber-500 outline-none transition-all font-medium text-slate-700 text-lg leading-relaxed"
              value={data.ideUsaha} onChange={e => setData({...data, ideUsaha: e.target.value})}
            ></textarea>
          </section>

          {/* Kegiatan 3 */}
          <section className="space-y-10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 text-xl font-black shadow-inner shadow-indigo-200/50">4</div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Analisis Biaya & Produksi</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Matematika kewirausahaan sederhana</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-slate-500 text-[10px] uppercase tracking-[0.2em]">Estimasi Biaya Bahan Baku</h3>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">Kalkulasi Otomatis</span>
              </div>
              <div className="space-y-4">
                {data.bahanList.map((item, idx) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 group">
                    <input 
                      placeholder="Nama Bahan" className="px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-sm"
                      value={item.nama} onChange={e => {
                        const newList = [...data.bahanList];
                        newList[idx].nama = e.target.value;
                        setData({...data, bahanList: newList});
                      }}
                    />
                    <input 
                      placeholder="Jumlah / Takaran" className="px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-sm"
                      value={item.jumlah} onChange={e => {
                        const newList = [...data.bahanList];
                        newList[idx].jumlah = e.target.value;
                        setData({...data, bahanList: newList});
                      }}
                    />
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400 text-xs">Rp</span>
                      <input 
                        type="number" placeholder="Harga" className="w-full pl-10 pr-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 outline-none transition-all font-black text-indigo-600"
                        value={item.harga || ''} onChange={e => {
                          const newList = [...data.bahanList];
                          newList[idx].harga = Number(e.target.value);
                          setData({...data, bahanList: newList});
                        }}
                      />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-4">
                  <button type="button" onClick={addRowBahan} className="text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-white border-2 border-indigo-100 px-4 py-2 rounded-xl hover:bg-indigo-50 transition-all">+ Tambah Baris Bahan</button>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Modal Produksi</span>
                    <span className="text-3xl font-black text-indigo-600">Rp {data.modalTotal.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               <div className="space-y-6">
                 <h3 className="font-black text-slate-500 text-[10px] uppercase tracking-[0.2em]">Peralatan yang Dibutuhkan</h3>
                 <div className="space-y-3">
                   {data.alatList.map((item, idx) => (
                      <div key={item.id} className="flex gap-2 group animate-in slide-in-from-right duration-200">
                         <input 
                          placeholder="Nama Alat" className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 text-sm font-bold"
                          value={item.nama} onChange={e => {
                            const newList = [...data.alatList];
                            newList[idx].nama = e.target.value;
                            setData({...data, alatList: newList});
                          }}
                         />
                         <input 
                          placeholder="Fungsi" className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 text-sm font-medium italic"
                          value={item.fungsi} onChange={e => {
                            const newList = [...data.alatList];
                            newList[idx].fungsi = e.target.value;
                            setData({...data, alatList: newList});
                          }}
                         />
                      </div>
                   ))}
                 </div>
                 <button type="button" onClick={addRowAlat} className="text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all">+ Tambah Alat</button>
               </div>

               <div className="bg-indigo-50/50 p-8 rounded-[2.5rem] border-2 border-dashed border-indigo-100 flex flex-col justify-center space-y-4">
                 <h3 className="font-black text-indigo-700 text-xs uppercase tracking-widest text-center">Rencana Harga Jual</h3>
                 <div className="relative max-w-xs mx-auto w-full">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-indigo-300 text-xl">Rp</span>
                    <input 
                        type="number" placeholder="0" className="w-full pl-16 pr-8 py-6 rounded-3xl bg-white border-none shadow-xl shadow-indigo-100 font-black text-4xl text-indigo-600 outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-center"
                        value={data.hargaJual || ''} onChange={e => setData({...data, hargaJual: Number(e.target.value)})}
                    />
                 </div>
                 <p className="text-[10px] text-slate-400 font-bold text-center leading-relaxed">Pastikan harga sudah mencakup modal + profit <br/> yang rasional dengan pasar.</p>
               </div>
            </div>

            <div className="space-y-4">
               <h3 className="font-black text-slate-500 text-[10px] uppercase tracking-[0.2em]">Tahapan Proses Produksi</h3>
               <textarea 
                  className="w-full h-32 px-6 py-5 rounded-3xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-indigo-500 outline-none transition-all font-medium text-slate-700 italic"
                  placeholder="Ceritakan langkah demi langkah pengolahan produkmu..."
                  value={data.prosesProduksi} onChange={e => setData({...data, prosesProduksi: e.target.value})}
               ></textarea>
            </div>
          </section>

          {/* Kegiatan 4 */}
          <section className="space-y-10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 text-xl font-black shadow-inner shadow-red-200/50">5</div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Analisis SWOT</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Kekuatan, Kelemahan, Peluang, & Ancaman</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-indigo-50/50 p-8 rounded-[2.5rem] border border-indigo-100">
                  <div className="flex items-center mb-4 space-x-3">
                    <span className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center rounded-xl font-black">S</span>
                    <label className="font-black text-indigo-900 uppercase tracking-widest text-xs">Strengths (Kekuatan)</label>
                  </div>
                  <textarea 
                    className="w-full h-24 bg-white rounded-2xl p-4 text-sm font-medium border border-indigo-100 shadow-inner focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                    placeholder="Apa keunggulan unik produk modifikasimu?"
                    value={data.swot.s} onChange={e => setData({...data, swot: {...data.swot, s: e.target.value}})}
                  ></textarea>
               </div>
               <div className="bg-red-50/50 p-8 rounded-[2.5rem] border border-red-100">
                  <div className="flex items-center mb-4 space-x-3">
                    <span className="w-8 h-8 bg-red-600 text-white flex items-center justify-center rounded-xl font-black">W</span>
                    <label className="font-black text-red-900 uppercase tracking-widest text-xs">Weaknesses (Kelemahan)</label>
                  </div>
                  <textarea 
                    className="w-full h-24 bg-white rounded-2xl p-4 text-sm font-medium border border-red-100 shadow-inner focus:ring-4 focus:ring-red-100 outline-none transition-all"
                    placeholder="Apa hambatan internal yang mungkin dihadapi?"
                    value={data.swot.w} onChange={e => setData({...data, swot: {...data.swot, w: e.target.value}})}
                  ></textarea>
               </div>
               <div className="bg-emerald-50/50 p-8 rounded-[2.5rem] border border-emerald-100">
                  <div className="flex items-center mb-4 space-x-3">
                    <span className="w-8 h-8 bg-emerald-600 text-white flex items-center justify-center rounded-xl font-black">O</span>
                    <label className="font-black text-emerald-900 uppercase tracking-widest text-xs">Opportunities (Peluang)</label>
                  </div>
                  <textarea 
                    className="w-full h-24 bg-white rounded-2xl p-4 text-sm font-medium border border-emerald-100 shadow-inner focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                    placeholder="Tren pasar apa yang mendukung bisnismu?"
                    value={data.swot.o} onChange={e => setData({...data, swot: {...data.swot, o: e.target.value}})}
                  ></textarea>
               </div>
               <div className="bg-amber-50/50 p-8 rounded-[2.5rem] border border-amber-100">
                  <div className="flex items-center mb-4 space-x-3">
                    <span className="w-8 h-8 bg-amber-600 text-white flex items-center justify-center rounded-xl font-black">T</span>
                    <label className="font-black text-amber-900 uppercase tracking-widest text-xs">Threats (Ancaman)</label>
                  </div>
                  <textarea 
                    className="w-full h-24 bg-white rounded-2xl p-4 text-sm font-medium border border-amber-100 shadow-inner focus:ring-4 focus:ring-amber-100 outline-none transition-all"
                    placeholder="Risiko eksternal atau pesaing yang ada?"
                    value={data.swot.t} onChange={e => setData({...data, swot: {...data.swot, t: e.target.value}})}
                  ></textarea>
               </div>
            </div>
          </section>

          {/* Kegiatan 5 */}
          <section className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-xl font-black shadow-inner shadow-slate-200/50">6</div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Refleksi Belajar</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Apa yang kamu petik dari tugas ini?</p>
              </div>
            </div>
            <textarea 
              placeholder="Tuliskan pengalamanmu dalam menyusun rencana usaha ini. Apa bagian tersulit dan apa yang paling menarik?"
              className="w-full h-32 px-6 py-5 rounded-[2rem] bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-slate-100 focus:bg-white focus:border-slate-500 outline-none transition-all font-medium text-slate-700 italic"
              value={data.refleksi} onChange={e => setData({...data, refleksi: e.target.value})}
            ></textarea>
          </section>

          <div className="pt-10">
            <button 
              type="button"
              onClick={() => {
                window.scrollTo(0, 0);
                setIsViewMode(true);
              }}
              className="group flex items-center justify-center w-full py-6 bg-indigo-600 text-white font-black text-2xl rounded-3xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all transform active:scale-[0.98]"
            >
              <span>Simpan & Lihat Pratinjau LKPD</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 ml-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <div className="mt-8 flex items-center justify-center space-x-6">
               <div className="flex items-center space-x-2">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Autosave di browser</span>
               </div>
               <div className="flex items-center space-x-2">
                 <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mendukung Export PDF</span>
               </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LKPD;
