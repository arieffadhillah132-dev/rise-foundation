/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Book, BookOpen, CheckCircle2, ChevronDown, Download, Info, X } from 'lucide-react';

interface BookItem {
  id: string;
  title: string;
  author: string;
  category: string;
  hasEbook: boolean;
  formats: ('Fisik' | 'E-Book')[];
  summary: string;
  bgColor: string;
  iconColor: string;
}

const BOOKS: BookItem[] = [
  {
    id: 'laskar-pelangi',
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    category: 'Sastra & Inspirasi',
    hasEbook: true,
    formats: ['Fisik', 'E-Book'],
    summary: 'Kisah perjuangan luar biasa sepuluh anak bersemangat baja di Belitung dalam menempuh pendidikan dasar di SD Muhammadiyah dengan segala keterbatasan fasilitas sekolah. Sebuah novel legendaris yang menginspirasi jutaan pembaca tentang tekad membara, arti persahabatan sejati, dan harapan yang tak pernah padam di tengah keterbatasan ekonomi.',
    bgColor: 'bg-[#FFEBD8] border-[#FED7AA]/40',
    iconColor: 'text-brand-orange'
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Pengembangan Diri',
    hasEbook: true,
    formats: ['Fisik', 'E-Book'],
    summary: 'Panduan praktis berstandar ilmiah untuk mengubah hidup Anda melalui perubahan-perubahan kecil (atomic) setiap harinya. James Clear mengupas tuntas sains di balik pembentukan kebiasaan baik dan bagaimana menghilangkan kebiasaan buruk secara sistematis demi mencapai produktivitas maksimal.',
    bgColor: 'bg-[#E8FBF2] border-[#A7F3D0]/40',
    iconColor: 'text-[#10B981]'
  },
  {
    id: 'sapiens',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'Sejarah & Filsafat',
    hasEbook: false,
    formats: ['Fisik'],
    summary: 'Sebuah narasi megah mengenai sejarah panjang umat manusia, mulai dari kera tak berarti di padang Afrika hingga menjadi penguasa planet Bumi. Buku ini memadukan sains, antropologi, dan sejarah untuk menjelaskan bagaimana tiga revolusi besar (Kognitif, Pertanian, Sains) membentuk peradaban modern kita.',
    bgColor: 'bg-[#F5F2FE] border-[#DDD6FE]/40',
    iconColor: 'text-[#8B5CF6]'
  },
  {
    id: 'kiat-beasiswa',
    title: 'Kiat Sukses Memperoleh Beasiswa Pendidikan Dunia',
    author: 'Dr. Indah Rahayu, M.Sc.',
    category: 'Siswa & Mahasiswa',
    hasEbook: true,
    formats: ['Fisik', 'E-Book'],
    summary: 'Buku panduan taktis yang menjabarkan langkah demi langkah dalam mempersiapkan berkas administrasi beasiswa bergengsi, menulis esai motivasi (Personal Statement) yang memikat hati komite penyeleksi, serta strategi ampuh dalam memenangkan sesi wawancara yang ketat.',
    bgColor: 'bg-[#EFF6FF] border-[#BFDBFE]/40',
    iconColor: 'text-[#2563EB]'
  }
];

interface LibraryViewProps {
  onNavigate: (route: string) => void;
  currentUser: any;
  onAddLoan: (bookId: string, bookTitle: string) => void;
  onJoinMember: () => void;
  isLibraryMember?: boolean;
}

