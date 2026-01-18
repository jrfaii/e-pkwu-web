
export interface Materi {
  id: string;
  judul: string;
  tujuan: string[];
  konten: string;
  contoh: string;
  ikon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export type Page = 'home' | 'profile' | 'materi' | 'lkpd' | 'evaluasi' | 'guru';

export interface RowBahan {
  id: string;
  nama: string;
  jumlah: string;
  harga: number;
}

export interface RowAlat {
  id: string;
  nama: string;
  fungsi: string;
}

export interface RowModifikasi {
  id: string;
  makananAsli: string;
  bentukModifikasi: string;
}

export interface DetailModifikasi {
  id: string;
  makananAsli: string;
  versiModifikasi: string;
  perubahanUtama: string;
  targetPasar: string;
}

export interface LKPDData {
  nama: string;
  kelas: string;
  tanggal: string;
  modifikasiList: RowModifikasi[];
  detailModifikasiList: DetailModifikasi[];
  ideUsaha: string;
  bahanList: RowBahan[];
  alatList: RowAlat[];
  prosesProduksi: string;
  modalTotal: number;
  hargaJual: number;
  swot: {
    s: string;
    w: string;
    o: string;
    t: string;
  };
  refleksi: string;
}
