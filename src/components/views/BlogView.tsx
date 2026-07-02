/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BLOG_POSTS } from '../../data';
import { BookOpen, User, Calendar, Search, ArrowLeft, ArrowRight, Share2, Facebook, Twitter, MessageSquare } from 'lucide-react';

interface BlogViewProps {
  onNavigate: (route: string) => void;
}

export function BlogView({ onNavigate }: BlogViewProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const activePost = BLOG_POSTS.find(p => p.id === selectedPostId);

  // Filters
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'Kebijakan Pendidikan', 'Tips & Beasiswa'];

  return (
    <div className="bg-[#FFF3E9]/30 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="space-y-4">
          <nav className="flex text-xs font-mono text-brand-grey gap-2">
            <span onClick={() => onNavigate('/')} className="hover:text-brand-orange cursor-pointer">BERANDA</span>
            <span>/</span>
            {selectedPostId ? (
              <>
                <span onClick={() => setSelectedPostId(null)} className="hover:text-brand-orange cursor-pointer">BLOG</span>
                <span>/</span>
                <span className="text-brand-orange font-bold">BACA POST</span>
              </>
            ) : (
              <span className="text-brand-orange font-bold">BLOG</span>
            )}
          </nav>

          {selectedPostId ? (
            <button 
              onClick={() => setSelectedPostId(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-orange hover:text-brand-orange/80 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Semua Artikel
            </button>
          ) : null}

          <div className="max-w-3xl space-y-2">
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-brand-navy">
              {selectedPostId && activePost ? activePost.title : 'Warta Literasi RISE'}
            </h1>
            <p className="text-sm text-brand-grey leading-relaxed">
              {selectedPostId && activePost 
                ? `Ditulis oleh ${activePost.author} pada tanggal ${activePost.date} — Topik: ${activePost.category}`
                : 'Berita resmi yayasan, opini pengamat pedagogi, laporan pertanggungjawaban dampak sponsor, serta panduan praktis beasiswa pendidikan.'
              }
            </p>
          </div>
        </div>

        {/* 1. ARTICLES INDEX GRID VIEW */}
        {!selectedPostId ? (
          <div className="space-y-8">
            {/* Search & Category filter */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-gray-150">
              {/* Search bar */}
              <div className="relative w-full sm:max-w-xs">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari kata kunci artikel..." 
                  className="w-full text-xs px-3.5 py-2.5 pl-9 rounded-lg border border-gray-200 outline-none focus:border-brand-orange bg-gray-50/50"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>

              {/* Categories */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      selectedCategory === cat
                        ? 'bg-brand-orange text-white'
                        : 'bg-white text-brand-navy border border-gray-150 hover:border-brand-orange'
                    }`}
                  >
                    {cat === 'all' ? 'Semua Kategori' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <div 
                    key={post.id}
                    className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] text-brand-grey font-mono uppercase tracking-wider font-semibold">
                        <span>{post.category}</span>
                        <span>{post.date}</span>
                      </div>

                      <h3 className="font-serif font-bold text-lg text-brand-navy leading-snug group-hover:text-brand-orange transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-xs text-gray-500 leading-relaxed font-sans line-clamp-3">
                        {post.content.replace(/[#*`\n]/g, ' ').trim()}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-gray-50 mt-6 flex justify-between items-center">
                      <span className="text-[10px] text-gray-400 font-mono">Oleh: {post.author.split(' ')[0]}</span>
                      <button
                        onClick={() => setSelectedPostId(post.id)}
                        className="text-xs font-semibold text-brand-orange flex items-center gap-1 group-hover:gap-2 transition-all"
                      >
                        Baca Artikel <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-white rounded-3xl border border-gray-150">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="font-serif font-bold text-base text-brand-navy">Artikel Tidak Ditemukan</p>
                <p className="text-xs text-brand-grey mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
              </div>
            )}
          </div>
        ) : (
          /* 2. SPECIFIC SELECTED POST ARTICLE CANVAS READ */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Main Text Content */}
            <div className="lg:col-span-8 bg-white p-8 sm:p-12 rounded-3xl border border-gray-150 shadow-sm space-y-6">
              
              {/* Meta details */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4 text-xs font-mono text-brand-grey">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-orange" />
                  <span>Karya: <strong>{activePost.author}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-orange" />
                  <span>Diterbitkan: {activePost.date}</span>
                </div>
              </div>

              {/* Document markdown parsing layout */}
              <div className="prose prose-sm prose-orange max-w-none text-gray-600 leading-relaxed font-sans space-y-4">
                <p className="font-serif font-bold text-xl sm:text-2xl text-brand-navy border-l-4 border-brand-orange pl-4 leading-snug">
                  {activePost.title}
                </p>
                <div className="whitespace-pre-line text-xs sm:text-sm pt-4 space-y-3 font-sans">
                  {/* Since react-markdown requires installation, we can render the formatted text cleanly using raw strings with semantic linebreaks */}
                  {activePost.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={index} className="font-serif font-bold text-lg text-brand-navy pt-4 border-b border-gray-100 pb-1">{paragraph.replace('## ', '')}</h2>;
                    }
                    if (paragraph.startsWith('# ')) {
                      return null; // Skip duplicate h1 title
                    }
                    if (paragraph.startsWith('- ')) {
                      return (
                        <ul key={index} className="list-disc pl-5 space-y-1">
                          {paragraph.split('\n').map((item, idx) => (
                            <li key={idx}>{item.replace('- ', '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={index}>{paragraph}</p>;
                  })}
                </div>
              </div>

            </div>

            {/* Right sidebar details */}
            <div className="lg:col-span-4 bg-brand-navy text-white p-6 rounded-3xl border border-white/5 space-y-6 sticky top-24">
              <div className="space-y-1">
                <span className="text-[10px] font-bold font-mono text-brand-orange uppercase">Bagikan Wawasan</span>
                <h4 className="font-serif font-bold text-lg">Sebarkan Literasi Ini</h4>
                <p className="text-[11px] text-gray-400">Bagikan artikel ini ke media sosial Anda untuk meluaskan dampak pergerakan literasi bersama.</p>
              </div>

              <hr className="border-white/10" />

              <div className="space-y-3">
                <button className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 border border-white/10">
                  <Share2 className="w-4 h-4" /> Salin Tautan Artikel
                </button>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <button className="py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold">Facebook</button>
                  <button className="py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold">Twitter</button>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
