/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, Sparkles, LogIn, UserPlus, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../../types';

interface AuthViewProps {
  onNavigate: (route: string) => void;
  onLoginSuccess: (user: any, token: string) => void;
  initialMode?: 'login' | 'register';
}

function normalizeApiBase(url: string) {
  let normalized = url.trim().replace(/\/$/, '');
  if (normalized.endsWith('/api')) {
    normalized = normalized.replace(/\/api$/, '');
  }
  return normalized;
}

export function AuthView({ onNavigate, onLoginSuccess, initialMode = 'login' }: AuthViewProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const API_BASE = normalizeApiBase(import.meta.env.VITE_API_URL ?? '');
  
  // Forms local states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<UserRole>('visitor');
  const [persona, setPersona] = useState<'siswa_sma' | 'mahasiswa' | 'fresh_graduate' | 'karyawan' | 'mitra'>('siswa_sma');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const DEMO_ACCOUNTS = [
    {
      role: 'visitor' as UserRole,
      roleLabel: 'Visitor (Siswa / Sponsor / Pengunjung)',
      email: 'maharani@rise.org',
      fullName: 'Maharani Syifatania',
      persona: 'siswa_sma' as const,
      icon: '🎒',
      bg: 'bg-orange-50 hover:bg-orange-100/85 text-brand-orange border border-orange-100/80',
      desc: 'Mencoba pendaftaran program, tracking status berkas, dan layanan umum.'
    },
    {
      role: 'admin' as UserRole,
      roleLabel: 'Administrator',
      email: 'admin@rise.org',
      fullName: 'Evi Lestari',
      persona: 'mitra' as const,
      icon: '🔐',
      bg: 'bg-blue-50 hover:bg-blue-100/85 text-blue-700 border border-blue-100/80',
      desc: 'Akses kontrol panel admin, kelola beasiswa, dan verifikasi berkas.'
    }
  ];

  const handleInstantLogin = async (demo: typeof DEMO_ACCOUNTS[0]) => {
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE || ''}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: demo.email, password: 'password123' })
      });
      if (res.ok) {
        const data = await res.json();
        onLoginSuccess(data.user, data.token);
      } else {
        const errData = await res.json();
        setErrorMsg(errData.message || 'Gagal login demo.');
      }
    } catch (err) {
      setErrorMsg('Koneksi internet bermasalah.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'login') {
      if (!email || !password) {
        setErrorMsg('Semua kolom wajib diisi.');
        return;
      }
      
      try {
        const res = await fetch(`${API_BASE || ''}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        if (res.ok) {
          const data = await res.json();
          onLoginSuccess(data.user, data.token);
        } else {
          const errData = await res.json();
          setErrorMsg(errData.message || 'Gagal masuk. Periksa email & password Anda.');
        }
      } catch (err) {
        setErrorMsg('Koneksi internet bermasalah.');
      }
    } else {
      if (!fullName || !email || !password || !phoneNumber) {
        setErrorMsg('Semua kolom wajib diisi.');
        return;
      }

      try {
        const res = await fetch(`${API_BASE || ''}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email, password, phoneNumber, role, persona })
        });
        if (res.ok) {
          const data = await res.json();
          onLoginSuccess(data.user, data.token);
        } else {
          const errData = await res.json();
          setErrorMsg(errData.message || 'Gagal mendaftar akun.');
        }
      } catch (err) {
        setErrorMsg('Koneksi internet bermasalah.');
      }
    }
  };

  return (
    <div className="bg-[#FFF3E9]/30 min-h-[calc(screen-18)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-gray-150 shadow-xl overflow-hidden">
        
        {/* Left Side: Editorial Banner */}
        <div className="lg:col-span-4 bg-brand-navy p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#F37021_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
          
          <div className="space-y-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center font-bold text-lg">R</div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-2xl leading-tight">Satu Akun untuk Semua Program</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Melompat melintasi ekosistem pendidikan formal, program camps upskilling, pendaftaran beasiswa, serta relawan sosial tanpa register berulang kali.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-12 relative z-10">
            <blockquote className="border-l-2 border-brand-orange pl-4 text-xs italic text-gray-300">
              "Pendidikan bukan sekadar mengisi wadah, melainkan menyalakan api kontribusi sosial."
            </blockquote>
            <div className="flex items-center gap-2 text-[10px] text-brand-orange font-bold font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Single Account System</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="lg:col-span-8 p-8 sm:p-10 flex flex-col justify-center space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif font-bold text-2xl text-brand-navy">
              {mode === 'login' ? 'Masuk ke RISE Hub' : 'Daftar Akun Baru'}
            </h2>
            <p className="text-xs text-brand-grey">
              {mode === 'login' 
                ? 'Gunakan email dan password Anda, atau coba salah satu Akun Demo untuk aktivasi peran secara instan.' 
                : 'Lengkapi berkas identitas awal untuk menerbitkan kartu anggota virtual Anda.'
              }
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* DEMO CREDENTIALS SECTION (Shown only in login mode) */}
          {mode === 'login' && (
            <div className="space-y-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-150">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-grey font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
                  Uji Coba Cepat: Akun Demo Pintar
                </span>
                <span className="text-[9px] text-gray-400 font-mono">Password default: password123</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DEMO_ACCOUNTS.map((demo) => (
                  <div 
                    key={demo.role}
                    onClick={() => {
                      setEmail(demo.email);
                      setPassword('password123');
                    }}
                    className={`p-3 rounded-xl cursor-pointer transition text-left flex items-start justify-between gap-2 border select-none ${demo.bg}`}
                    title="Klik untuk mengisi formulir otomatis"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{demo.icon}</span>
                        <span className="font-bold text-[11px] leading-tight">{demo.roleLabel}</span>
                      </div>
                      <p className="text-[10px] font-mono opacity-80 leading-tight">{demo.email}</p>
                      <p className="text-[9px] text-gray-500 font-sans leading-tight line-clamp-1">{demo.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInstantLogin(demo);
                      }}
                      className="shrink-0 px-2 py-1 text-[9px] font-bold uppercase bg-white text-gray-800 rounded-lg shadow-sm hover:bg-gray-50 active:scale-95 transition"
                    >
                      Masuk Instan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-navy flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-brand-orange" /> Nama Lengkap Sesuai KTP
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Contoh: Fahmi Ramadhan"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none bg-gray-50/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-navy flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-orange" /> Nomor WhatsApp Aktif
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none bg-gray-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-navy">Profil Persona Anda</label>
                    <select
                      value={persona}
                      onChange={(e: any) => setPersona(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-gray-200 focus:border-brand-orange bg-white outline-none"
                    >
                      <option value="siswa_sma">Siswa SMA / Sederajat</option>
                      <option value="mahasiswa">Mahasiswa Aktif</option>
                      <option value="fresh_graduate">Fresh Graduate (Pencari Kerja)</option>
                      <option value="karyawan">Karyawan / Profesional</option>
                      <option value="mitra">Mitra Korporat / Lembaga</option>
                    </select>
                  </div>

                  {/* ACTIVE ROLE SELECTION UPON REGISTRATION */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-navy">Hak Akses / Peran Akun</label>
                    <select
                      value={role}
                      onChange={(e: any) => setRole(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-gray-200 focus:border-brand-orange bg-white outline-none font-semibold text-brand-orange"
                    >
                      <option value="visitor">Siswa / Sponsor / Pengunjung Umum (Visitor)</option>
                      <option value="admin">Administrator / Pengelola (Admin)</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-navy flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-brand-orange" /> Alamat Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="partner@company.com / admin@rise.org"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none bg-gray-50/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-navy flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-brand-orange" /> Password Akun
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none bg-gray-50/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-brand-orange transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full text-center py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange/95 text-white font-semibold text-xs tracking-wider uppercase transition shadow-md shadow-brand-orange/15 flex items-center justify-center gap-1.5"
              >
                {mode === 'login' ? (
                  <>
                    <LogIn className="w-4 h-4" /> Masuk Akun
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" /> Daftarkan Sekarang &amp; Masuk
                  </>
                )}
              </button>
            </div>
          </form>

          <hr className="border-gray-100" />

          <p className="text-center text-xs text-brand-grey font-sans">
            {mode === 'login' ? 'Belum memiliki akun terpadu?' : 'Sudah memiliki akun terpadu?'}
            <button
              onClick={() => {
                setErrorMsg('');
                setMode(mode === 'login' ? 'register' : 'login');
              }}
              className="text-brand-orange font-bold hover:underline ml-1.5"
            >
              {mode === 'login' ? 'Daftar di Sini' : 'Masuk di Sini'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
