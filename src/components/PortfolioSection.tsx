import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import { PortfolioItem, Biodata } from "../types";

// Helper to render icon from string name
const renderIcon = (name?: string) => {
  if (!name) return <Icons.FolderOpen className="w-5 h-5 text-slate-800" />;
  const IconComponent = (Icons as any)[name];
  if (IconComponent) {
    return <IconComponent className="w-5 h-5 text-slate-800" />;
  }
  return <Icons.FolderOpen className="w-5 h-5 text-slate-800" />;
};

interface PortfolioSectionProps {
  items: PortfolioItem[];
  isAdmin: boolean;
  onSaveItem: (item: PortfolioItem) => void;
  onDeleteItem: (id: string) => void;
  biodata: Biodata; // Added for editable slogan
}

export default function PortfolioSection({
  items,
  isAdmin,
  onSaveItem,
  onDeleteItem,
  biodata
}: PortfolioSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "manajerial" | "aplikasi">("all");
  
  // Modal Editing / Adding state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  
  // Fields for modal
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"manajerial" | "aplikasi">("manajerial");
  const [description, setDescription] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [evidenceTitle, setEvidenceTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tagsStr, setTagsStr] = useState("");
  const [iconName, setIconName] = useState("FolderOpen");

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory =
      activeFilter === "all" ? true : item.category === activeFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle("");
    setCategory("manajerial");
    setDescription("");
    setEvidenceUrl("");
    setEvidenceTitle("");
    setImageUrl("");
    setTagsStr("");
    setIconName("FolderOpen");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setDescription(item.description);
    setEvidenceUrl(item.evidenceUrl || "");
    setEvidenceTitle(item.evidenceTitle || "");
    setImageUrl(item.imageUrl || "");
    setTagsStr(item.tags?.join(", ") || "");
    setIconName(item.iconName || "FolderOpen");
    setIsModalOpen(true);
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Harap isi Judul dan Deskripsi!");
      return;
    }

    const saved: PortfolioItem = {
      id: editingItem ? editingItem.id : "item-" + Date.now(),
      title,
      category,
      description,
      evidenceUrl: evidenceUrl.trim() || undefined,
      evidenceTitle: evidenceTitle.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      tags: tagsStr
        ? tagsStr.split(",").map((s) => s.trim()).filter(Boolean)
        : undefined,
      iconName
    };

    onSaveItem(saved);
    setIsModalOpen(false);
  };

  return (
    <section id="pengalaman" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Elements */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono mb-2">
              Karya & Aktivitas
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Pengalaman Kerja & Inovasi Layanan
            </h3>
            <p className="mt-3 text-slate-500 font-light max-w-xl">
              {biodata.pengalamanSlogan || "Daftar komprehensif kontribusi manajerial teknis serta digitalisasi aplikasi pelayanan internal yang pernah dikembangkan oleh Dasrialdi."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative">
              <Icons.Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari pengalaman/tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-slate-900 text-sm bg-slate-50/50 w-full md:w-64"
              />
            </div>

            {/* Admin Add Trigger */}
            {isAdmin && (
              <motion.button
                onClick={handleOpenAdd}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 border border-slate-900 cursor-pointer shadow-xs hover:bg-slate-800"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icons.Plus className="w-3.5 h-3.5" />
                Tambah Pengalaman
              </motion.button>
            )}
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2.5 mb-10 border-b border-slate-100 pb-6">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4.5 py-2 text-xs font-semibold rounded-full select-none transition-all cursor-pointer ${
              activeFilter === "all"
                ? "bg-slate-950 text-white shadow-xs"
                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
            }`}
          >
            Semua ({items.length})
          </button>
          <button
            onClick={() => setActiveFilter("manajerial")}
            className={`px-4.5 py-2 text-xs font-semibold rounded-full select-none transition-all cursor-pointer ${
              activeFilter === "manajerial"
                ? "bg-slate-950 text-white shadow-xs"
                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
            }`}
          >
            Manajerial Teknis & Organisasi ({items.filter(i => i.category === 'manajerial').length})
          </button>
          <button
            onClick={() => setActiveFilter("aplikasi")}
            className={`px-4.5 py-2 text-xs font-semibold rounded-full select-none transition-all cursor-pointer ${
              activeFilter === "aplikasi"
                ? "bg-slate-950 text-white shadow-xs"
                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
            }`}
          >
            Pengembangan Digitalisasi & Aplikasi ({items.filter(i => i.category === 'aplikasi').length})
          </button>
        </div>

        {/* List of Grid Cards */}
        {filteredItems.length === 0 ? (
          <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-12 text-center">
            <Icons.FolderMinus className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">Tidak ada pengalaman/inovasi ditemukan</p>
            <p className="text-sm text-slate-400 mt-1 font-light">Coba sesuaikan kata kunci pencarian Anda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layoutId={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-50/50 border border-slate-150/80 rounded-2xl p-6.5 hover:bg-white hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between group h-full relative"
                >
                  <div>
                    {/* Header: Icon & Category label */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-150 text-slate-950 shadow-xs">
                        {renderIcon(item.iconName)}
                      </div>
                      
                      <span className={`text-[10px] font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded-md ${
                        item.category === 'aplikasi' 
                          ? "bg-sky-50 text-sky-700 border border-sky-200" 
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}>
                        {item.category === 'aplikasi' ? 'Aplikasi' : 'Manajerial'}
                      </span>
                    </div>

                    {/* Image Attachment (if present) */}
                    <AnimatePresence>
                      {item.imageUrl && (
                        <motion.div 
                          className="h-36 w-full rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-200"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 144 }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Title & Desc */}
                    <h4 className="text-base font-bold text-slate-900 leading-snug group-hover:text-slate-950 transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-sm text-slate-500 font-light leading-relaxed mt-2 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {item.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Area */}
                  <div className="pt-4.5 mt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    
                    {/* Public Proof Trigger */}
                    {item.evidenceUrl ? (
                      <a
                        href={item.evidenceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-150 transition-colors cursor-pointer"
                      >
                        <Icons.ExternalLink className="w-3.5 h-3.5" />
                        {item.evidenceTitle || "Lihat Bukti Resmi"}
                      </a>
                    ) : (
                      <span className="text-[10px] text-slate-300 font-mono italic">
                        Belum ada bukti publik
                      </span>
                    )}

                    {/* Admin Actions */}
                    {isAdmin && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          title="Edit Unit"
                          className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 hover:text-slate-900 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
                        >
                          <Icons.Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Yakin ingin menghapus "${item.title}"?`)) {
                              onDeleteItem(item.id);
                            }
                          }}
                          title="Hapus Unit"
                          className="p-1.5 hover:bg-red-50 rounded-md text-slate-400 hover:text-red-600 transition-colors border border-transparent hover:border-red-100 cursor-pointer"
                        >
                          <Icons.Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* Admin Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Blurry Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 relative z-10 w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 cursor-pointer p-1 rounded-full hover:bg-slate-50"
              >
                <Icons.X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-slate-900 font-display mb-6">
                {editingItem ? "Edit Pengalaman / Inovasi" : "Tambah Pengalaman Baru"}
              </h3>

              <form onSubmit={handleSave} className="space-y-4">
                {/* Judul */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Judul Pengalaman / Inovasi *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Digitalisasi Reservasi Ruang Rapat"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
                  />
                </div>

                {/* Kategori */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Kategori Bidang *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden bg-slate-50/50"
                    >
                      <option value="manajerial">Manajerial & Organisasi</option>
                      <option value="aplikasi">Digitalisasi & Aplikasi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Simbol Ikon *
                    </label>
                    <select
                      value={iconName}
                      onChange={(e) => setIconName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden bg-slate-50/50"
                    >
                      <option value="FolderOpen">Folder Terbuka</option>
                      <option value="LayoutDashboard">Dashboard</option>
                      <option value="Users">Kepegawaian (Users)</option>
                      <option value="FileCheck2">File SKP (Check)</option>
                      <option value="Wrench">Sarpras (Wrench)</option>
                      <option value="CalendarDays">Kalender / Rapat</option>
                      <option value="Car">Kendaraan Dinas</option>
                      <option value="Award">Disiplin / Award</option>
                      <option value="QrCode">Absen Barcode</option>
                      <option value="Megaphone">Promosi PMB</option>
                      <option value="ShoppingBag">E-Proc / Mbiz</option>
                      <option value="CopyCheck">Duplikasi Aplikasi</option>
                    </select>
                  </div>
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Deskripsi Detail *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Jelaskan peran Anda, inovasi dan dampak yang dihasilkan..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Tags / Kata Kunci (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={tagsStr}
                    onChange={(e) => setTagsStr(e.target.value)}
                    placeholder="Contoh: React, SPBE, Pengadaan, LPSE"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
                  />
                </div>

                {/* Link URL Bukti */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      URL Link Bukti (E-doc / Drive)
                    </label>
                    <input
                      type="url"
                      value={evidenceUrl}
                      onChange={(e) => setEvidenceUrl(e.target.value)}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Label Teks Bukti
                    </label>
                    <input
                      type="text"
                      value={evidenceTitle}
                      onChange={(e) => setEvidenceTitle(e.target.value)}
                      placeholder="Contoh: Lihat Sertifikat Resmi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Gambar URL Attachment */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    URL Gambar Lampiran
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... atau link gambar bukti"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Tambahkan gambar / screenshot inovasi agar tampilan portfolio semakin keren.
                  </span>
                </div>

                {/* Submit Buttons */}
                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-150 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 cursor-pointer"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
