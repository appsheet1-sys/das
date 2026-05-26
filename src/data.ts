import { Biodata, Achievement, PortfolioItem } from "./types";

export const INITIAL_BIODATA: Biodata = {
  nama: "Dasrialdi, A.Md",
  pendidikanTerakhir: "DIII Teknik Komputer",
  instansiPendidikan: "Politeknik Negeri Padang",
  jabatan: "Fungsional Pranata Komputer Terampil",
  jabatanTambahan: "Kordinator Rumah tangga",
  tahunMasuk: 2023,
  predikatKinerja: {
    "2024": "Sangat Baik",
    "2025": "Sangat Baik"
  },
  photoUrl: "", // Defaults to generated pixar character
  heroSlogan: "Mewujudkan transformasi digital birokrasi dan modernisasi pelayanan publik yang transparan, akuntabel, serta berstandar tinggi.",
  biodataSlogan: "Informasi administratif utama dan rekam jejak formal penugasan pada instansi pemerintah Republik Indonesia.",
  capaianSlogan: "Portofolio kontribusi tingkat sektoral yang mengintegrasikan efisiensi pengadaan, tata kelola kepegawaian, dan modernisasi layanan birokrasi.",
  pengalamanSlogan: "Daftar komprehensif kontribusi manajerial teknis serta digitalisasi aplikasi pelayanan internal yang pernah dikembangkan oleh Dasrialdi.",
  rekomendasiSlogan: "Ulasan jujur dan tanggapan formal dari rekan kerja, pimpinan, maupun mitra instansi terkait pelayanan serta etos kerja Sdr. Dasrialdi."
};

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    category: "pengadaan",
    title: "Transformasi Pengadaan Barang & Jasa",
    highlight: "Mendorong transparansi dan modernisasi ekosistem pengadaan berorientasi pada akuntabilitas.",
    details: [
      "Penerima Mbiz Award: Menjadi motor penggerak utama dalam pemanfaatan platform Toko Daring, membawa instansi mendapatkan penghargaan Mbiz Award (Kemenperin, Satker ATIM) atas prestasi transaksi digital yang transparan.",
      "Kordinator Rumah Tangga - Implementasi Kartu Kredit Pemerintah (KKP): Menginisiasi dan mengelola KKP untuk operasional, mempercepat pembayaran, mendukung gerakan cashless, serta meraih predikat penggunaan KKP Terbaik beberapa kali.",
      "Berkontribusi langsung dalam pencapaian penilaian SAKIP satker terkait pengadaan, target TKDN (Tingkat Komponen Dalam Negeri), dan keakuratan ketepatan kontrak."
    ],
    badges: ["Mbiz Award", "KKP Terbaik", "SAKIP & TKDN"]
  },
  {
    id: "ach-2",
    category: "kepegawaian",
    title: "Manajemen Kepegawaian & SDM Aparatur",
    highlight: "Membangun fondasi SDM aparatur yang kompeten dan berdaya saing melalui perencanaan terukur.",
    details: [
      "Penyusunan SKP & Perkin: Sebagai Tim Penyusun SKP Pegawai untuk menyelaraskan target kinerja individu dengan Perjanjian Kinerja (Perkin) organisasi, meningkatkan tanggung jawab dan profesionalisme pegawai.",
      "Rekrutmen ASN (2023 & 2024): Menjadi anggota tim seleksi nasional rekrutmen Aparatur Sipil Negara selama dua periode berturut-turut.",
      "Perencanaan Formasi ASN: Aktif sebagai tim teknis penyusun dokumen Analisis Jabatan (Anjab), Analisis Beban Kerja (ABK), dan Operator Formasi ASN guna memastikan akurasi data kebutuhan pegawai."
    ],
    badges: ["Tim Rekrutmen Nasional", "Anjab & ABK", "Penyusun SKP"]
  },
  {
    id: "ach-3",
    category: "rumahtangga",
    title: "Inovasi Rumah Tangga & Digitalisasi Layanan",
    highlight: "Mengubah pola kerja konvensional menuju sistem pemerintahan modern berbasis elektronik (E-Government).",
    details: [
      "Koordinator Rumah Tangga: Mengelola operasional internal dengan standar efisiensi tinggi, keterbukaan informasi, dan tingkat ketepatan terukur.",
      "Digitalisasi Layanan Internal: Menciptakan sistem layanan rumah tangga berbasis online yang memangkas rantai birokrasi dan mempercepat layanan internal.",
      "Pencapaian SPBE 100 & WBK: Berkontribusi aktif mencapai Nilai SPBE 100 (Sempurna) melalui integrasi data, serta mendukung kelolosan zona integritas Wilayah Bebas dari Korupsi (WBK).",
      "Inovasi Pelayanan Kompetitif: Layanan rumah tangga digital dijadikan standar pengajuan inovasi dalam proses pengajuan Politeknik ATI Makassar menuju Wilayah Birokrasi Bersih dan Melayani (WBBM).",
      "Dianugerahi penghargaan Pegawai Terbaik Kategori Inovasi Layanan Rumah Tangga Satker pada tahun 2024."
    ],
    badges: ["SPBE 100 Sempurna", "Pegawai Terbaik 2024", "Pioneer WBBM"]
  }
];

