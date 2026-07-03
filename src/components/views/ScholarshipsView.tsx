/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GraduationCap, BookOpen, Users, Coins, CheckCircle2, Award } from 'lucide-react';
import scholarshipBg from '../../assets/images/scholarship_bg_image_1783072414296.jpg';

interface ScholarshipsProps {
  onNavigate: (route: string) => void;
  onNavigateToForm: (programType: string, programId: string) => void;
}

export function ScholarshipsView({ onNavigate, onNavigateToForm }: ScholarshipsProps) {
  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* HEADER BANNER with Scholarship Background Image (Matches SD/SMP/SMA Detail Theme) */}
      <div className="relative py-20 px-4 overflow-hidden bg-slate-950 flex items-center min-h-[35vh]">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={scholarshipBg} 
            alt="Scholarship Background Document" 
            className="w-full h-full object-cover object-center opacity-60 filter brightness-95"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/65 to-slate-950/80"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10 w-full">
          
          {/* Back Navigation */}
          <div>
            <button
              onClick={() => onNavigate('/program/academy')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-orange-300 hover:text-white transition-colors bg-black/35 hover:bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10 cursor-pointer animate-fade-in"
            >
              <span>←</span> Kembali ke Academy
            </button>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif font-bold text-4xl sm:text-5xl text-white tracking-tight">
              Program Beasiswa RISE
            </h1>
            <p className="text-sm sm:text-base text-gray-200 font-sans max-w-xl font-medium">
              Kesempatan pendidikan berkualitas untuk semua
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* COLUMN 1: REQUIREMENTS & BENEFITS */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Syarat & Ketentuan */}
            <div className="space-y-4">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#1E293B]">
                Syarat & Ketentuan
              </h2>
              <ul className="space-y-3 pl-1">
                <li className="flex items-start gap-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Warga Negara Indonesia</span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Nilai rata-rata minimal 80</span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Surat keterangan tidak mampu (untuk beasiswa penuh)</span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Essay motivasi (500 kata)</span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Surat rekomendasi dari guru/kepala sekolah</span>
                </li>
              </ul>
            </div>

            {/* Benefit */}
            <div className="space-y-4">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#1E293B]">
                Benefit
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Benefit 1 */}
                <div className="flex items-center gap-3 bg-[#ECFDF5] p-4 rounded-xl text-[#047857] border border-[#D1FAE5]/60">
                  <GraduationCap className="w-5 h-5 text-[#059669] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">Bebas biaya SPP 100%</span>
                </div>

                {/* Benefit 2 */}
                <div className="flex items-center gap-3 bg-[#ECFDF5] p-4 rounded-xl text-[#047857] border border-[#D1FAE5]/60">
                  <BookOpen className="w-5 h-5 text-[#059669] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">Buku & seragam gratis</span>
                </div>

                {/* Benefit 3 */}
                <div className="flex items-center gap-3 bg-[#ECFDF5] p-4 rounded-xl text-[#047857] border border-[#D1FAE5]/60">
                  <Users className="w-5 h-5 text-[#059669] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">Mentoring khusus</span>
                </div>

                {/* Benefit 4 */}
                <div className="flex items-center gap-3 bg-[#ECFDF5] p-4 rounded-xl text-[#047857] border border-[#D1FAE5]/60">
                  <Coins className="w-5 h-5 text-[#059669] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">Uang saku bulanan</span>
                </div>

              </div>
            </div>

          </div>

          {/* COLUMN 2: PARTNERSHIP & REGISTRATION BOX */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Partnership Support */}
            <div className="space-y-4">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#1E293B]">
                Partnership
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Beasiswa ini didukung oleh mitra-mitra terpercaya kami:
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-4 rounded-xl text-center text-xs sm:text-sm font-semibold text-gray-700 border border-gray-100">
                  Bank ABC
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center text-xs sm:text-sm font-semibold text-gray-700 border border-gray-100">
                  Yayasan XYZ
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center text-xs sm:text-sm font-semibold text-gray-700 border border-gray-100">
                  PT. Edutech
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center text-xs sm:text-sm font-semibold text-gray-700 border border-gray-100">
                  Corp. Global
                </div>
              </div>
            </div>

            {/* Pendaftaran Dibuka Box */}
            <div className="bg-white rounded-2xl border-2 border-orange-200/80 p-6 sm:p-8 text-center space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1E293B]">
                  Pendaftaran Dibuka!
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-sans">
                  Periode: 1 Januari - 31 Maret 2025
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateToForm('scholarship', 'schol-prestasi')}
                  className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm transition active:scale-95 shadow-md shadow-brand-orange/15"
                >
                  Daftar Beasiswa
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
