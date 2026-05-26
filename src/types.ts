/**
 * Types for ASN Personal Portfolio
 */

export interface Biodata {
  nama: string;
  pendidikanTerakhir: string;
  instansiPendidikan?: string;
  jabatan: string;
  jabatanTambahan: string;
  tahunMasuk: number;
  predikatKinerja: {
    [key: string]: string;
  };
  photoUrl?: string;
  heroSlogan?: string;
  biodataSlogan?: string;
  capaianSlogan?: string;
  pengalamanSlogan?: string;
  rekomendasiSlogan?: string;
}

export interface Achievement {
  id: string;
  category: "pengadaan" | "kepegawaian" | "rumahtangga";
  title: string;
  highlight: string;
  details: string[];
  badges?: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "manajerial" | "aplikasi";
  description: string;
  evidenceUrl?: string; // Admin can add this
  evidenceTitle?: string; // Admin can add this
  imageUrl?: string; // Admin can add this
  tags?: string[];
  iconName?: string;
}

export interface UserReview {
  id: string;
  name: string;
  relation: string;
  comment: string;
  rating: number;
  date: string;
}
