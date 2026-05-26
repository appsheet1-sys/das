import React, { useRef } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, ShieldCheck, Cpu, UtensilsCrossed, Camera } from "lucide-react";
import { Biodata } from "../types";

interface HeroSectionProps {
  biodata: Biodata;
  onExplore: () => void;
  isAdmin: boolean;
  onPhotoUpload: (base64Url: string) => void;
}

export default function HeroSection({ biodata, onExplore, isAdmin, onPhotoUpload }: HeroSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Let's reference the exact generated Pixar character file or the uploaded photo url
  const characterImage = biodata.photoUrl || "/src/assets/images/pixar_asn_char_1779809032396.png";

  const handleImageClick = () => {
    if (isAdmin && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const img = new Image();
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX_WIDTH = 400;
            const MAX_HEIGHT = 400;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              // Save as a highly optimized, light-weight JPEG to avoid localStorage limits
              const compressedBase64 = canvas.toDataURL("image/jpeg", 0.8);
              onPhotoUpload(compressedBase64);
            } else {
              onPhotoUpload(reader.result as string);
            }
          };
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="banner" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-grid-pattern overflow-hidden">
      {/* Decorative blurred soft spheres for elegant background feel */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-slate-100 blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-70" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-50/50 blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3 opacity-50" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Professional Profile Text */}
        <motion.div 
          className="lg:col-span-7 space-y-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          id="hero-left-col"
        >
          <div className="space-y-4">
            {/* Status Badges */}
            <div className="flex flex-wrap gap-2.5 items-center">
              <motion.span 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 text-white shadow-xs"
                whileHover={{ scale: 1.05 }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Aparatur Sipil Negara (ASN)
              </motion.span>
              
              <motion.span 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                Predikat Kinerja: Sangat Baik
              </motion.span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.1]">
              <span className="block font-light text-slate-500">Portofolio Personal</span>
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 bg-clip-text text-transparent">
                {biodata.nama}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-xl font-light leading-relaxed">
              {biodata.heroSlogan || "Mewujudkan transformasi digital birokrasi dan modernisasi pelayanan publik yang transparan, akuntabel, serta berstandar tinggi."}
            </p>
          </div>

          {/* Key Mini Roles Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg pt-2">
            <motion.div 
              className="p-4 rounded-2xl bg-white/80 border border-slate-100 hover:border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-3.5"
              whileHover={{ y: -3 }}
            >
              <div className="p-2.5 rounded-lg bg-slate-50 text-slate-800">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Jabatan Utama</h4>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{biodata.jabatan}</p>
              </div>
            </motion.div>

            <motion.div 
              className="p-4 rounded-2xl bg-white/80 border border-slate-100 hover:border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-3.5"
              whileHover={{ y: -3 }}
            >
              <div className="p-2.5 rounded-lg bg-slate-50 text-slate-800">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Jabatan Tambahan</h4>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{biodata.jabatanTambahan}</p>
              </div>
            </motion.div>
          </div>

          {/* Action Call to Action (CTA) */}
          <div className="flex flex-wrap gap-4 pt-4">
            <motion.button
              onClick={onExplore}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-slate-900 transition-all shadow-sm hover:shadow-lg hover:bg-slate-800 focus:outline-hidden cursor-pointer gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Lihat Capaian Strategis
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            
            <a
              href="#pengalaman"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 hover:text-slate-950 transition-all border border-slate-200/80 shadow-xs gap-2"
            >
              Daftar Aplikasi & Inovasi
            </a>
          </div>
        </motion.div>

        {/* Right Side: Cool Pixar Civil Servant 3D Character Rendering */}
        <motion.div 
          className="lg:col-span-5 flex justify-center relative"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          id="hero-right-col"
        >
          {/* Frameless minimalist interactive portrait container */}
          <div className="relative w-72 h-72 sm:w-85 sm:h-85 lg:w-96 lg:h-96 group">
            {/* Visual glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-slate-100 scale-105 blur-lg opacity-40 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" />
            
            {/* Main Interactive Aspect Card */}
            <motion.div 
              onClick={handleImageClick}
              className={`relative w-full h-full bg-white border border-slate-200/60 p-3.5 sm:p-5 rounded-3xl overflow-hidden shadow-xl ${isAdmin ? "cursor-pointer" : ""}`}
              whileHover={{ rotateY: 5, rotateX: -5 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {isAdmin && (
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              )}

              <img
                src={characterImage}
                alt="Dasrialdi, A.Md Pixar ASN Character Representation"
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  // Fallback if image has loading issue
                  const target = e.target as HTMLImageElement;
                  target.src = "https://picsum.photos/seed/asn/500/500";
                }}
                referrerPolicy="no-referrer"
              />

              {/* Upload image overlay when isAdmin */}
              {isAdmin && (
                <div className="absolute inset-3.5 sm:inset-5 rounded-2xl bg-black/60 opacity-0 hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-300 select-none">
                  <Camera className="w-8 h-8 mb-2 animate-pulse text-emerald-400" />
                  <span className="text-xs font-bold font-display">Ganti Foto Profil</span>
                  <span className="text-[10px] font-mono text-slate-300 mt-1">Upload dari Komputer</span>
                </div>
              )}
              
              {/* Dynamic Overlay labels inside the canvas */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-100 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 font-display">Tahun Masuk ASN</h5>
                    <p className="text-[11px] font-mono text-slate-500 mt-0.5">Satker Kemenperin</p>
                  </div>
                  <span className="text-sm font-extrabold text-slate-800 font-mono bg-slate-100 px-2 py-1 rounded-md">
                    {biodata.tahunMasuk}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Circular badge accent floating beside image */}
            <motion.div 
              className="absolute -top-3 -right-3 bg-white border border-slate-200 shadow-md p-2 rounded-full"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="bg-slate-50 p-2 rounded-full text-slate-900">
                <Sparkles className="w-5 h-5 fill-slate-300" />
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
