import React, { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Unlock, Eye, EyeOff, User, X, LogIn, AlertCircle } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

interface AdminLoginProps {
  isAdmin: boolean;
  onLoginStatusChange: (status: boolean) => void;
}

export default function AdminLogin({ isAdmin, onLoginStatusChange }: AdminLoginProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoggingInGoogle, setIsLoggingInGoogle] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoggingInGoogle(true);
    setErrorMsg("");
    try {
      console.log("Memulai Firebase Google Pop-up Auth...");
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (user && user.email === "appsheet1@atim.ac.id") {
        console.log("Berhasil diverifikasi sebagai appsheet1@atim.ac.id!");
        onLoginStatusChange(true);
        setIsOpen(false);
      } else {
        setErrorMsg("Sesi Google aktif, namun email ini bukan email admin resmi (appsheet1@atim.ac.id).");
      }
    } catch (error: any) {
      console.error("Gagal melakukan autentikasi Google:", error);
      setErrorMsg("Gagal melakukan Google Sign-In: " + (error.message || error));
    } finally {
      setIsLoggingInGoogle(false);
    }
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin2026") {
      onLoginStatusChange(true);
      setIsOpen(false);
      setUsername("");
      setPassword("");
      setErrorMsg("");
    } else {
      setErrorMsg("Kredensial salah! Gunakan: admin / admin2026");
    }
  };

  const handleLogout = () => {
    if (confirm("Apakah anda yakin ingin log out dari mode administrator?")) {
      onLoginStatusChange(false);
    }
  };

  return (
    <>
      {/* Floating Status Button / Indicator */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isAdmin ? handleLogout : () => setIsOpen(true)}
          className={`px-4.5 py-3 rounded-full font-semibold shadow-xl border flex items-center gap-2 text-xs cursor-pointer ${
            isAdmin
              ? "bg-slate-900 border-slate-900 text-white "
              : "bg-white border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-50"
          }`}
        >
          {isAdmin ? (
            <>
              <Unlock className="w-4.5 h-4.5 text-emerald-400" />
              <span>Admin Mode (Logout)</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 text-slate-500" />
              <span>Login Admin</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Admin Login Dialog Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Blurry Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Panel box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-slate-200/80 p-6.5 sm:p-8 w-full max-w-sm relative z-10 shadow-2xl"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5.5 right-5.5 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-50 border border-slate-150 flex items-center justify-center text-slate-900 mb-3.5">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">Mode Administrator</h3>
                <p className="text-xs text-slate-400 mt-1 font-light">
                  Silakan masuk untuk mengelola bukti fisik / link URL dan lampiran gambar inovasi.
                </p>
              </div>

              {/* Google Sign In option (First choice for real DB synchronization) */}
              <button
                type="button"
                disabled={isLoggingInGoogle}
                onClick={handleGoogleLogin}
                className="w-full mb-4.5 flex items-center justify-center gap-2.5 py-3 rounded-xl text-xs font-semibold text-slate-800 border border-slate-200 bg-white hover:bg-slate-50 transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-98 disabled:opacity-50"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.69 5.69 0 0 1 8.3 12.83a5.69 5.69 0 0 1 5.69-5.69c2.324 0 4.298 1.4 5.15 3.385l3.96-3.076C20.69 3.518 16.711 1.455 12.24 1.455 5.922 1.455.8 6.577.8 12.895s5.122 11.44 11.44 11.44c6.318 0 11.44-5.122 11.44-11.44 0-.895-.12-1.78-.344-2.61H12.24Z"
                  />
                </svg>
                <span>{isLoggingInGoogle ? "Menghubungkan..." : "Hubungkan Google (Sinkronisasi Live)"}</span>
              </button>

              <div className="flex items-center gap-2 mb-4.5">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-[9px] text-slate-400 font-mono tracking-wider uppercase">atau sandi lokal</span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Username Input */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="p-3 bg-red-50 border border-red-200/60 rounded-xl text-red-600 flex items-start gap-2 text-xs font-medium"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer mt-2"
                >
                  <LogIn className="w-4 h-4" />
                  Masuk sebagai Admin
                </button>
              </form>

              {/* Secure Credentials Help notice (as requested) */}
              <div className="mt-5 border-t border-slate-100 pt-4 text-[11px] text-slate-400 text-center font-mono">
                Hint: admin / admin2026
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
