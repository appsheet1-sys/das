import { motion } from "motion/react";
import { GraduationCap, Award, Briefcase, Calendar, ChevronRight, User } from "lucide-react";
import { Biodata } from "../types";

interface BiodataSectionProps {
  biodata: Biodata;
}

export default function BiodataSection({ biodata }: BiodataSectionProps) {
  return (
    <section id="biodata" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Profil Resmi
          </motion.h2>
          <motion.h3 
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Biodata Kepegawaian & Kompetensi
          </motion.h3>
          <p className="mt-4 text-slate-500 font-light max-w-xl mx-auto">
            {biodata.biodataSlogan || "Informasi administratif utama dan rekam jejak formal penugasan pada instansi pemerintah Republik Indonesia."}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Main Core Profile (Span 1) */}
          <motion.div 
            className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-100/80 hover:border-slate-300 hover:bg-white transition-all duration-300 md:col-span-1 flex flex-col justify-between group"
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="p-3 w-fit rounded-2xl bg-white border border-slate-150 text-slate-900 shadow-xs mb-6">
                <User className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Nama Lengkap</h4>
              <p className="text-2xl font-extrabold text-slate-900 mt-2 font-display">{biodata.nama}</p>
              <div className="h-px bg-slate-200/60 my-4" />
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                Sebagai Aparatur Sipil Negara, mengemban tugas dengan profesionalisme tinggi, menjunjung etika ASN BerAKHLAK.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mt-6 pt-4 group-hover:text-slate-800 transition-colors">
              <span>Status Kepegawaian Aktif</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>

          {/* Card 2: Pendidikan Terakhir (Academic Background) */}
          <motion.div 
            className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-100/80 hover:border-slate-300 hover:bg-white transition-all duration-300 flex flex-col justify-between group"
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div>
              <div className="p-3 w-fit rounded-2xl bg-white border border-slate-150 text-slate-900 shadow-xs mb-6">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Pendidikan Terakhir</h4>
              <p className="text-xl font-extrabold text-slate-900 mt-2 leading-snug font-display">
                {biodata.pendidikanTerakhir}
              </p>
              {biodata.instansiPendidikan && (
                <span className="inline-block mt-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-mono">
                  {biodata.instansiPendidikan}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mt-6 pt-4 group-hover:text-slate-800 transition-colors">
              <span>Kompetensi Teknik Komputer</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>

          {/* Card 3: Jabatan & Tanggung Jawab */}
          <motion.div 
            className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-100/80 hover:border-slate-300 hover:bg-white transition-all duration-300 flex flex-col justify-between group md:col-span-1"
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <div className="p-3 w-fit rounded-2xl bg-white border border-slate-150 text-slate-900 shadow-xs mb-6">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Jabatan Struktural & Tambahan</h4>
              <p className="text-lg font-extrabold text-slate-900 mt-2 font-display">{biodata.jabatan}</p>
              <p className="text-sm text-slate-600 font-medium mt-1">{biodata.jabatanTambahan}</p>
              <div className="h-px bg-slate-200/60 my-4" />
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                Merancang standardisasi operasional, mengelola aset negara secara digital, menyelaraskan administrasi internal, dan pengadaan barang/jasa satker secara akuntabel.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mt-6 pt-4 group-hover:text-slate-800 transition-colors">
              <span>Fungsional Pranata Komputer</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>

          {/* Card 4: Kinerja Sangat Baik 2024 & 2025 (Span 2 on medium+, or Col span 2) */}
          <motion.div 
            className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-950 transition-all duration-300 md:col-span-2 flex flex-col justify-between group"
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-white/10 text-emerald-400 shadow-xs mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded-full font-bold">
                    PRESTASI SANGAT BAIK
                  </span>
                </div>
              </div>

              <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">Hasil Penilaian Kinerja Kemenpan RB</h4>
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display mt-3">
                Predikat Kinerja Dua Periode Berturut-turut
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <span className="text-2xl font-black text-white font-mono block">2024</span>
                  <span className="text-xs text-slate-400 font-semibold uppercase block tracking-wider mt-1">Predikat</span>
                  <span className="text-sm font-bold text-emerald-400 mt-1 block">
                    {biodata.predikatKinerja["2024"] || "Sangat Baik"}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <span className="text-2xl font-black text-white font-mono block">2025</span>
                  <span className="text-xs text-slate-400 font-semibold uppercase block tracking-wider mt-1">Predikat</span>
                  <span className="text-sm font-bold text-emerald-400 mt-1 block">
                    {biodata.predikatKinerja["2025"] || "Sangat Baik"}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-6 leading-relaxed font-light">
              Hasil evaluasi Sasaran Kinerja Pegawai (SKP) yang diselaraskan dengan Perjanjian Kinerja instansi, dinilai berkontribusi krusial melampaui ekspektasi pimpinan organisasi.
            </p>
          </motion.div>

          {/* Card 5: Tahun Masuk Kerja */}
          <motion.div 
            className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-100/80 hover:border-slate-300 hover:bg-white transition-all duration-300 flex flex-col justify-between group"
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <div className="p-3 w-fit rounded-2xl bg-white border border-slate-150 text-slate-900 shadow-xs mb-6">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">Tahun Masuk ASN</h4>
              <p className="text-4xl font-extrabold tracking-tight text-slate-900 mt-2 font-mono">
                {biodata.tahunMasuk}
              </p>
              <div className="h-px bg-slate-200/60 my-4" />
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                Resmi mengabdi sejak tahun {biodata.tahunMasuk}, langsung ditugaskan mengawal digitalisasi kelembagaan dan inovasi pengadaan barang/jasa satker secara terintegrasi.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mt-6 pt-4 group-hover:text-slate-800 transition-colors">
              <span>Kepegawaian TMT {biodata.tahunMasuk}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
