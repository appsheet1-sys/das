import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, ShoppingCart, Users, Home, TrendingUp, CheckCircle, Smartphone } from "lucide-react";
import { Achievement, Biodata } from "../types";

interface AchievementsSectionProps {
  achievements: Achievement[];
  biodata: Biodata;
}

export default function AchievementsSection({ achievements, biodata }: AchievementsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("ach-1");

  // Helper icons selector
  const getIcon = (category: string) => {
    switch (category) {
      case "pengadaan":
        return <ShoppingCart className="w-5 h-5" />;
      case "kepegawaian":
        return <Users className="w-5 h-5" />;
      case "rumahtangga":
        return <Home className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  const getActiveTabColor = (category: string) => {
    switch (category) {
      case "pengadaan":
        return "text-indigo-600 bg-indigo-50 border-indigo-200";
      case "kepegawaian":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "rumahtangga":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      default:
        return "text-slate-800 bg-slate-100 border-slate-200";
    }
  };

  const selectedAchievement = achievements.find((ach) => ach.id === activeTab) || achievements[0];

  return (
    <section id="capaian" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.h2 
            className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Prestasi Utama
          </motion.h2>
          <motion.h3 
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Pencapaian Strategis & Kontribusi
          </motion.h3>
          <p className="mt-4 text-slate-500 font-light max-w-xl mx-auto">
            {biodata.capaianSlogan || "Portofolio kontribusi tingkat sektoral yang mengintegrasikan efisiensi pengadaan, tata kelola kepegawaian, dan modernisasi layanan birokrasi."}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-none">
            {achievements.map((ach) => {
              const isActive = ach.id === activeTab;
              return (
                <button
                  key={ach.id}
                  onClick={() => setActiveTab(ach.id)}
                  className={`flex-1 lg:flex-none flex items-center gap-3.5 px-5 py-4 text-left rounded-2xl border text-sm font-semibold transition-all duration-300 select-none whitespace-nowrap lg:whitespace-normal cursor-pointer ${
                    isActive
                      ? getActiveTabColor(ach.category) + " shadow-xs ring-2 ring-slate-900/5 font-bold scale-[1.01]"
                      : "bg-white text-slate-500 border-slate-200/60 hover:border-slate-300 hover:text-slate-800"
                  }`}
                >
                  <span className={`p-2 rounded-xl transition-colors ${isActive ? "bg-white/80 shadow-xs" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"}`}>
                    {getIcon(ach.category)}
                  </span>
                  <div className="block text-left">
                    <span className="text-[10px] block font-mono text-slate-400 uppercase tracking-widest">Kategori Capaian</span>
                    <span className="truncate lg:line-clamp-1 block mt-0.5">{ach.title}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Content Panel */}
          <div className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedAchievement.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/60 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between min-h-[480px]"
              >
                {/* Decorative subtle background pill */}
                <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-slate-50/70 pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  {/* Category Pill + Badges */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs font-bold font-mono uppercase bg-slate-100 text-slate-800 px-3 py-1 rounded-md">
                      {selectedAchievement.category}
                    </span>
                    {selectedAchievement.badges?.map((badge, idx) => (
                      <span key={idx} className="text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Title & Slogan */}
                  <div className="space-y-2">
                    <h4 className="text-2xl font-extrabold text-slate-900 font-display leading-tight">
                      {selectedAchievement.title}
                    </h4>
                    <p className="text-slate-500 italic text-sm font-light leading-relaxed">
                      "{selectedAchievement.highlight}"
                    </p>
                  </div>

                  {/* Separator */}
                  <div className="h-px bg-slate-100 w-full" />

                  {/* List of Details with Icons */}
                  <ul className="space-y-4">
                    {selectedAchievement.details.map((detail, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start gap-3.5 text-sm sm:text-base text-slate-600 font-light leading-relaxed group"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="mt-1 rounded-full bg-slate-100 p-1 group-hover:bg-slate-800 group-hover:text-white transition-colors duration-200">
                          <CheckCircle className="w-3.5 h-3.5 text-slate-800 group-hover:text-white" />
                        </span>
                        <span className="flex-1 text-slate-700">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Micro-statement */}
                <div className="relative z-10 pt-6 mt-6 border-t border-slate-50 text-xs text-slate-400 font-mono flex items-center justify-between">
                  <span>Sistem Rekam Jejak Kinerja ASN</span>
                  <span>Verifikasi Mandiri: OK</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
