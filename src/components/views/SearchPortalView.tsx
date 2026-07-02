/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ACADEMY_PROGRAMS, SCHOLARSHIPS, CAMP_TRAININGS, BLOG_POSTS } from '../../data';
import { Search, Compass, GraduationCap, Award, BookOpen, ChevronRight, HelpCircle } from 'lucide-react';

interface SearchPortalViewProps {
  onNavigate: (route: string) => void;
  onNavigateToForm: (programType: string, programId: string) => void;
}

export function SearchPortalView({ onNavigate, onNavigateToForm }: SearchPortalViewProps) {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Compile searchable index items
  const searchIndex: Array<{
    id: string;
    title: string;
    description: string;
    type: 'academy' | 'scholarship' | 'camp_training' | 'blog';
    typeLabel: string;
    targetRoute: string;
  }> = [
    ...ACADEMY_PROGRAMS.map(item => ({
      id: item.id,
      title: item.name,
      description: item.description,
      type: 'academy' as const,
      typeLabel: 'Sekolah Formal',
      targetRoute: '/program/academy'
    })),
    ...SCHOLARSHIPS.map(item => ({
      id: item.id,
      title: item.name,
      description: item.benefit,
      type: 'scholarship' as const,
      typeLabel: 'Program Beasiswa',
      targetRoute: '/program/academy' // Scholarships reside under academy / scholarship view
    })),
    ...CAMP_TRAININGS.map(item => ({
      id: item.id,
      title: item.name,
      description: `Instruktur: ${item.mentorName} • Durasi: ${item.duration}`,
      type: 'camp_training' as const,
      typeLabel: 'Camps & Career',
      targetRoute: '/program/camp'
    })),
    ...BLOG_POSTS.map(item => ({
      id: item.id,
      title: item.title,
      description: `Artikel oleh ${item.author} • Topik: ${item.category}`,
      type: 'blog' as const,
      typeLabel: 'Warta Blog',
      targetRoute: '/blog'
    }))
  ];

  const filteredResults = searchIndex.filter(item => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) || 
                          item.description.toLowerCase().includes(query.toLowerCase()) ||
                          item.typeLabel.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="bg-[#FFF3E9]/30 min-h-screen py-12 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Block */}
        <div className="space-y-4">
          <nav className="flex text-xs font-mono text-brand-grey gap-2">
            <span onClick={() => onNavigate('/')} className="hover:text-brand-orange cursor-pointer">BERANDA</span>
            <span>/</span>
            <span className="text-brand-orange font-bold font-mono">PENCARIAN PORTAL</span>
          </nav>

          <div className="space-y-1">
            <h1 className="font-serif font-bold text-3xl text-brand-navy">Pencarian Satu Pintu RISE</h1>
            <p className="text-xs text-brand-grey leading-relaxed">
              Masukkan kata kunci untuk mencari seluruh modul, beasiswa prestasi, kelas pemrograman, sertifikasi bahasa, maupun artikel blog wawasan.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-5 rounded-3xl border border-gray-150 shadow-md space-y-4">
          <div className="relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ketik kata kunci (Contoh: React, Beasiswa, SMA, IELTS)..." 
              className="w-full text-xs sm:text-sm px-4 py-3 pl-11 rounded-xl border border-gray-200 outline-none focus:border-brand-orange bg-gray-50/50"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3" />
          </div>

          <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
            {[
              { id: 'all', label: 'Semua Kategori' },
              { id: 'academy', label: 'Sekolah Formal' },
              { id: 'scholarship', label: 'Beasiswa' },
              { id: 'camp_training', label: 'Pelatihan Camps' },
              { id: 'blog', label: 'Blog & Artikel' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filterType === f.id
                    ? 'bg-brand-orange text-white'
                    : 'bg-gray-100 text-brand-navy hover:bg-brand-orange/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Stream */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold tracking-widest font-mono text-brand-grey uppercase">Hasil Pencarian ({filteredResults.length})</h3>

          {filteredResults.length > 0 ? (
            <div className="space-y-4">
              {filteredResults.map((item, idx) => {
                let IconComp = HelpCircle;
                let badgeClass = 'bg-gray-100 text-gray-800';
                if (item.type === 'academy') {
                  IconComp = GraduationCap;
                  badgeClass = 'bg-brand-orange/10 text-brand-orange';
                } else if (item.type === 'scholarship') {
                  IconComp = Award;
                  badgeClass = 'bg-emerald-50 text-brand-green border border-brand-green/20';
                } else if (item.type === 'camp_training') {
                  IconComp = Compass;
                  badgeClass = 'bg-blue-50 text-blue-700';
                } else if (item.type === 'blog') {
                  IconComp = BookOpen;
                  badgeClass = 'bg-purple-50 text-purple-700';
                }

                return (
                  <div 
                    key={idx}
                    className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
                  >
                    <div className="flex gap-4 items-start">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${badgeClass}`}>
                        <IconComp className="w-5.5 h-5.5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-bold font-mono tracking-wider px-2 py-0.5 rounded uppercase ${badgeClass}`}>
                            {item.typeLabel}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-sm text-brand-navy group-hover:text-brand-orange transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-brand-grey leading-relaxed font-sans">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      {item.type !== 'blog' ? (
                        <button
                          onClick={() => onNavigateToForm(item.type, item.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-brand-orange hover:bg-brand-orange/95 text-white text-xs font-semibold uppercase tracking-wider transition"
                        >
                          Daftar
                        </button>
                      ) : null}
                      <button
                        onClick={() => onNavigate(item.targetRoute)}
                        className="p-2 rounded-lg border border-gray-150 text-brand-navy hover:text-brand-orange hover:bg-gray-50 transition"
                        title="Lihat Halaman"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-gray-150 text-center space-y-3">
              <Search className="w-12 h-12 text-gray-300 mx-auto animate-pulse" />
              <div>
                <p className="font-serif font-bold text-base text-brand-navy">Hasil Tidak Ditemukan</p>
                <p className="text-xs text-brand-grey max-w-sm mx-auto leading-relaxed mt-1">
                  Kami tidak menemukan kecocokan untuk kata kunci "{query}". Coba cari modul lain seperti "React", "IELTS", atau "Beasiswa".
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
