import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Shield, Award, Sparkles, LogIn, LogOut, Settings } from "lucide-react";
import { Biodata } from "../types";

interface HeaderProps {
  biodata: Biodata;
  isAdmin: boolean;
  onAdminLoginTrigger: () => void;
  onLogout: () => void;
  onEditBiodataTrigger: () => void; // Added for editing overall content
}

export default function Header({ biodata, isAdmin, onAdminLoginTrigger, onLogout, onEditBiodataTrigger }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("banner");

  const navLinks = [
    { name: "Beranda", href: "#banner" },
    { name: "Biodata", href: "#biodata" },
    { name: "Capaian Strategis", href: "#capaian" },
    { name: "Pengalaman & Inovasi", href: "#pengalaman" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Track active section upon scroll
      const entries = navLinks.map((link) => {
        const el = document.getElementById(link.href.replace("#", ""));
        if (!el) return { id: link.href, rect: { top: 0, bottom: 0 } };
        return { id: link.href, rect: el.getBoundingClientRect() };
      });

      const current = entries.find((entry) => {
        return entry.rect.top <= 120 && entry.rect.bottom >= 120;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-xs border-b border-slate-200/50 py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand/Logo Layout */}
          <a href="#banner" className="flex items-center gap-3 select-none group">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200/60 flex items-center justify-center bg-slate-50 shadow-xs group-hover:scale-105 transition-all">
              <img
                src={biodata.photoUrl || "/src/assets/images/pixar_asn_char_1779809032396.png"}
                alt="Dasrialdi Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-sm font-bold font-display text-slate-900 tracking-tight leading-none group-hover:text-slate-950">
                DASRIALDI
              </h1>
              <span className="text-[10px] font-mono text-slate-400 font-bold tracking-wider block mt-0.5 uppercase">
                Pranata Komputer
              </span>
            </div>
          </a>

          {/* Desktop Links Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "text-slate-900 bg-slate-50 font-bold"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/50"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Header Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onEditBiodataTrigger}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                  id="btn-edit-konten"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Edit Konten Web
                </button>
                <button
                  onClick={onLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 border border-red-150 hover:bg-red-100/60 transition-colors cursor-pointer"
                  id="btn-logout-admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Keluar Admin
                </button>
              </div>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 border border-slate-200 text-slate-800 uppercase tracking-widest font-mono">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                TMT: {biodata.tahunMasuk}
              </span>
            )}
          </div>

          {/* Mobile hamburger icon trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Responsive drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[70px] left-0 right-0 z-30 bg-white border-b border-slate-200 p-6 shadow-xl flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-1 text-sm font-semibold text-slate-500 hover:text-slate-900 border-b border-transparent hover:border-slate-100 transition-all"
              >
                {link.name}
              </a>
            ))}

            <div className="h-px bg-slate-100 my-2" />

            {isAdmin && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onEditBiodataTrigger();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold text-slate-800 bg-slate-150 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  <Settings className="w-4 h-4" />
                  Edit Konten Web
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 border border-red-150 hover:bg-red-100/60 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Keluar Admin
                </button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono font-bold tracking-wider">
                PREDIKAT: SANGAT BAIK
              </span>
              <span className="text-xs text-slate-600 font-semibold">Tahun {biodata.tahunMasuk}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
