
import React from 'react';
import { Materi, QuizQuestion } from './types';

export const MATERI_DATA: Materi[] = [
  {
    id: "materi-1",
    judul: "Pengertian Makanan Khas Daerah",
    tujuan: [
      "Mendefinisikan makanan khas daerah sebagai identitas budaya",
      "Mengidentifikasi karakteristik unik kuliner dari berbagai wilayah Indonesia",
      "Memahami fungsi sosial dan ekonomi makanan tradisional"
    ],
    konten: "Makanan khas daerah adalah produk kuliner yang telah lama berkembang di suatu wilayah, diolah berdasarkan resep turun-temurun, dan menggunakan bahan baku lokal yang tersedia di alam sekitarnya. Makanan ini memiliki karakteristik unik yang membedakan satu daerah dengan daerah lainnya. Misalnya, masakan Sumatera cenderung pedas dan bersantan kental, masakan Jawa Tengah dominan manis, masakan Jawa Timur cenderung asin dan pedas, sementara wilayah Indonesia Timur banyak menggunakan sagu dan ikan segar dengan bumbu minimalis namun kaya rasa asam segar.",
    contoh: "Kekayaan Kuliner: Rendang (Minangkabau) melambangkan kesabaran; Gudeg (Yogya) melambangkan ketelatenan; Papeda (Papua/Maluku) melambangkan kebersamaan; serta Ayam Betutu (Bali) yang kaya akan rempah base genep.",
    ikon: "🇮🇩"
  },
  {
    id: "materi-2",
    judul: "Pengertian Modifikasi Produk Makanan",
    tujuan: [
      "Memahami konsep modifikasi dalam kewirausahaan pangan",
      "Membedakan produk asli dengan produk hasil modifikasi"
    ],
    konten: "Modifikasi produk makanan adalah cara merubah bentuk, rasa, maupun teknik pengolahan makanan dari yang kurang menarik menjadi lebih menarik, atau dari yang memiliki daya simpan singkat menjadi lebih tahan lama, tanpa menghilangkan karakteristik utama dari makanan aslinya.",
    contoh: "Mengubah tekstur, mengganti bahan tambahan, atau mempercantik tampilan presentasi (plating).",
    ikon: "🛠️"
  },
  {
    id: "materi-3",
    judul: "Tujuan Modifikasi Makanan Khas Daerah",
    tujuan: [
      "Menjelaskan alasan fungsional dilakukan modifikasi",
      "Mengidentifikasi manfaat higienitas dan variasi produk"
    ],
    konten: "Ada empat tujuan utama: 1) Memberikan variasi rasa agar konsumen tidak bosan, 2) Memperpanjang usia simpan produk (awetan), 3) Meningkatkan tingkat higienitas dan keamanan pangan, serta 4) Menyesuaikan produk dengan selera pasar modern atau pasar internasional.",
    contoh: "Dodol yang dikemas secara vakum agar tidak mudah berjamur saat dikirim keluar kota.",
    ikon: "🎯"
  },
  {
    id: "materi-4",
    judul: "Faktor Pendorong Modifikasi Produk",
    tujuan: [
      "Menganalisis penyebab munculnya inovasi produk",
      "Memahami pengaruh teknologi dan tren terhadap pasar"
    ],
    konten: "Modifikasi terjadi karena adanya: 1) Kemajuan teknologi pengolahan, 2) Perubahan gaya hidup konsumen (ingin yang praktis), 3) Persaingan pasar yang semakin ketat, and 4) Keinginan untuk melestarikan budaya lokal melalui kemasan yang lebih kekinian.",
    contoh: "Munculnya tren 'Ready to Eat' (makanan siap saji) yang memicu modifikasi kemasan makanan daerah.",
    ikon: "🚀"
  },
  {
    id: "materi-5",
    judul: "Contoh Modifikasi Makanan Khas Daerah",
    tujuan: [
      "Mengeksplorasi minimal 5 contoh nyata produk modifikasi",
      "Memahami konsep fusion food (perpaduan budaya)"
    ],
    konten: "Inovasi kuliner saat ini sangat luas. Modifikasi bisa berupa perpaduan budaya (fusion) atau inovasi bahan baku yang lebih sehat dan premium.",
    contoh: "1. Burger Rendang (Barat + Minang), 2. Pizza Sambal Matah (Italia + Bali), 3. Gelato Jamu Kunyit Asam (Eropa + Tradisional), 4. Sushi Nasi Kuning (Jepang + Jawa), 5. Croissant Martabak (Prancis + Lokal).",
    ikon: "🍱"
  },
  {
    id: "materi-6",
    judul: "Nilai Ekonomi dan Peluang Usaha",
    tujuan: [
      "Menganalisis nilai tambah (added value) pada produk modifikasi",
      "Melihat potensi pasar di era digital"
    ],
    konten: "Produk yang dimodifikasi memiliki 'Nilai Tambah' (added value) yang membuat harga jualnya bisa jauh lebih tinggi dibanding produk biasa. Peluang usahanya sangat besar karena pasar menyukai hal-hal unik yang 'Instagrammable' dan bisa dipasarkan secara luas melalui platform online.",
    contoh: "Singkong goreng biasa (Rp 5rb) dimodifikasi menjadi 'Cassava Fries' dengan bumbu truffle (Rp 25rb).",
    ikon: "💰"
  },
  {
    id: "materi-7",
    judul: "Sikap dan Karakter Wirausaha",
    tujuan: [
      "Menanamkan jiwa kewirausahaan pada diri siswa",
      "Mengenal karakter sukses seorang wirausahawan"
    ],
    konten: "Seorang wirausaha PKWU harus memiliki karakter: 1) Kreatif dan Inovatif (selalu punya ide baru), 2) Berani mengambil risiko, 3) Disiplin dan Konsisten, 4) Percaya diri, serta 5) Pantang menyerah saat menghadapi tantangan pasar.",
    contoh: "Terus melakukan riset rasa baru meskipun percobaan pertama gagal total.",
    ikon: "👨‍🍳"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Apa tujuan utama dari modifikasi makanan khas daerah?",
    options: ["Menghilangkan rasa aslinya", "Meningkatkan daya saing dan nilai jual", "Membuat harga menjadi lebih murah", "Mengurangi porsi makanan"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Manakah yang merupakan contoh modifikasi teknik pengolahan?",
    options: ["Mengubah kemasan plastik menjadi box", "Menambahkan keju ke dalam bakpia", "Memasak rendang dengan metode vacuum agar awet", "Mempromosikan lewat Instagram"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Dalam analisis SWOT, faktor internal perusahaan adalah...",
    options: ["Peluang dan Ancaman", "Kekuatan dan Kelemahan", "Pesaing dan Kebijakan Pemerintah", "Tren Pasar"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Kemasan yang berfungsi untuk melindungi produk sekaligus sebagai sarana promosi disebut...",
    options: ["Secondary Packaging", "Silent Salesman", "Waste Product", "Container"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Rumus promosi yang mencakup Attention, Interest, Desire, dan Action disebut...",
    options: ["ABCD", "SWOT", "AIDA", "POAC"],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "Dalam SWOT, huruf 'T' merupakan singkatan dari Threats yang berarti...",
    options: ["Kekuatan", "Kelemahan", "Peluang", "Ancaman"],
    correctAnswer: 3
  },
  {
    id: 7,
    question: "Bahan pangan yang berasal dari hewan disebut bahan...",
    options: ["Nabati", "Hewani", "Organik", "Kimiawi"],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "Modifikasi rasa makanan dapat dilakukan dengan cara...",
    options: ["Mengganti warna kemasan", "Menambahkan bumbu atau varian rasa baru", "Mengecilkan ukuran produk", "Menaikkan harga jual"],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "Langkah pertama dalam menyusun perencanaan usaha adalah...",
    options: ["Menentukan harga jual", "Melakukan promosi besar-besaran", "Mencari ide dan peluang usaha", "Membeli peralatan mahal"],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "Keunggulan utama kemasan ramah lingkungan (eco-friendly) adalah...",
    options: ["Harga sangat mahal", "Sangat sulit didapatkan", "Mengurangi pencemaran lingkungan", "Tidak bisa didesain menarik"],
    correctAnswer: 2
  },
  {
    id: 11,
    question: "Apa yang dimaksud dengan BEP (Break Even Point) dalam kewirausahaan?",
    options: ["Titik di mana usaha mendapatkan keuntungan maksimal", "Titik di mana total pendapatan sama dengan total biaya", "Proses pengemasan produk", "Metode promosi produk baru"],
    correctAnswer: 1
  },
  {
    id: 12,
    question: "Teknik pengawetan makanan dengan cara pemanasan pada suhu tinggi dalam waktu singkat disebut...",
    options: ["Fermentasi", "Pasteurisasi", "Kristalisasi", "Karamelisasi"],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "Berikut yang bukan merupakan komponen dalam Harga Pokok Produksi (HPP) adalah...",
    options: ["Biaya Bahan Baku", "Biaya Tenaga Kerja", "Biaya Overhead", "Pajak Penghasilan Pribadi"],
    correctAnswer: 3
  },
  {
    id: 14,
    question: "Saluran distribusi dari produsen langsung ke konsumen tanpa perantara disebut distribusi...",
    options: ["Langsung", "Semi Langsung", "Tidak Langsung", "Ekstensif"],
    correctAnswer: 0
  },
  {
    id: 15,
    question: "Pemberian label pada produk makanan bertujuan untuk...",
    options: ["Memperberat bobot produk", "Memberikan informasi mengenai komposisi dan tanggal kedaluwarsa", "Menutupi kekurangan rasa", "Mengelabui konsumen"],
    correctAnswer: 1
  },
  {
    id: 16,
    question: "Apa yang dimaksud dengan segmentasi pasar?",
    options: ["Proses pembuatan produk di pabrik", "Pembagian pasar menjadi kelompok-kelompok pembeli yang berbeda", "Pemberian diskon besar-besaran", "Pengiriman barang ke luar negeri"],
    correctAnswer: 1
  },
  {
    id: 17,
    question: "Izin edar produk makanan yang dikeluarkan oleh pemerintah Indonesia melalui badan resmi adalah...",
    options: ["PIRT / BPOM", "KTP", "SIM", "STNK"],
    correctAnswer: 0
  },
  {
    id: 18,
    question: "Apa keunggulan pemasaran digital dibandingkan pemasaran tradisional?",
    options: ["Biaya jauh lebih mahal", "Jangkauan lebih luas dan target lebih terukur", "Tidak membutuhkan koneksi internet", "Hanya bisa dilihat oleh warga sekitar"],
    correctAnswer: 1
  },
  {
    id: 19,
    question: "Faktor utama yang harus diperhatikan dalam memilih lokasi usaha makanan adalah...",
    options: ["Dekat dengan rumah guru", "Strategis dan dekat dengan target pasar", "Jauh dari keramaian", "Tempat yang paling murah tanpa akses jalan"],
    correctAnswer: 1
  },
  {
    id: 20,
    question: "Karakter 'Inovatif' bagi seorang wirausahawan berarti...",
    options: ["Mudah menyerah jika gagal", "Selalu meniru produk orang lain", "Mampu menciptakan sesuatu yang baru atau berbeda", "Hanya fokus pada keuntungan jangka pendek"],
    correctAnswer: 2
  }
];
