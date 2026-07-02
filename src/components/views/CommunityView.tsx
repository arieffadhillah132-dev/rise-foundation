/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, Users, MessagesSquare, Calendar, CheckCircle2, User, Send, ArrowRight, MessageCircle } from 'lucide-react';

interface ThreadPost {
  author: string;
  avatar: string;
  role: string;
  time: string;
  content: string;
}

interface ForumThread {
  id: string;
  title: string;
  category: string;
  postsCount: number;
  lastActive: string;
  posts: ThreadPost[];
}

interface CommunityViewProps {
  onNavigate: (route: string) => void;
  onNavigateToForm: (programType: string, programId: string) => void;
  currentUser: any;
}

export function CommunityView({ onNavigate, onNavigateToForm, currentUser }: CommunityViewProps) {
  // Forums Seed data (State-driven so users can submit replies!)
  const [forumThreads, setForumThreads] = useState<ForumThread[]>([
    {
      id: 'thr-1',
      title: 'Bagaimana tips lolos berkas Beasiswa Unggulan Prestasi RISE 2026?',
      category: 'Akademik & Beasiswa',
      postsCount: 2,
      lastActive: '10 menit lalu',
      posts: [
        {
          author: 'Aisyah Putri',
          avatar: 'AP',
          role: 'Siswa SMA',
          time: '3 jam lalu',
          content: 'Halo teman-teman! Saya berencana mengajukan berkas untuk Beasiswa Unggulan Prestasi bulan ini. Apakah ada tips khusus untuk penulisan esai motivasi yang disukai tim penilai?'
        },
        {
          author: 'Evi Lestari',
          avatar: 'EL',
          role: 'Moderator',
          time: '1 jam lalu',
          content: 'Halo Aisyah! Kunci utama esai ada pada keaslian cerita Anda. Deskripsikan kontribusi sosial yang nyata yang pernah Anda lakukan, serta hubungkan visi karir Anda ke depan dengan program pendidikan formal RISE.'
        }
      ]
    },
    {
      id: 'thr-2',
      title: 'Diskusi bersama alumni Frontend Web Bootcamp: Tantangan portofolio React',
      category: 'Teknologi & Camps',
      postsCount: 1,
      lastActive: '2 jam lalu',
      posts: [
        {
          author: 'Rizky Pratama',
          avatar: 'RP',
          role: 'Mahasiswa',
          time: '2 jam lalu',
          content: 'Apakah di akhir bootcamp Frontend kita akan diajarkan juga cara mengintegrasikan Tailwind v4 dengan framework routing modern?'
        }
      ]
    }
  ]);

  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const activeThread = forumThreads.find(t => t.id === selectedThreadId);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedThreadId || !replyText.trim()) return;

    const updatedThreads = forumThreads.map(t => {
      if (t.id === selectedThreadId) {
        return {
          ...t,
          postsCount: t.postsCount + 1,
          lastActive: 'Baru saja',
          posts: [
            ...t.posts,
            {
              author: currentUser?.fullName || 'Pengunjung Baru',
              avatar: (currentUser?.fullName || 'PB').split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
              role: currentUser?.role === 'admin' ? 'Admin' : 'Platform Member',
              time: 'Baru saja',
              content: replyText
            }
          ]
        };
      }
      return t;
    });

    setForumThreads(updatedThreads);
    setReplyText('');
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* SECTION 1: HEADER BANNER (Soft Warm Tint - matches Screenshot 2) */}
      <div className="bg-[#FFF8F3] py-16 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 animate-fade-in">
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-[#1E293B]">
            RISE Community
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Bersama menciptakan dampak nyata melalui aksi sosial dan kolaborasi
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* SECTION 2: RISE PEDULI (Volunteer Batch 8 - matches Screenshot 2) */}
        <div className="space-y-6">
          <h2 className="font-serif font-bold text-2xl text-[#1E293B]">RISE Peduli</h2>
          
          <div className="bg-[#F0FDF4]/30 border border-[#DCFCE7] rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                AKTIF
              </span>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1E293B]">
                Open Recruitment Volunteer Batch 8
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left Column: Syarat & Timeline */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-[#1E293B] border-b border-gray-100 pb-2">Syarat:</h4>
                  <ul className="space-y-2 text-xs text-gray-600 font-sans">
                    <li className="flex items-center gap-2">
                      <span className="text-[#10B981] font-bold">✓</span> Usia 17-25 tahun
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#10B981] font-bold">✓</span> Berdomisili di Indonesia
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#10B981] font-bold">✓</span> Berkomitmen 3 bulan
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#10B981] font-bold">✓</span> Memiliki jiwa sosial tinggi
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-[#1E293B] border-b border-gray-100 pb-2">Timeline:</h4>
                  <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-600 font-sans">
                    <div><strong>1-15 Jan</strong></div>
                    <div>Pendaftaran</div>
                    <div><strong>18-20 Jan</strong></div>
                    <div>Seleksi Berkas</div>
                    <div><strong>23-26 Jan</strong></div>
                    <div>Interview</div>
                    <div><strong>1 Feb</strong></div>
                    <div>Pengumuman</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Benefit & Posisi */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-[#1E293B] border-b border-gray-100 pb-2">Benefit:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { text: 'E-certificate', icon: '📜' },
                      { text: 'Networking luas', icon: '🤝' },
                      { text: 'Pelatihan soft skill', icon: '💡' },
                      { text: 'Letter of recommendation', icon: '📝' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-gray-100 text-xs text-[#1E293B] font-semibold">
                        <span className="text-base">{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-[#1E293B]">Posisi Tersedia:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Pengajar', 'Event Organizer', 'Liaison Officer', 'Fundraiser'].map((pos, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF3E9] text-[#F97316] border border-orange-100">
                        {pos}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToForm('volunteer', 'vol-batch8')}
                  className="w-full text-center py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-xs tracking-wider uppercase transition shadow-md shadow-orange-500/10 active:scale-95"
                >
                  Daftar Volunteer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: TESTIMONI VOLUNTEER (matches Screenshot 2) */}
        <div className="space-y-6 pt-4 animate-fade-in">
          <h3 className="font-serif font-bold text-xl text-[#1E293B]">Testimoni Volunteer Sebelumnya</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "Pengalaman luar biasa! Saya belajar banyak tentang kerja tim dan empati.", author: "Rina", batch: "Batch 7" },
              { quote: "RISE memberi saya platform untuk berkontribusi nyata pada masyarakat.", author: "Andi", batch: "Batch 6" },
              { quote: "Networking yang saya dapatkan sangat berharga untuk karir saya.", author: "Maya", batch: "Batch 5" },
            ].map((testi, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition">
                <p className="text-xs text-gray-500 italic leading-relaxed font-sans">
                  "{testi.quote}"
                </p>
                <div className="text-xs">
                  <p className="font-bold text-[#1E293B]">{testi.author}</p>
                  <p className="text-gray-400 font-mono text-[10px]">{testi.batch}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: ILUSTRASI PROGRAM (matches Screenshot 2) */}
        <div className="space-y-6 pt-4">
          <h3 className="font-serif font-bold text-xl text-[#1E293B]">Ilustrasi Program</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Mengajar di Panti Asuhan", desc: "3 lokasi - 100 anak terlayani", icon: "🏫", color: "bg-blue-50 text-blue-600 border-blue-100" },
              { title: "Peduli Bencana", desc: "Bantuan ke wilayah terdampak", icon: "🤝", color: "bg-red-50 text-red-600 border-red-100" },
              { title: "Revitalisasi Sampah", desc: "10 sekolah - 2000 siswa teredukasi", icon: "♻️", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
              { title: "Tanam Pohon", desc: "500 pohon ditanam di 2 kota", icon: "🌱", color: "bg-green-50 text-green-600 border-green-100" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-brand-orange/30 transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl ${item.color.split(' ')[0]}`}>
                  {item.icon}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs text-[#1E293B] leading-tight font-sans">{item.title}</h4>
                  <p className="text-[10px] text-gray-400 font-medium font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: BRAND AMBASSADOR RISE (Large Orange Banner - matches Screenshot 2) */}
        <div className="bg-[#F97316] rounded-3xl p-8 sm:p-10 text-white shadow-lg shadow-orange-500/10 space-y-8 animate-fade-in">
          <div className="border-b border-white/20 pb-4">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl">Brand Ambassador RISE</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side (8-cols): Kriteria, Tugas, Kata Mereka */}
            <div className="lg:col-span-8 space-y-8 text-white/90">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3 font-sans">
                  <h4 className="font-bold text-sm border-b border-white/20 pb-1.5 uppercase tracking-wider font-mono text-white/80">Kriteria:</h4>
                  <ul className="space-y-2 text-xs">
                    <li>• Mahasiswa aktif atau baru lulus</li>
                    <li>• Aktif di media sosial (min. 1000 followers)</li>
                    <li>• Memiliki passion di bidang pendidikan/sosial</li>
                    <li>• Komunikatif dan kreatif</li>
                  </ul>
                </div>
                <div className="space-y-3 font-sans">
                  <h4 className="font-bold text-sm border-b border-white/20 pb-1.5 uppercase tracking-wider font-mono text-white/80">Tugas:</h4>
                  <ul className="space-y-2 text-xs">
                    <li>• Mempromosikan program RISE di media sosial</li>
                    <li>• Menjadi perwakilan di distrik/kampus</li>
                    <li>• Membuat konten edukatif</li>
                    <li>• Membuat kegiatan online</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3 pt-2 font-sans">
                <h4 className="font-bold text-sm uppercase tracking-wider font-mono text-white/80">Kata Mereka:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-xs">
                    <p className="italic leading-relaxed font-sans">"Menjadi BA RISE membuka banyak peluang networking dan pengembangan diri."</p>
                    <p className="font-bold mt-2 text-white/90">— Dimas, BA Batch 2</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-xs">
                    <p className="italic leading-relaxed font-sans">"Relasi public speaking dan content creation saya meningkat drastis!"</p>
                    <p className="font-bold mt-2 text-white/90">— Sari, BA Batch 3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side (4-cols): Timeline & Button */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-6 font-sans">
              <div className="space-y-3 text-xs">
                <h4 className="font-bold font-mono uppercase tracking-wider text-white/90">Timeline Rekrutmen:</h4>
                <div className="grid grid-cols-2 gap-y-2.5 text-white/80">
                  <div><strong>Maret</strong></div>
                  <div>Open Registration</div>
                  <div><strong>April</strong></div>
                  <div>Selection & Interview</div>
                  <div><strong>Mei</strong></div>
                  <div>Onboarding</div>
                  <div><strong>Juni-Nov</strong></div>
                  <div>Active Period</div>
                </div>
              </div>

              <button
                onClick={() => onNavigateToForm('brand_ambassador', 'ba-batch2')}
                className="w-full text-center py-3.5 rounded-xl bg-white text-[#F97316] font-semibold text-xs tracking-wider uppercase transition hover:bg-orange-50 active:scale-95 shadow-md"
              >
                Daftar Brand Ambassador
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 6: COLLABORATIVE DISCUSSION FORUM (Retained for interactivity!) */}
        <div className="space-y-6 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <MessagesSquare className="w-5 h-5 text-brand-orange" />
            <h3 className="text-sm font-bold tracking-widest font-mono text-brand-grey uppercase">Community Forum Diskusi</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Thread List (Grid 5-col equivalent) */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs text-brand-grey font-mono">Pilih Thread Diskusi:</p>
              {forumThreads.map((thread) => (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedThreadId === thread.id
                      ? 'bg-brand-orange/[0.03] border-brand-orange shadow-md shadow-brand-orange/5'
                      : 'bg-white border-gray-100 hover:border-brand-orange'
                  }`}
                >
                  <span className="text-[9px] uppercase font-mono font-bold text-brand-orange">{thread.category}</span>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-brand-navy leading-snug mt-1">{thread.title}</h4>
                  
                  <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono mt-4">
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {thread.postsCount} balasan</span>
                    <span>Aktif: {thread.lastActive}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Active Thread Chat Canvas (Grid 7-col equivalent) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 min-h-[400px] flex flex-col justify-between">
              {activeThread ? (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Thread Header */}
                    <div className="border-b border-gray-100 pb-4">
                      <span className="text-[10px] uppercase font-bold font-mono tracking-widest text-brand-orange">{activeThread.category}</span>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-brand-navy mt-1 leading-snug">{activeThread.title}</h3>
                    </div>

                    {/* Posts list */}
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                      {activeThread.posts.map((post, idx) => (
                        <div key={idx} className="flex gap-3 text-xs leading-relaxed items-start">
                          <div className="w-8 h-8 rounded-full bg-brand-orange/15 text-brand-orange font-bold font-mono text-xs flex items-center justify-center shrink-0">
                            {post.avatar}
                          </div>
                          <div className="flex-1 bg-gray-50/70 p-3 rounded-2xl border border-gray-100">
                            <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono mb-1">
                              <div>
                                <span className="font-bold text-brand-navy mr-1.5">{post.author}</span>
                                <span className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider font-bold">{post.role}</span>
                              </div>
                              <span>{post.time}</span>
                            </div>
                            <p className="text-gray-600 font-sans">{post.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reply Form */}
                  <form onSubmit={handleSendReply} className="border-t border-gray-100 pt-4 mt-6">
                    <div className="flex items-center gap-3">
                      <input 
                        type="text" 
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        required
                        placeholder="Ketik tanggapan atau balasan diskusi Anda..." 
                        className="flex-1 text-xs px-4 py-2.5 rounded-full border border-gray-200 focus:border-brand-orange outline-none bg-gray-50/50"
                      />
                      <button
                        type="submit"
                        className="w-10 h-10 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center justify-center shrink-0 transition"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-12 my-auto space-y-4">
                  <MessagesSquare className="w-12 h-12 text-gray-300 animate-pulse" />
                  <div>
                    <h4 className="font-serif font-bold text-base text-brand-navy">Forum Komunitas RISE</h4>
                    <p className="text-xs text-brand-grey max-w-sm mx-auto leading-relaxed mt-1 font-sans">Silakan pilih salah satu judul thread diskusi di sebelah kiri untuk melihat percakapan relawan atau mengirimkan balasan.</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
