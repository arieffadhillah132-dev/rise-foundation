/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AcademyProgram } from '../../types';
import { BookOpen, GraduationCap, Calendar, ArrowLeft, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

interface AcademyViewProps {
  onNavigate: (route: string) => void;
  onNavigateToForm: (programType: string, programId: string) => void;
}

export function AcademyView({ onNavigate, onNavigateToForm }: AcademyViewProps) {
  const [selectedLevel, setSelectedLevel] = useState<'sd' | 'smp' | 'sma' | null>(null);

  // If a level is selected, render the detailed page for SD, SMP, or SMA
  if (selectedLevel === 'sd') {
    return (
      <div className="font-sans">
        <section className="bg-gradient-to-br from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA] py-12 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#F97316_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <button 
              onClick={() => setSelectedLevel(null)} 
              className="flex items-center gap-2 text-brand-orange mb-6 hover:underline font-medium text-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Academy
            </button>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-2">SD RISE</h1>
            <p className="text-gray-600 text-base sm:text-lg">Pendidikan dasar dengan pendekatan menyenangkan dan kurikulum merdeka</p>
          </div>
        </section>

        <section className="py-12 px-4 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-bold text-2xl mb-6 text-gray-900">Jadwal Pendaftaran</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100/60">
                  <Calendar className="w-6 h-6 text-brand-orange shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Gelombang 1</p>
                    <p className="text-xs text-gray-500">1 Januari - 28 Februari 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100/60">
                  <Calendar className="w-6 h-6 text-brand-orange shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Gelombang 2</p>
                    <p className="text-xs text-gray-500">1 Maret - 30 April 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100/60">
                  <Calendar className="w-6 h-6 text-brand-orange shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Gelombang 3</p>
                    <p className="text-xs text-gray-500">1 Mei - 30 Juni 2025</p>
                  </div>
                </div>
              </div>

              <h2 className="font-bold text-2xl mb-4 mt-8 text-gray-900">Biaya Pendidikan</h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-150">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 text-sm">Uang Pangkal</span>
                  <span className="font-semibold text-gray-900 text-sm">Rp 5.000.000</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 text-sm">SPP / bulan</span>
                  <span className="font-semibold text-gray-900 text-sm">Rp 800.000</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-600 text-sm">Seragam &amp; Buku</span>
                  <span className="font-semibold text-gray-900 text-sm">Rp 1.500.000</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-6 text-gray-900">Keunggulan</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                  <span className="text-gray-600 text-sm leading-relaxed">Kurikulum Merdeka dengan pendekatan project-based learning</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                  <span className="text-gray-600 text-sm leading-relaxed">Rasio guru-murid 1:15 untuk perhatian maksimal</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                  <span className="text-gray-600 text-sm leading-relaxed">Fasilitas modern: lab komputer, perpustakaan, lapangan olahraga</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                  <span className="text-gray-600 text-sm leading-relaxed">Ekstrakurikuler lengkap: seni, olahraga, sains, bahasa</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                  <span className="text-gray-600 text-sm leading-relaxed">Program pengembangan karakter terintegrasi</span>
                </li>
              </ul>
              <button 
                onClick={() => onNavigateToForm('academy', 'acad-sd')}
                className="mt-8 w-full px-8 py-4 bg-brand-orange text-white rounded-xl font-semibold text-lg hover:bg-[#EA580C] transition cursor-pointer"
              >
                Daftar SD RISE
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (selectedLevel === 'smp') {
    return (
      <div className="font-sans">
        <section className="bg-gradient-to-br from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA] py-12 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#F97316_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <button 
              onClick={() => setSelectedLevel(null)} 
              className="flex items-center gap-2 text-brand-orange mb-6 hover:underline font-medium text-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Academy
            </button>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-2">SMP RISE</h1>
            <p className="text-gray-600 text-base sm:text-lg">Pendidikan menengah pertama yang membangun karakter dan kompetensi</p>
          </div>
        </section>

        <section className="py-12 px-4 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-bold text-2xl mb-6 text-gray-900">Jadwal Pendaftaran</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100/60">
                  <Calendar className="w-6 h-6 text-brand-orange shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Gelombang 1</p>
                    <p className="text-xs text-gray-500">1 Januari - 28 Februari 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100/60">
                  <Calendar className="w-6 h-6 text-brand-orange shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Gelombang 2</p>
                    <p className="text-xs text-gray-500">1 Maret - 30 April 2025</p>
                  </div>
                </div>
              </div>

              <h2 className="font-bold text-2xl mb-4 mt-8 text-gray-900">Biaya Pendidikan</h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-150">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 text-sm">Uang Pangkal</span>
                  <span className="font-semibold text-gray-900 text-sm">Rp 7.500.000</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 text-sm">SPP / bulan</span>
                  <span className="font-semibold text-gray-900 text-sm">Rp 1.200.000</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-600 text-sm">Seragam &amp; Buku</span>
                  <span className="font-semibold text-gray-900 text-sm">Rp 2.000.000</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-6 text-gray-900">Keunggulan</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                  <span className="text-gray-600 text-sm leading-relaxed">Program bilingual (Indonesia &amp; Inggris)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                  <span className="text-gray-600 text-sm leading-relaxed">STEM education terintegrasi</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                  <span className="text-gray-600 text-sm leading-relaxed">Bimbingan karir dan minat bakat sejak dini</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                  <span className="text-gray-600 text-sm leading-relaxed">Program pertukaran pelajar</span>
                </li>
              </ul>
              <button 
                onClick={() => onNavigateToForm('academy', 'acad-smp')}
                className="mt-8 w-full px-8 py-4 bg-brand-orange text-white rounded-xl font-semibold text-lg hover:bg-[#EA580C] transition cursor-pointer"
              >
                Daftar SMP RISE
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (selectedLevel === 'sma') {
    return (
      <div className="font-sans">
        <section className="bg-gradient-to-br from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA] py-12 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#F97316_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <button 
              onClick={() => setSelectedLevel(null)} 
              className="flex items-center gap-2 text-brand-orange mb-6 hover:underline font-medium text-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Academy
            </button>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-2">SMA RISE</h1>
            <p className="text-gray-600 text-base sm:text-lg">Pendidikan menengah atas yang mempersiapkan masa depan cemerlang</p>
          </div>
        </section>

        <section className="py-12 px-4 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-bold text-2xl mb-6 text-gray-900">Jadwal Pendaftaran</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100/60">
                  <Calendar className="w-6 h-6 text-brand-orange shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Gelombang 1</p>
                    <p className="text-xs text-gray-500">1 November - 31 Desember 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100/60">
                  <Calendar className="w-6 h-6 text-brand-orange shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Gelombang 2</p>
                    <p className="text-xs text-gray-500">1 Januari - 28 Februari 2025</p>
                  </div>
                </div>
              </div>

              <h2 className="font-bold text-2xl mb-4 mt-8 text-gray-900">Biaya Pendidikan</h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-150">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 text-sm">Uang Pangkal</span>
                  <span className="font-semibold text-gray-900 text-sm">Rp 10.000.000</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 text-sm">SPP / bulan</span>
                  <span className="font-semibold text-gray-900 text-sm">Rp 1.500.000</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-600 text-sm">Seragam &amp; Buku</span>
                  <span className="font-semibold text-gray-900 text-sm">Rp 2.500.000</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-6 text-gray-900">Keunggulan</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                  <span className="text-gray-600 text-sm leading-relaxed">Persiapan UTBK &amp; seleksi PTN terarah</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                  <span className="text-gray-600 text-sm leading-relaxed">Program magang dan industri visit</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                  <span className="text-gray-600 text-sm leading-relaxed">Bimbingan aplikasi universitas luar negeri</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                  <span className="text-gray-600 text-sm leading-relaxed">Research project &amp; sertifikasi kompetensi</span>
                </li>
              </ul>
              <button 
                onClick={() => onNavigateToForm('academy', 'acad-sma')}
                className="mt-8 w-full px-8 py-4 bg-brand-orange text-white rounded-xl font-semibold text-lg hover:bg-[#EA580C] transition cursor-pointer"
              >
                Daftar SMA RISE
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Main Academy Overview View
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA] py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#F97316_1px,transparent_1px)] [background-size:24px_24px] opacity-5"></div>
        <div className="max-w-6xl mx-auto relative z-10 space-y-6">
          <div className="w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-brand-orange/25">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">RISE Academy</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Pendidikan formal berkualitas dari SD hingga SMA dengan kurikulum inovatif dan fasilitas modern
          </p>
        </div>
      </section>

      {/* Level and Shortcuts Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Level Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            {/* SD RISE Card */}
            <div 
              onClick={() => setSelectedLevel('sd')}
              className="bg-white border-2 border-orange-100 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/10 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  🎒
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-brand-orange transition-colors">SD RISE</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">Kelas 1-6 · Kurikulum Merdeka</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedLevel('sd'); }}
                className="w-full py-2 bg-brand-orange text-white rounded-lg font-medium hover:bg-[#EA580C] transition cursor-pointer"
              >
                Lihat Detail
              </button>
            </div>

            {/* SMP RISE Card */}
            <div 
              onClick={() => setSelectedLevel('smp')}
              className="bg-white border-2 border-orange-100 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/10 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  📚
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-brand-orange transition-colors">SMP RISE</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">Kelas 7-9 · Kurikulum Merdeka</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedLevel('smp'); }}
                className="w-full py-2 bg-brand-orange text-white rounded-lg font-medium hover:bg-[#EA580C] transition cursor-pointer"
              >
                Lihat Detail
              </button>
            </div>

            {/* SMA RISE Card */}
            <div 
              onClick={() => setSelectedLevel('sma')}
              className="bg-white border-2 border-orange-100 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/10 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  🎓
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-brand-orange transition-colors">SMA RISE</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">Kelas 10-12 · Kurikulum Merdeka</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedLevel('sma'); }}
                className="w-full py-2 bg-brand-orange text-white rounded-lg font-medium hover:bg-[#EA580C] transition cursor-pointer"
              >
                Lihat Detail
              </button>
            </div>

          </div>

          {/* Scholarship and Library Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Scholarship Card */}
            <div 
              onClick={() => onNavigate('/program/scholarship')}
              className="bg-white border-2 border-emerald-100 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-green/10 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center text-white">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 group-hover:text-brand-green transition-colors">Scholarship</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Program beasiswa untuk siswa berprestasi dan kurang mampu. Dapatkan kesempatan pendidikan gratis!
                </p>
              </div>
              <span className="text-brand-green font-semibold flex items-center gap-1 text-sm pt-2 group-hover:translate-x-1 transition-transform">
                Lihat Beasiswa <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            {/* Library Card */}
            <div 
              onClick={() => onNavigate('/program/library')}
              className="bg-white border-2 border-emerald-100 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-green/10 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center text-white">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 group-hover:text-brand-green transition-colors">Library</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Perpustakaan fisik dan digital. Pinjam buku online maupun offline dengan mudah.
                </p>
              </div>
              <span className="text-brand-green font-semibold flex items-center gap-1 text-sm pt-2 group-hover:translate-x-1 transition-transform">
                Kunjungi Library <ArrowRight className="w-4 h-4" />
              </span>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