export const INITIAL_PORTFOLIO_ITEMS: PortfolioItem[] = [
  // Category Manajerial
  {
    id: "man-1",
    title: "Tim Rekrutmen ASN (2023 & 2024)",
    category: "manajerial",
    description: "Terlibat aktif sebagai panitia teknis nasional dalam pelaksanaan seleksi rekrutmen ASN (CPNS & PPPK) selama dua tahun berturut-turut.",
    tags: ["Panitia Nasional", "Kepegawaian", "Rekrutmen ASN"],
    iconName: "Users"
  },
  {
    id: "man-2",
    title: "Perencanaan SDM (Anjab ABK)",
    category: "manajerial",
    description: "Penyusunan dokumen Analisis Jabatan dan Analisis Beban Kerja menggunakan sistem formasi terpadu untuk efisiensi rasio kebutuhan pegawai.",
    tags: ["Anjab", "ABK", "SDM Aparatur"],
    iconName: "FileSpreadsheet"
  },
  {
    id: "man-3",
    title: "Penyusunan & Perumusan SKP Pegawai",
    category: "manajerial",
    description: "Bekerja menyelaraskan target kinerja individu pegawai di unit dengan Perjanjian Kinerja (Perkin) pimpinan organisasi secara makro.",
    tags: ["SKP Pegawai", "Perkin", "Evaluasi Kinerja"],
    iconName: "FileCheck2"
  },
  {
    id: "man-4",
    title: "Evaluasi Disiplin & Kepatuhan Absensi",
    category: "manajerial",
    description: "Penyusunan rekapitulasi perhitungan disiplin, kepatuhan absensi, dan ijin keluar kantor sebagai acuan penilaian perilaku pegawai resmi untuk pimpinan.",
    tags: ["Disiplin ASN", "Absensi", "Perilaku Kerja"],
    iconName: "Award"
  },
  {
    id: "man-5",
    title: "Validator Dokumen SKP Unit",
    category: "manajerial",
    description: "Bertindak sebagai validator administratif dan substantif dokumen Sasaran Kinerja Pegawai sebelum diserahkan untuk penilaian akhir pimpinan.",
    tags: ["Validasi", "SKP ASN", "Standarisasi"],
    iconName: "CheckCircle"
  },
  {
    id: "man-6",
    title: "Anggota Tim SPBE & WBK/WBBM",
    category: "manajerial",
    description: "Anggota tim inti Sistem Pemerintahan Berbasis Elektronik dan pembentukan Zona Integritas (WBK/WBBM) Politeknik ATI Makassar.",
    tags: ["SPBE", "WBK/WBBM", "ISO Audit"],
    iconName: "ShieldAlert"
  },
  {
    id: "man-7",
    title: "Tim Promosi & Sosialisasi PMB",
    category: "manajerial",
    description: "Berperan dalam menyusun dan melaksanakan strategi promosi Penerimaan Mahasiswa Baru Politeknik ATI Makassar secara digital maupun luring.",
    tags: ["PMB", "Promosi Kampus", "Sosialisasi"],
    iconName: "Megaphone"
  },
  {
    id: "man-8",
    title: "Penggunaan Aplikasi Birokrasi Nasional",
    category: "manajerial",
    description: "Penguasaan dan operasional aplikasi kepegawaian nasional seperti SIPEGI, SIASN (BKN) secara mahir untuk administrasi pegawai berkala.",
    tags: ["SIASN", "SIPEGI", "E-Government"],
    iconName: "Server"
  },
  {
    id: "man-9",
    title: "Sertifikasi Kompetensi & Teknis",
    category: "manajerial",
    description: "Memiliki sertifikat Bimbingan Teknis SDM Aparatur, Sertifikat Pengadaan Barang/Jasa (PBJ) Pemerintah Level 1, K3 Laboratorium Pendidikan, dan Sertifikat Lisensi Power BI.",
    tags: ["Sertifikasi", "PBJ Lvl 1", "Power BI", "K3 Lab"],
    iconName: "GraduationCap"
  },

  // Category Aplikasi
  {
    id: "app-1",
    title: "Dashboard Monitoring Pimpinan",
    category: "aplikasi",
    description: "Aplikasi rekapitulasi data pimpinan untuk melakukan pemantauan agenda kantor, data izin keluar kantor pegawai, dan status pemeliharaan sarana prasarana penunjang secara dashboard real-time.",
    tags: ["Dashboard", "React", "Monitoring", "Sarpras"],
    iconName: "LayoutDashboard"
  },
  {
    id: "app-2",
    title: "Digitalisasi Layanan Peminjaman Ruang Rapat Online",
    category: "aplikasi",
    description: "Sistem reservasi ruang rapat berbasis web terpadu yang memangkas penggunaan birokrasi dan menghindari bentrok jadwal rapat internal.",
    tags: ["E-Government", "Reservasi Web", "Digitalisasi"],
    iconName: "CalendarDays"
  },
  {
    id: "app-3",
    title: "Digitalisasi Pelaporan Kerusakan Sarana Prasarana",
    category: "aplikasi",
    description: "Sistem pelaporan kerusakan aset kantor langsung terhubung ke Koordinator Rumah Tangga untuk respon perbaikan yang lebih cepat dan transparan.",
    tags: ["Sarpras", "Ticketing", "Efisiensi"],
    iconName: "Wrench"
  },
  {
    id: "app-4",
    title: "Digitalisasi Reservasi Kendaraan Dinas",
    category: "aplikasi",
    description: "Portal peminjaman armada mobil dan motor dinas satker dengan persetujuan digital, monitoring KM akhir, dan kendali penugasan sopir.",
    tags: ["Fleet System", "Reservasi", "Aset Negara"],
    iconName: "Car"
  },
  {
    id: "app-5",
    title: "Dashboard Terpadu Kepegawaian",
    category: "aplikasi",
    description: "Platform visualisasi status keaslian, kenaikan pangkat, berkas SKP, dan profil lengkap pegawai secara interaktif murni menggunakan Power BI dan Web integration.",
    tags: ["Power BI", "Visualisasi", "Kepegawaian"],
    iconName: "BarChart3"
  },
  {
    id: "app-6",
    title: "Sistem Elektronik Izin Keluar Kantor",
    category: "aplikasi",
    description: "Layanan pengajuan izin meninggalkan kantor bagi ASN saat jam kerja secara mandiri berbasis digital, langsung terverifikasi oleh pimpinan dan terekap otomatis.",
    tags: ["Sistem Izin", "Aplikasi Web", "Disiplin"],
    iconName: "FileClock"
  },
  {
    id: "app-7",
    title: "Peminjaman Ruang Kegiatan Mahasiswa",
    category: "aplikasi",
    description: "Integrasi sistem peminjaman fasilitas kampus untuk ormawa/kemahasiswaan dengan keterbukaan status pendaftaran transparan.",
    tags: ["Kemahasiswaan", "Fasilitas Kampus", "Online Form"],
    iconName: "Building2"
  },
  {
    id: "app-8",
    title: "Sistem Absensi Wisuda Barcode",
    category: "aplikasi",
    description: "Digitalisasi kontrol masuk peserta wisuda menggunakan teknologi scan barcode instan untuk mempercepat registrasi ribuan wisudawan.",
    tags: ["Barcode Scan", "Wisuda", "Event Tech"],
    iconName: "QrCode"
  },
  {
    id: "app-9",
    title: "Web Dokumentasi Kegiatan PMB",
    category: "aplikasi",
    description: "Galeri interaktif dan monitoring arsip dokumentasi pelaksanaan promosi dan seleksi Penerimaan Mahasiswa Baru Politeknik ATI Makassar.",
    tags: ["Web PMB", "Dokumentasi", "React Gallery"],
    iconName: "Camera"
  },
  {
    id: "app-10",
    title: "E-procurement & Digital Purchasing Tools",
    category: "aplikasi",
    description: "Pakar operasional praktis dalam sistem pengadaan e-procurement (LPSE, Mbiz, dan E-Katalog Nasional) untuk mengoptimalkan ketepatan belanja APBN.",
    tags: ["LPSE", "Mbiz", "E-Katalog", "Pengadaan"],
    iconName: "ShoppingBag"
  },
  {
    id: "app-11",
    title: "Duplikasi Inovasi Layanan ke SMTI Makassar",
    category: "aplikasi",
    description: "Mereplikasi sistem kepegawaian, peminjaman ruang rapat online, dan izin keluar kantor digital dari Politeknik ATIM untuk digunakan di SMK SMTI Makassar.",
    tags: ["Replikasi Sistem", "SMTI Makassar", "Knowledge Sharing"],
    iconName: "CopyCheck"
  }
];
