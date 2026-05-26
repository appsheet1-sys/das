import { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import BiodataSection from "./components/BiodataSection";
import AchievementsSection from "./components/AchievementsSection";
import PortfolioSection from "./components/PortfolioSection";
import TestimonialsSection from "./components/TestimonialsSection";
import AdminLogin from "./components/AdminLogin";
import EditBiodataModal from "./components/EditBiodataModal"; // Implemented content editor modal

import {
  INITIAL_BIODATA,
  INITIAL_ACHIEVEMENTS,
  INITIAL_PORTFOLIO_ITEMS
} from "./data";
import { PortfolioItem, Biodata } from "./types";
import { Mail, MapPin, Building, Globe, Send, ShieldAlert, BadgeCheck, FileCheck } from "lucide-react";

// Import Firebase config & helpers
import { db, auth, handleFirestoreError, OperationType } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, getDocs, collection, deleteDoc, getDocFromServer } from "firebase/firestore";

export default function App() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Controls the admin's editable values and slogans modal
  const [isLoading, setIsLoading] = useState(true);
  
  // Sync state with LocalStorage for persistent admin edits
  const [biodata, setBiodata] = useState<Biodata>(() => {
    const saved = localStorage.getItem("dasrialdi_portfolio_biodata");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return INITIAL_BIODATA;
  });

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem("dasrialdi_portfolio_items");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return INITIAL_PORTFOLIO_ITEMS;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem("dasrialdi_portfolio_is_admin") === "true";
  });

  // 1. Initial Data Fetching from Firestore
  useEffect(() => {
    const testAndLoadConnection = async () => {
      try {
        console.log("Menghubungkan ke database Firebase...");
        const biodataRef = doc(db, "biodata", "info");
        
        // Retrieve biodata from live server
        const biodataSnap = await getDocFromServer(biodataRef);
        if (biodataSnap.exists()) {
          setBiodata(biodataSnap.data() as Biodata);
          localStorage.setItem("dasrialdi_portfolio_biodata", JSON.stringify(biodataSnap.data()));
        } else {
          console.log("Dokumen biodata/info belum ada di database.");
        }

        // Retrieve items from live server
        const itemsColl = collection(db, "portfolioItems");
        const itemsSnap = await getDocs(itemsColl);
        if (!itemsSnap.empty) {
          const items: PortfolioItem[] = [];
          itemsSnap.forEach((itemDoc) => {
            items.push(itemDoc.data() as PortfolioItem);
          });
          setPortfolioItems(items);
          localStorage.setItem("dasrialdi_portfolio_items", JSON.stringify(items));
        } else {
          console.log("Koleksi portfolioItems belum ada di database.");
        }
      } catch (error) {
        console.warn("Koneksi awal database offline atau belum di-seed, menggunakan data lokal:", error);
      } finally {
        setIsLoading(false);
      }
    };

    testAndLoadConnection();
  }, []);

  // 2. Track Admin Session through Firebase Auth (Google Sign-In integration)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "appsheet1@atim.ac.id") {
        console.log("Sesi Google Terverifikasi untuk Administrator:", user.email);
        setIsAdmin(true);
        localStorage.setItem("dasrialdi_portfolio_is_admin", "true");
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle Login State Change
  const handleAdminLoginStatusChange = async (status: boolean) => {
    setIsAdmin(status);
    localStorage.setItem("dasrialdi_portfolio_is_admin", status ? "true" : "false");
    if (!status) {
      try {
        await signOut(auth);
        console.log("Sesi Firebase Auth berhasil ditutup.");
      } catch (err) {
        console.error("Gagal mengeluarkan akun dari Firebase Auth:", err);
      }
    }
  };

  // Shared updater for biodata & slogan values
  const handleSaveBiodata = async (updated: Biodata) => {
    setBiodata(updated);
    localStorage.setItem("dasrialdi_portfolio_biodata", JSON.stringify(updated));
    try {
      const biodataRef = doc(db, "biodata", "info");
      await setDoc(biodataRef, updated);
      console.log("Biodata berhasil tersimpan di database cloud.");
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "biodata/info");
    }
  };

  // Admin save modified or added item
  const handleSavePortfolioItem = async (newItem: PortfolioItem) => {
    setPortfolioItems((prev) => {
      const exists = prev.some((item) => item.id === newItem.id);
      let updated: PortfolioItem[];
      if (exists) {
        updated = prev.map((item) => (item.id === newItem.id ? newItem : item));
      } else {
        updated = [newItem, ...prev];
      }
      localStorage.setItem("dasrialdi_portfolio_items", JSON.stringify(updated));
      return updated;
    });

    try {
      const itemRef = doc(db, "portfolioItems", newItem.id);
      await setDoc(itemRef, newItem);
      console.log(`Portfolio item ${newItem.id} berhasil tersimpan di database cloud.`);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `portfolioItems/${newItem.id}`);
    }
  };

  // Admin delete item
  const handleDeletePortfolioItem = async (id: string) => {
    setPortfolioItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("dasrialdi_portfolio_items", JSON.stringify(updated));
      return updated;
    });

    try {
      const itemRef = doc(db, "portfolioItems", id);
      await deleteDoc(itemRef);
      console.log(`Portfolio item ${id} berhasil dihapus dari database cloud.`);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `portfolioItems/${id}`);
    }
  };

  // Handle CTA button click to scroll down to achievements
  const handleScrollToAchievements = () => {
    const section = document.getElementById("capaian");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-slate-950 selection:text-white">
      {/* 1. Header (Sticky navigation bar) */}
      <Header
        biodata={biodata}
        isAdmin={isAdmin}
        onAdminLoginTrigger={() => {}}
        onLogout={() => handleAdminLoginStatusChange(false)}
        onEditBiodataTrigger={() => setIsEditModalOpen(true)}
      />

      {/* 2. Hero Section featuring 3D Pixar character */}
      <HeroSection
        biodata={biodata}
        onExplore={handleScrollToAchievements}
        isAdmin={isAdmin}
        onPhotoUpload={(base64Url) => {
          const updated = { ...biodata, photoUrl: base64Url };
          handleSaveBiodata(updated);
        }}
      />

      {/* Admin Mode Badge Indicator */}
      {isAdmin && (
        <div className="bg-slate-900 border-b border-white/10 text-white font-semibold text-center text-xs py-2 px-4 shadow-xs sticky top-[73px] z-30 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <ShieldAlert className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
          <span className="font-light">Mode Administrator Aktif.</span>
          {auth.currentUser?.email === "appsheet1@atim.ac.id" ? (
            <span className="text-emerald-400 font-mono text-[11px] font-bold">● CLOUD DB PERSISTENT (FIREBASE SINKRON)</span>
          ) : (
            <span className="text-amber-300 font-mono text-[11px]">SINKRONISASI LOKAL (Gunakan login Google di tombol pojok kanan bawah jika ingin online ke semua device)</span>
          )}
        </div>
      )}

      {/* 3. Biodata (Bento Grid layout) */}
      <BiodataSection
        biodata={biodata}
      />

      {/* 4. Strategic Contributions (Custom styled tabs) */}
      <AchievementsSection
        achievements={INITIAL_ACHIEVEMENTS}
        biodata={biodata}
      />

      {/* 5. Experience & Innovations List (Admin Edit Actions) */}
      <PortfolioSection
        items={portfolioItems}
        isAdmin={isAdmin}
        onSaveItem={handleSavePortfolioItem}
        onDeleteItem={handleDeletePortfolioItem}
        biodata={biodata}
      />

      {/* 6. Testimonials and Public endorsement */}
      <TestimonialsSection 
        biodata={biodata}
      />

      {/* Edit Biodata and Texts Modal - accessible to admin */}
      {isEditModalOpen && (
        <EditBiodataModal
          biodata={biodata}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updated) => {
            handleSaveBiodata(updated);
            setIsEditModalOpen(false);
          }}
        />
      )}

      {/* 7. Footer Area */}
      <footer className="bg-slate-900 text-white border-t border-slate-950 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-white/5 pb-10 mb-8">
          
          {/* Identity column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-6 h-6 text-emerald-400" />
              <h4 className="text-lg font-bold font-display tracking-tight text-white">
                Dasrialdi, A.Md
              </h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Fungsional Pranata Komputer Terampil & Koordinator Rumah Tangga. Mengabdi sejak 2023 untuk memelopori sistem digitalisasi layanan birokrasi profesional.
            </p>
          </div>

          {/* Sektor Kerja / Instansi */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">
              Lokasi Pengabdian
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li className="flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-400 scroll-smooth shrink-0" />
                <span className="font-semibold text-white">Satker Kemenperin (Politeknik ATI Makassar)</span>
              </li>
              <li className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-400 scroll-smooth shrink-0" />
                <span>Kementerian Perindustrian RI</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 scroll-smooth shrink-0" />
                <span>Makassar, Sulawesi Selatan, Indonesia</span>
              </li>
            </ul>
          </div>

          {/* Kontak Resmi */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">
              Kontak & Verifikasi
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400 font-light">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="font-mono">appsheet1@atim.ac.id</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                <a href="https://atim.ac.id" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Web Politeknik ATIM
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Technical metadata credits in footer margins */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-500 gap-4">
          <p>© 2026 Dasrialdi, A.Md. Semua hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-4">
            {auth.currentUser?.email === "appsheet1@atim.ac.id" ? (
              <span className="text-emerald-500 font-bold">DATABASE CLOUD: TERHUBUNG (SINKRON)</span>
            ) : (
              <span>DATABASE LOCAL SYNC (FIREBASE READY)</span>
            )}
            <span>DIREKTORAT JENDERAL BPSDMI</span>
          </div>
        </div>
      </footer>

      {/* Floating admin trigger widget control */}
      <AdminLogin
        isAdmin={isAdmin}
        onLoginStatusChange={handleAdminLoginStatusChange}
      />
    </div>
  );
}
