import React, { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { X, Save, User, GraduationCap, FileText, Award, Calendar } from "lucide-react";
import { Biodata } from "../types";

interface EditBiodataModalProps {
  biodata: Biodata;
  onClose: () => void;
  onSave: (updated: Biodata) => void;
}

type TabType = "identity" | "education" | "texts";

export default function EditBiodataModal({ biodata, onClose, onSave }: EditBiodataModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("identity");

  // Form states mapping precisely to the Biodata model
  const [nama, setNama] = useState(biodata.nama || "");
  const [jabatan, setJabatan] = useState(biodata.jabatan || "");
  const [jabatanTambahan, setJabatanTambahan] = useState(biodata.jabatanTambahan || "");
  const [tahunMasuk, setTahunMasuk] = useState<number>(biodata.tahunMasuk || 2023);
  
  const [pendidikanTerakhir, setPendidikanTerakhir] = useState(biodata.pendidikanTerakhir || "");
  const [instansiPendidikan, setInstansiPendidikan] = useState(biodata.instansiPendidikan || "");

  const [predikat2024, setPredikat2024] = useState(biodata.predikatKinerja?.["2024"] || "Sangat Baik");
  const [predikat2025, setPredikat2025] = useState(biodata.predikatKinerja?.["2025"] || "Sangat Baik");

  // Dynamic slogans for all text areas on the page
  const [heroSlogan, setHeroSlogan] = useState(biodata.heroSlogan || "");
  const [biodataSlogan, setBiodataSlogan] = useState(biodata.biodataSlogan || "");
  const [capaianSlogan, setCapaianSlogan] = useState(biodata.capaianSlogan || "");
  const [pengalamanSlogan, setPengalamanSlogan] = useState(biodata.pengalamanSlogan || "");
  const [rekomendasiSlogan, setRekomendasiSlogan] = useState(biodata.rekomendasiSlogan || "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const updated: Biodata = {
      ...biodata,
      nama,
      jabatan,
      jabatanTambahan,
      tahunMasuk: Number(tahunMasuk),
      pendidikanTerakhir,
      instansiPendidikan,
      predikatKinerja: {
        "2024": predikat2024,
        "2025": predikat2025,
      },
      heroSlogan,
      biodataSlogan,
      capaianSlogan,
      pengalamanSlogan,
      rekomendasiSlogan,
    };

    onSave(updated);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="edit-content-modal">
      {/* Dark backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <motion.div
          className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-2xl border border-slate-100"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.4 }}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-900 text-white rounded-lg">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-md font-bold text-slate-900 font-display">
                  Edit Biodata & Slogan Halaman
                </h3>
                <p className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase mt-0.5">
                  ADMINISTRATOR SATKER KEMENPERIN CONTROL
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-slate-100 px-6 bg-slate-50/30">
              <button
                type="button"
                onClick={() => setActiveTab("identity")}
                className={`py-3 px-4 border-b-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "identity"
                    ? "border-slate-900 text-slate-900 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Identitas & Jabatan
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("education")}
                className={`py-3 px-4 border-b-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "education"
                    ? "border-slate-900 text-slate-900 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Pendidikan & Kinerja
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("texts")}
                className={`py-3 px-4 border-b-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "texts"
                    ? "border-slate-900 text-slate-900 font-bold"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Slogan & Teks Web
                </span>
              </button>
            </div>

            {/* Modal Body Scroll Container */}
            <div className="px-6 py-6 max-h-[60vh] overflow-y-auto space-y-5">
              
              {/* TAB 1: IDENTITY & LABELS */}
              {activeTab === "identity" && (
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 font-display mb-1.5">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-slate-900 focus:outline-hidden bg-slate-50/50"
                      placeholder="Contoh: Dasrialdi, A.Md"
                    />
                  </div>

                  {/* Primary Work Cargo (Jabatan Utama) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 font-display mb-1.5">
                      Jabatan Utama (Pranata Komputer, dll)
                    </label>
                    <input
                      type="text"
                      required
                      value={jabatan}
                      onChange={(e) => setJabatan(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-slate-900 focus:outline-hidden bg-slate-50/50"
                      placeholder="Contoh: Fungsional Pranata Komputer Terampil"
                    />
                  </div>

                  {/* Secondary Task Cargo (Jabatan Tambahan) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 font-display mb-1.5">
                      Jabatan Tambahan (Koordinator Rumah Tangga, dll)
                    </label>
                    <input
                      type="text"
                      value={jabatanTambahan}
                      onChange={(e) => setJabatanTambahan(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-slate-900 focus:outline-hidden bg-slate-50/50"
                      placeholder="Contoh: Koordinator Rumah Tangga"
                    />
                  </div>

                  {/* ASN Entering Year */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 font-display mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Tahun Masuk Kerja ASN
                    </label>
                    <input
                      type="number"
                      required
                      value={tahunMasuk}
                      onChange={(e) => setTahunMasuk(Number(e.target.value))}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-slate-900 focus:outline-hidden bg-slate-50/50"
                      placeholder="2023"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: EDUCATION & RATINGS */}
              {activeTab === "education" && (
                <div className="space-y-4">
                  {/* Last Degree / Degree Info */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 font-display mb-1.5">
                      Pendidikan Terakhir (Jenjang)
                    </label>
                    <input
                      type="text"
                      required
                      value={pendidikanTerakhir}
                      onChange={(e) => setPendidikanTerakhir(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-slate-900 focus:outline-hidden bg-slate-50/50"
                      placeholder="Contoh: DIII Teknik Komputer"
                    />
                  </div>

                  {/* Campus Name / University */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 font-display mb-1.5">
                      Instansi Pendidikan (Universitas / Sekolah)
                    </label>
                    <input
                      type="text"
                      value={instansiPendidikan}
                      onChange={(e) => setInstansiPendidikan(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-slate-900 focus:outline-hidden bg-slate-50/50"
                      placeholder="Contoh: Politeknik Negeri Padang"
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-500" />
                      Predikat Kinerja Kemenpan RB / Kemenperin
                    </h4>

                    {/* Predikat Kinerja 2024 */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        Predikat Kinerja 2024
                      </label>
                      <input
                        type="text"
                        required
                        value={predikat2024}
                        onChange={(e) => setPredikat2024(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:ring-1 focus:ring-slate-900 focus:outline-hidden bg-white"
                        placeholder="Contoh: Sangat Baik"
                      />
                    </div>

                    {/* Predikat Kinerja 2025 */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        Predikat Kinerja 2025
                      </label>
                      <input
                        type="text"
                        required
                        value={predikat2025}
                        onChange={(e) => setPredikat2025(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:ring-1 focus:ring-slate-900 focus:outline-hidden bg-white"
                        placeholder="Contoh: Sangat Baik"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CUSTOM SLOGANS & WEB PARAGRAPHS */}
              {activeTab === "texts" && (
                <div className="space-y-4">
                  {/* Hero slogan */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 font-display mb-1.5">
                      Slogan Utama (Banner Beranda)
                    </label>
                    <textarea
                      rows={3}
                      value={heroSlogan}
                      onChange={(e) => setHeroSlogan(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-slate-900 focus:outline-hidden bg-slate-50/50"
                      placeholder="Masukkan slogan banner utama..."
                    />
                  </div>

                  {/* Biodata slogan */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 font-display mb-1.5">
                      Slogan Section Biodata
                    </label>
                    <textarea
                      rows={2}
                      value={biodataSlogan}
                      onChange={(e) => setBiodataSlogan(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-slate-900 focus:outline-hidden bg-slate-50/50"
                      placeholder="Masukkan slogan deskripsi biodata..."
                    />
                  </div>

                  {/* Achievements section slogan */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 font-display mb-1.5">
                      Slogan Section Capaian Strategis
                    </label>
                    <textarea
                      rows={2}
                      value={capaianSlogan}
                      onChange={(e) => setCapaianSlogan(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-slate-900 focus:outline-hidden bg-slate-50/50"
                      placeholder="Masukkan slogan deskripsi capaian..."
                    />
                  </div>

                  {/* Portfolio section slogan */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 font-display mb-1.5">
                      Slogan Section Pengalaman Kerja
                    </label>
                    <textarea
                      rows={2}
                      value={pengalamanSlogan}
                      onChange={(e) => setPengalamanSlogan(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-slate-900 focus:outline-hidden bg-slate-50/50"
                      placeholder="Masukkan slogan deskripsi pengalaman..."
                    />
                  </div>

                  {/* Testimonial slogan */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 font-display mb-1.5">
                      Slogan Section Testimoni/Rekomendasi
                    </label>
                    <textarea
                      rows={2}
                      value={rekomendasiSlogan}
                      onChange={(e) => setRekomendasiSlogan(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-slate-900 focus:outline-hidden bg-slate-50/50"
                      placeholder="Masukkan slogan deskripsi testimoni..."
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Modal Actions Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3 rounded-b-3xl">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg cursor-pointer transition-colors"
              >
                Batalkan
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                Simpan Perubahan
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
