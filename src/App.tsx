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

export default function App() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Controls the admin's editable values and slogans modal
  
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

  // Handle Login State Change
  const handleAdminLoginStatusChange = (status: boolean) => {
    setIsAdmin(status);
    localStorage.setItem("dasrialdi_portfolio_is_admin", status ? "true" : "false");
  };

  // Admin save modified or added item
  const handleSavePortfolioItem = (newItem: PortfolioItem) => {
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
  };

  // Admin delete item
  const handleDeletePortfolioItem = (id: string) => {
    setPortfolioItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("dasrialdi_portfolio_items", JSON.stringify(updated));
      return updated;
    });
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
          setBiodata(updated);
          localStorage.setItem("dasrialdi_portfolio_biodata", JSON.stringify(updated));
        }}
      />

      {/* Admin Mode Badge Indicator */}
      {isAdmin && (
        <div className="bg-amber-500 text-white font-semibold text-center text-xs py-2 px-4 shadow-xs sticky top-[73px] z-30 flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 animate-bounce" />
          <span>Anda sedang dalam Mode Administrator (admin). Anda dapat mengedit foto profil, biodata, pendidikan, serta semua slogan deskripsi teks halaman web ini.</span>
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
            setBiodata(updated);
            localStorage.setItem("dasrialdi_portfolio_biodata", JSON.stringify(updated));
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
            <span>SINKRONISASI: LOCALSTORAGE (AKTIF)</span>
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
