/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, Globe, Award } from 'lucide-react';
import { RiseLogo } from '../ui/RiseLogo';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-brand-navy text-white font-sans border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Column 1: Brand & Vibe */}
         {/* Column 1: Brand & Vibe */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <RiseLogo className="w-8 h-8" />
            <h2 className="font-serif font-bold text-lg tracking-wide">RISE Foundation</h2>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
            Ekosistem pendidikan terintegrasi pertama di Indonesia yang menghubungkan pendidikan formal, pengembangan keterampilan industri, serta pemberdayaan relawan sosial dalam satu akun terpadu.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
            <Award className="w-4 h-4 text-brand-orange" />
            <span>TIM 7 — UNIVERSITAS NEGERI JAKARTA</span>
          </div>
        </div>

        {/* Column 2: Program Utama */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-wider uppercase text-brand-orange">Program Utama</h3>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li>
              <button onClick={() => onNavigate('/program/academy')} className="hover:text-white hover:underline transition text-left">
                RISE Academy (Pendidikan Formal)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/program/camp')} className="hover:text-white hover:underline transition text-left">
                RISE Camp (Pelatihan & Karir)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/program/community')} className="hover:text-white hover:underline transition text-left">
                RISE Community (Pemberdayaan Sosial)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/program/academy/scholarships')} className="hover:text-white hover:underline transition text-left">
                Bakti Beasiswa Nusantara
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Lainnya & Literasi */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-wider uppercase text-brand-orange font-sans">Sumber Informasi</h3>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li>
              <button onClick={() => onNavigate('/program/academy/library')} className="hover:text-white hover:underline transition text-left">
                RISE Library (Katalog & Peminjaman)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/blog')} className="hover:text-white hover:underline transition text-left">
                Blog Yayasan & Berita Inspiratif
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/sponsorship')} className="hover:text-white hover:underline transition text-left">
                Diskusi Kemitraan & Sponsorship
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/search')} className="hover:text-white hover:underline transition text-left">
                Smart Search Engine
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Kontak Resmi */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-wider uppercase text-brand-orange">Kantor Pusat</h3>
          <ul className="space-y-3 text-xs text-gray-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <span>Gedung Kampus A UNJ, Jl. Rawamangun Muka, RT.11/RW.14, Rawamangun, Pulo Gadung, Jakarta Timur, 13220</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand-orange shrink-0" />
              <a href="mailto:info@risefoundation.id" className="hover:text-white transition">info@risefoundation.id</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-brand-orange shrink-0" />
              <span>+62 (21) 489-3982</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-brand-orange shrink-0" />
              <span>www.risefoundation.id</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Underbar Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2026 RISE Foundation Nusantara. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
        <div className="flex gap-4">
          <span className="hover:text-gray-400 cursor-pointer">Syarat & Ketentuan</span>
          <span className="hover:text-gray-400 cursor-pointer">Kebijakan Privasi</span>
          <span className="hover:text-gray-400 cursor-pointer">Hubungi Kami</span>
        </div>
      </div>
    </footer>
  );
}
