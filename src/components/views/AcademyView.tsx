/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AcademyProgram } from '../../types';
import { BookOpen, GraduationCap, Calendar, ArrowLeft, ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import sdRiseBg from '../../assets/images/sd_rise_playground_1783068365717.jpg';
import smpRiseBg from '../../assets/images/smp_rise_building_1783070022818.jpg';
import smaRiseBg from '../../assets/images/sma_rise_building_1783070036358.jpg';
import scholarshipBg from '../../assets/images/scholarship_bg_image_1783072414296.jpg';
import libraryBg from '../../assets/images/library_bg_image_1783072436303.jpg';
import academyHeroBg from '../../assets/images/educational_foundation_building_1783051516953.jpg';

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
        <section className="relative py-20 px-4 overflow-hidden bg-slate-950 flex items-center min-h-[40vh]">
          {/* Background Image of SD RISE Playground */}
          <div className="absolute inset-0 z-0">
            <img 
              src={sdRiseBg} 
              alt="SD RISE School Playground" 
              className="w-full h-full object-cover object-center opacity-60 filter brightness-95" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/65 to-slate-950/80"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10 w-full">
            <button 
              onClick={() => setSelectedLevel(null)} 
              className="flex items-center gap-2 text-orange-300 hover:text-white mb-6 transition font-medium text-sm cursor-pointer bg-black/35 hover:bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10 w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Academy
            </button>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">SD RISE</h1>
            <p className="text-gray-200 text-base sm:text-lg max-w-2xl">Pendidikan dasar dengan pendekatan menyenangkan dan kurikulum merdeka</p>
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
                    <p className="text-xs text-gray-500">1 Januari - 28 Februari 2027</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100/60">
                  <Calendar className="w-6 h-6 text-brand-orange shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Gelombang 2</p>
                    <p className="text-xs text-gray-500">1 Maret - 30 April 2027</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100/60">
                  <Calendar className="w-6 h-6 text-brand-orange shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Gelombang 3</p>
                    <p className="text-xs text-gray-500">1 Mei - 30 Juni 2027</p>
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
        <section className="relative py-20 px-4 overflow-hidden bg-slate-950 flex items-center min-h-[40vh]">
          {/* Background Image of SMP RISE Campus */}
          <div className="absolute inset-0 z-0">
            <img 
              src={smpRiseBg} 
              alt="SMP RISE School Building" 
              className="w-full h-full object-cover object-center opacity-60 filter brightness-95" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/65 to-slate-950/80"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10 w-full">
            <button 
              onClick={() => setSelectedLevel(null)} 
              className="flex items-center gap-2 text-orange-300 hover:text-white mb-6 transition font-medium text-sm cursor-pointer bg-black/35 hover:bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10 w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Academy
            </button>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">SMP RISE</h1>
            <p className="text-gray-200 text-base sm:text-lg max-w-2xl">Pendidikan menengah pertama yang membangun karakter dan kompetensi</p>
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
        <section className="relative py-20 px-4 overflow-hidden bg-slate-950 flex items-center min-h-[40vh]">
          {/* Background Image of SMA RISE Campus */}
          <div className="absolute inset-0 z-0">
            <img 
              src={smaRiseBg} 
              alt="SMA RISE School Building" 
              className="w-full h-full object-cover object-center opacity-60 filter brightness-95" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/65 to-slate-950/80"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10 w-full">
            <button 
              onClick={() => setSelectedLevel(null)} 
              className="flex items-center gap-2 text-orange-300 hover:text-white mb-6 transition font-medium text-sm cursor-pointer bg-black/35 hover:bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10 w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Academy
            </button>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">SMA RISE</h1>
            <p className="text-gray-200 text-base sm:text-lg max-w-2xl">Pendidikan menengah atas yang mempersiapkan masa depan cemerlang</p>
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
      {/* Hero Section with Foundation Building Background */}
      <section className="relative py-20 px-4 overflow-hidden bg-slate-950 flex items-center min-h-[40vh] justify-center text-center">
        {/* Background Image of educational foundation building */}
        <div className="absolute inset-0 z-0">
          <img 
            src={academyHeroBg} 
            alt="RISE Academy Building" 
            className="w-full h-full object-cover object-center opacity-60 filter brightness-95" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/65 to-slate-950/80"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 w-full space-y-6">
          <div className="w-16 h-16 bg-brand-orange/20 border border-brand-orange/35 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-orange shadow-inner">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">RISE Academy</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
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
              className="relative overflow-hidden bg-white border-2 border-orange-100 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/10 group flex flex-col justify-between min-h-[340px]"
            >
              {/* Background Image with Low Opacity */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={sdRiseBg} 
                  alt="SD RISE Background" 
                  className="w-full h-full object-cover opacity-[0.14] filter brightness-[1.02] group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/10"></div>
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    🎒
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-brand-orange transition-colors">SD RISE</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 font-medium">Kelas 1-6 · Kurikulum Merdeka</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedLevel('sd'); }}
                  className="w-full py-2.5 bg-brand-orange text-white rounded-lg font-semibold hover:bg-[#EA580C] transition cursor-pointer mt-4"
                >
                  Lihat Detail
                </button>
              </div>
            </div>

            {/* SMP RISE Card */}
            <div 
              onClick={() => setSelectedLevel('smp')}
              className="relative overflow-hidden bg-white border-2 border-orange-100 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/10 group flex flex-col justify-between min-h-[340px]"
            >
              {/* Background Image with Low Opacity */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={smpRiseBg} 
                  alt="SMP RISE Background" 
                  className="w-full h-full object-cover opacity-[0.14] filter brightness-[1.02] group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/10"></div>
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    📚
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-brand-orange transition-colors">SMP RISE</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 font-medium">Kelas 7-9 · Kurikulum Merdeka</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedLevel('smp'); }}
                  className="w-full py-2.5 bg-brand-orange text-white rounded-lg font-semibold hover:bg-[#EA580C] transition cursor-pointer mt-4"
                >
                  Lihat Detail
                </button>
              </div>
            </div>

            {/* SMA RISE Card */}
            <div 
              onClick={() => setSelectedLevel('sma')}
              className="relative overflow-hidden bg-white border-2 border-orange-100 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/10 group flex flex-col justify-between min-h-[340px]"
            >
              {/* Background Image with Low Opacity */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={smaRiseBg} 
                  alt="SMA RISE Background" 
                  className="w-full h-full object-cover opacity-[0.14] filter brightness-[1.02] group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/10"></div>
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    🎓
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-brand-orange transition-colors">SMA RISE</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 font-medium">Kelas 10-12 · Kurikulum Merdeka</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedLevel('sma'); }}
                  className="w-full py-2.5 bg-brand-orange text-white rounded-lg font-semibold hover:bg-[#EA580C] transition cursor-pointer mt-4"
                >
                  Lihat Detail
                </button>
              </div>
            </div>

          </div>

          {/* Scholarship and Library Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Scholarship Card */}
            <div 
              onClick={() => onNavigate('/program/scholarship')}
              className="relative overflow-hidden bg-white border-2 border-emerald-100 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-green/10 group flex flex-col justify-between min-h-[220px]"
            >
              {/* Background Image with Low Opacity */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={scholarshipBg} 
                  alt="Scholarship Background" 
                  className="w-full h-full object-cover opacity-[0.15] filter brightness-[1.02] group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/10"></div>
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center text-white">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-brand-green transition-colors">Scholarship</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 font-medium">
                    Program beasiswa untuk siswa berprestasi dan kurang mampu. Dapatkan kesempatan pendidikan gratis!
                  </p>
                </div>
                <span className="text-brand-green font-semibold flex items-center gap-1 text-sm pt-2 group-hover:translate-x-1 transition-transform">
                  Lihat Beasiswa <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Library Card */}
            <div 
              onClick={() => onNavigate('/program/library')}
              className="relative overflow-hidden bg-white border-2 border-emerald-100 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-green/10 group flex flex-col justify-between min-h-[220px]"
            >
              {/* Background Image with Low Opacity */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={libraryBg} 
                  alt="Library Background" 
                  className="w-full h-full object-cover opacity-[0.15] filter brightness-[1.02] group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/10"></div>
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center text-white">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-brand-green transition-colors">Library</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 font-medium">
                    Perpustakaan fisik dan digital. Pinjam buku online maupun offline dengan mudah.
                  </p>
                </div>
                <span className="text-brand-green font-semibold flex items-center gap-1 text-sm pt-2 group-hover:translate-x-1 transition-transform">
                  Kunjungi Library <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