export function LibraryView({ onNavigate, currentUser, onAddLoan, onJoinMember, isLibraryMember = false }: LibraryViewProps) {
  // Book summary popup state
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  // Form 1: Ajukan Peminjaman State
  const [loanName, setLoanName] = useState(currentUser?.fullName || '');
  const [loanBookTitle, setLoanBookTitle] = useState('');
  const [loanType, setLoanType] = useState('Fisik (Ambil di lokasi)');
  const [loanSuccess, setLoanSuccess] = useState<string | null>(null);

  // Form 2: Jadi Member State
  const [memberName, setMemberName] = useState(currentUser?.fullName || '');
  const [memberEmail, setMemberEmail] = useState(currentUser?.email || '');
  const [memberSuccess, setMemberSuccess] = useState<string | null>(null);

  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLoan('custom-book', loanBookTitle);
    setLoanSuccess(`Berhasil! Pengajuan peminjaman buku "${loanBookTitle}" telah terkirim.`);
    setLoanBookTitle('');
    setTimeout(() => {
      setLoanSuccess(null);
    }, 5000);
  };

  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onJoinMember();
    setMemberSuccess(`Selamat! Anda telah terdaftar sebagai Anggota Perpustakaan RISE.`);
    setTimeout(() => {
      setMemberSuccess(null);
    }, 5000);
  };

  const downloadEbook = (title: string) => {
    const textContent = `=========================================
RISE DIGITAL LIBRARY - E-BOOK DOWNLOAD
=========================================
JUDUL BUKU: ${title}
STATUS: UNDUH GRATIS (LIGHTWEIGHT E-BOOK)
=========================================

Ini adalah berkas contoh e-book gratis untuk pengujian alur pengguna (user flow) di RISE Library. Format digital yang lengkap dapat Anda baca secara interaktif setelah mendaftar sebagai anggota aktif perpustakaan RISE.

Selamat membaca bersama RISE Nusantara!
=========================================`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_ebook.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUseForLoan = (title: string) => {
    setLoanBookTitle(title);
    setSelectedBook(null);
    const formsElement = document.getElementById('library-forms-section');
    if (formsElement) {
      formsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* HEADER BANNER (Soft Warm Tint background) */}
      <div className="bg-[#FFF8F3] py-16 border-b border-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {/* Back Navigation */}
          <div>
            <button
              onClick={() => onNavigate('/program/academy')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-orange hover:text-brand-orange/80 transition-colors"
            >
              <span className="text-base">←</span> Kembali ke Academy
            </button>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1E293B] tracking-tight">
              RISE Library
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-sans max-w-xl">
              Perpustakaan fisik & digital untuk mendukung literasi
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* CARA PEMINJAMAN SECTION */}
        <div className="space-y-6">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#1E293B]">
            Cara Peminjaman
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Step 1 */}
            <div className="bg-[#FFF8F3] p-6 rounded-2xl text-center space-y-3 border border-orange-100/20">
              <div className="w-8 h-8 rounded-full bg-brand-orange text-white font-bold text-sm flex items-center justify-center mx-auto shadow-sm">
                1
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#1E293B]">Daftar Member</p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FFF8F3] p-6 rounded-2xl text-center space-y-3 border border-orange-100/20">
              <div className="w-8 h-8 rounded-full bg-brand-orange text-white font-bold text-sm flex items-center justify-center mx-auto shadow-sm">
                2
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#1E293B]">Pilih Buku</p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FFF8F3] p-6 rounded-2xl text-center space-y-3 border border-orange-100/20">
              <div className="w-8 h-8 rounded-full bg-brand-orange text-white font-bold text-sm flex items-center justify-center mx-auto shadow-sm">
                3
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#1E293B]">Ajukan Peminjaman</p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#FFF8F3] p-6 rounded-2xl text-center space-y-3 border border-orange-100/20">
              <div className="w-8 h-8 rounded-full bg-brand-orange text-white font-bold text-sm flex items-center justify-center mx-auto shadow-sm">
                4
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#1E293B]">Ambil / Baca Online</p>
            </div>

          </div>
        </div>

        {/* KATALOG BUKU SECTION */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#1E293B]">
                Katalog Buku
              </h2>
              <p className="text-xs text-gray-500">Klik pada sampul buku untuk membaca ringkasan dan mengunduh e-book gratis.</p>
            </div>
            {isLibraryMember && (
              <span className="self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Member RISE Library Aktif
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BOOKS.map((book) => (
              <div 
                key={book.id}
                onClick={() => setSelectedBook(book)}
                className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#10B981]/30 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 group active:scale-98"
              >
                <div>
                  <div className={`aspect-[4/3] rounded-xl ${book.bgColor} flex items-center justify-center border relative overflow-hidden group-hover:brightness-98 transition-all`}>
                    <Book className={`w-10 h-10 ${book.iconColor} transition-transform group-hover:scale-110 duration-200`} />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] font-extrabold text-white bg-black/75 px-3 py-1.5 rounded-lg tracking-wide uppercase">Lihat Ringkasan</span>
                    </div>
                  </div>
                  <div className="space-y-1.5 mt-4">
                    <span className="text-[9px] font-bold uppercase tracking-wider font-mono text-gray-400">{book.category}</span>
                    <h3 className="font-bold text-sm sm:text-base text-[#1E293B] leading-snug group-hover:text-[#059669] transition-colors line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1">Karya {book.author}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-50 mt-auto">
                  {book.formats.map((fmt) => (
                    <span 
                      key={fmt}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        fmt === 'Fisik' 
                          ? 'bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]' 
                          : 'bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]'
                      }`}
                    >
                      {fmt}
                    </span>
                  ))}
                  {book.hasEbook && (
                    <span className="ml-auto text-[10px] text-[#059669] font-bold flex items-center gap-0.5">
                      <Download className="w-3 h-3" /> Unduh Free
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TWIN FORMS ROW */}
        <div id="library-forms-section" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch scroll-mt-24">
          
          {/* Form Left: Ajukan Peminjaman */}
          <div className="bg-[#FFF5EE] p-6 sm:p-8 rounded-2xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1E293B]">
                Ajukan Peminjaman
              </h3>

              {loanSuccess && (
                <div className="p-3 bg-[#ECFDF5] border border-emerald-100 text-emerald-800 rounded-xl text-xs font-sans">
                  {loanSuccess}
                </div>
              )}

              <form onSubmit={handleLoanSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">Nama Member</label>
                  <input
                    type="text"
                    required
                    value={loanName}
                    onChange={(e) => setLoanName(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-orange-100 focus:border-brand-orange bg-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">Judul Buku</label>
                  <input
                    type="text"
                    required
                    value={loanBookTitle}
                    onChange={(e) => setLoanBookTitle(e.target.value)}
                    placeholder="Masukkan judul buku..."
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-orange-100 focus:border-brand-orange bg-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1E293B]">Tipe</label>
                  <div className="relative">
                    <select
                       value={loanType}
                       onChange={(e) => setLoanType(e.target.value)}
                       className="w-full text-xs px-3.5 py-3.5 rounded-xl border border-orange-100 focus:border-brand-orange bg-white outline-none appearance-none cursor-pointer font-medium text-[#1E293B]"
                    >
                      <option value="Fisik (Ambil di lokasi)">Fisik (Ambil di lokasi)</option>
                      <option value="Fisik (Kirim ke alamat)">Fisik (Kirim ke alamat)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#1E293B] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full text-center py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange/95 text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-md shadow-brand-orange/10"
                  >
                    Ajukan
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Form Right: Jadi Member */}
          <div className="bg-[#ECFDF5] p-6 sm:p-8 rounded-2xl space-y-6 flex flex-col justify-between border border-[#D1FAE5]/60">
            {isLibraryMember ? (
              /* Already a member celebration card */
              <div className="space-y-6 my-auto text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#065F46]">
                    Keanggotaan Anda Aktif!
                  </h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Selamat, akun perpustakaan Anda atas nama <span className="font-bold text-[#065F46]">{currentUser?.fullName || memberName}</span> telah terdaftar dan siap digunakan.
                  </p>
                </div>

                {/* Bullet Points */}
                <div className="bg-white/80 p-4 rounded-xl border border-emerald-100/50 max-w-sm mx-auto text-left">
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2 text-xs text-[#065F46]">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <span>Pinjam hingga 5 buku fisik sekaligus dengan pengiriman rumah</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-[#065F46]">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <span>Akses gratis unduh langsung e-book berkas PDF & EPUB</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2 max-w-xs mx-auto">
                  <button
                    onClick={() => onNavigate('/dashboard')}
                    className="w-full text-center py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs transition active:scale-95 shadow-md"
                  >
                    Lihat Dashboard Peminjaman
                  </button>
                </div>
              </div>
            ) : (
              /* Not a member form */
              <div className="space-y-5">
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#065F46]">
                    Jadi Member
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Daftar sebagai member untuk menikmati akses penuh perpustakaan RISE.
                  </p>
                </div>

                {memberSuccess && (
                  <div className="p-3 bg-white border border-[#A7F3D0] text-[#065F46] rounded-xl text-xs font-sans">
                    {memberSuccess}
                  </div>
                )}

                {/* Bullet Points */}
                <ul className="space-y-2 pl-0.5">
                  <li className="flex items-center gap-2 text-xs text-[#065F46] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>Pinjam hingga 5 buku sekaligus</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-[#065F46] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>Akses e-book gratis</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-[#065F46] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>Notifikasi buku baru</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-[#065F46] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>Diskon pembelian buku</span>
                  </li>
                </ul>

                <form onSubmit={handleMemberSubmit} className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#065F46]">Nama</label>
                    <input
                      type="text"
                      required
                      value={memberName}
                      onChange={(e) => setMemberName(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-emerald-100 focus:border-brand-green bg-white outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#065F46]">Email</label>
                    <input
                      type="email"
                      required
                      value={memberEmail}
                      onChange={(e) => setMemberEmail(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-emerald-100 focus:border-brand-green bg-white outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full text-center py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-md"
                    >
                      Daftar Member
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* BOOK SUMMARY MODAL OVERLAY */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative border border-gray-150 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedBook(null)}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Book Header Card info */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className={`w-20 h-28 sm:w-24 sm:h-32 rounded-2xl ${selectedBook.bgColor} border flex items-center justify-center shrink-0`}>
                <Book className={`w-8 h-8 sm:w-10 sm:h-10 ${selectedBook.iconColor}`} />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  {selectedBook.category}
                </span>
                <h3 className="font-serif font-bold text-base sm:text-xl text-[#1E293B] leading-snug">
                  {selectedBook.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">Oleh <span className="font-semibold text-gray-700">{selectedBook.author}</span></p>
                
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedBook.formats.map((fmt) => (
                    <span 
                      key={fmt}
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wide ${
                        fmt === 'Fisik' 
                          ? 'bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]' 
                          : 'bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]'
                      }`}
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Book Summary Section */}
            <div className="space-y-2 border-t border-b border-gray-100 py-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">Ringkasan Buku</h4>
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                {selectedBook.summary}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => handleUseForLoan(selectedBook.title)}
                className="flex-1 text-center py-3 rounded-xl bg-brand-navy hover:bg-brand-navy/95 text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-md shadow-brand-navy/10"
              >
                Ajukan Pinjam Fisik
              </button>
              
              {selectedBook.hasEbook && (
                <button
                  onClick={() => downloadEbook(selectedBook.title)}
                  className="flex-1 text-center py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-md shadow-emerald-100 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Unduh E-Book Gratis
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
