import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star, Sparkles, MessageSquare, Plus, CheckCircle2, X } from "lucide-react";
import { UserReview, Biodata } from "../types";

interface TestimonialsSectionProps {
  biodata: Biodata;
}

export default function TestimonialsSection({ biodata }: TestimonialsSectionProps) {
  // Pre-populate with realistic, clean public servant endorsements
  const [reviews, setReviews] = useState<UserReview[]>(() => {
    const saved = localStorage.getItem("dasrialdi_portfolio_reviews");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      {
        id: "rev-1",
        name: "Satker ATIM Kemenperin Officials",
        relation: "Kepala Instansi Satker",
        comment: "Kinerja Sdr. Dasrialdi sangat luar biasa dalam pemanfaatan Toko Daring Mbiz & implementasi KKP. Beliau berhasil memangkas birokrasi pengadaan konvensional dengan melahirkan ekosistem digital yang bersih dan transparan.",
        rating: 5,
        date: "Desember 2024"
      },
      {
        id: "rev-2",
        name: "Ir. Handrian, M.T",
        relation: "Atasan Langsung / Pimpinan Unit",
        comment: "Layanan rumah tangga digital yang digagas oleh Dasrialdi memberikan efisiensi luar biasa bagi tata ruang rapat dan operasional kendaraan dinas. Layak menjadi contoh inovasi bagi unit kerja lainnya.",
        rating: 5,
        date: "Maret 2025"
      },
      {
        id: "rev-3",
        name: "Ria Sefriana, S.Kom",
        relation: "Validator Kepegawaian Sejawat",
        comment: "Penyusunan SKP dan Perkin menjadi sangat rapi dan akurat sejak beliau bergabung ke tim penyusun teknis. Kolaborasi yang solutif dan profesional sehari-hari.",
        rating: 5,
        date: "Januari 2025"
      }
    ];
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Rekan Kerja");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      alert("Harap isi Nama dan Catatan Rekomendasi!");
      return;
    }

    const newRev: UserReview = {
      id: "rev-" + Date.now(),
      name,
      relation,
      comment,
      rating,
      date: "Mei 2026"
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem("dasrialdi_portfolio_reviews", JSON.stringify(updated));

    // Reset Form
    setName("");
    setRelation("Rekan Kerja");
    setComment("");
    setRating(5);
    setIsFormOpen(false);
  };

  return (
    <section id="rekomendasi" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono mb-2">
              Validasi Sosial
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Testimoni & Rekomendasi Kolaborator
            </h3>
            <p className="mt-3 text-slate-500 font-light max-w-xl">
              {biodata.rekomendasiSlogan || "Ulasan jujur dan tanggapan formal dari rekan kerja, pimpinan, maupun mitra instansi terkait pelayanan serta etos kerja Sdr. Dasrialdi."}
            </p>
          </div>

          <motion.button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-slate-800 bg-white border border-slate-200 select-none cursor-pointer hover:bg-slate-50 hover:text-slate-900 shadow-xs"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4 text-slate-500" />
            Tulis Rekomendasi
          </motion.button>
        </div>

        {/* Carousel / Grid of Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-7 rounded-3xl border border-slate-200/60 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="text-slate-200 group-hover:text-slate-800 transition-colors">
                    <Quote className="w-8 h-8 fill-current" />
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-light italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div>
                <div className="h-px bg-slate-100 my-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 hover:text-slate-950 transition-colors">
                      {rev.name}
                    </h5>
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                      {rev.relation}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {rev.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Guest Recommendation Modal Form */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 relative z-10 w-full max-w-md shadow-2xl"
            >
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 cursor-pointer p-1 rounded-full hover:bg-slate-50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-800 mb-3.5">
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">Tulis Rekomendasi</h3>
                <p className="text-xs text-slate-400 mt-1 font-light">
                  Berikan masukan positif untuk kontribusi Sdr. Dasrialdi yang berdampak nyata bagi instansi Anda.
                </p>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Nama Pengulas */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Nama Lengkap Anda *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Dr. Herman, M.Si"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
                  />
                </div>

                {/* Relasi / Hubungan Profesional */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Hubungan Profesional *
                  </label>
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden bg-slate-50/50"
                  >
                    <option value="Atasan Langsung">Atasan Langsung</option>
                    <option value="Rekan Kerja Satker">Rekan Kerja Sejawat</option>
                    <option value="Mitra Pengauditan (ISO/Akreditasi)">Mitra Pengauditan (ISO/Akreditasi)</option>
                    <option value="Mitra Rekanan / Swasta">Mitra Rekanan / Swasta</option>
                    <option value="Mahasiswa / Masyarakat Umum">Mahasiswa / Civitas Akademika</option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Rating Penilaian Pelayanan *
                  </label>
                  <div className="flex gap-2.5 items-center">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setRating(val)}
                        className="p-1 cursor-pointer hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            val <= rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-200"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-semibold text-slate-400 ml-1">
                      {rating} / 5 Bintang
                    </span>
                  </div>
                </div>

                {/* Komentar */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Catatan Rekomendasi / Pendapat *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tulis ulasan detail mengenai pelayanan, inovasi, serta kontribusi profesionalnya..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Kirim Catatan
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
